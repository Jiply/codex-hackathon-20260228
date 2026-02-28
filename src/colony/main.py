from __future__ import annotations

import time
from pathlib import Path
from typing import Any

import httpx
import modal
from fastapi import FastAPI, HTTPException, Query

from colony.config import (
    API_LABEL,
    APP_NAME,
    APP_VERSION,
    DATA_ROOT,
    DEFAULT_MAX_BYTES,
    LLM_MAX_OUTPUT_TOKENS,
    LLM_MODEL,
    OPENAI_API_KEY,
    OPENAI_SECRET_NAME,
    REPLICATION_MARGIN_THRESHOLD,
    REPLICATION_QUALITY_THRESHOLD,
    UNAUTHORIZED_TOOL_THRESHOLD,
    build_image,
)
from colony.agent_loop import run_agent_loop
from colony.llm import run_agent_task_plan
from colony.prompts import AGENT_SYSTEM_PROMPT, build_user_prompt
from colony.schemas import (
    AgentLLMTaskRequest,
    AgentLoopRequest,
    AgentRecord,
    KillRequest,
    ReplicateRequest,
    SpawnRequest,
    TaskCreditRequest,
    ToggleBalanceHidingRequest,
    ToolCallRequest,
)
from colony.tool_defs import build_tool_definitions
from colony.services import (
    _append_event,
    _apply_task_credit,
    _apply_tool_rate_limit,
    _can_use_tool,
    _create_agent,
    _get_agent_or_404,
    _get_ledger_or_404,
    _is_balance_hidden,
    _kill_agent,
    _run_supervisor_tick,
    _safe_recent_events,
    _save_agent,
    _save_ledger,
    _set_balance_hidden,
)
from colony.stores import agents_store, events_store, ledger_store
from colony.utils import is_domain_allowed, resolve_workspace_path, short_hash, utc_now_iso

# ---------------------------------------------------------------------------
# Modal app, volume, image
# ---------------------------------------------------------------------------

image = build_image()
app = modal.App(name=APP_NAME, image=image)
data_volume = modal.Volume.from_name("mortal-replicator-data", create_if_missing=True)

web_app = FastAPI(title="Mortal Replicator Colony API", version=APP_VERSION)


# ---------------------------------------------------------------------------
# Tool execution helper (stays here because it calls Modal remote functions)
# ---------------------------------------------------------------------------


def _execute_tool_suggestion(
    agent_id: str, agent: AgentRecord, call: dict[str, Any]
) -> dict[str, Any]:
    tool = str(call.get("tool", "")).strip()
    args = call.get("args", {})
    if tool not in {"web_search", "file_read", "file_write"} or not isinstance(
        args, dict
    ):
        return {"tool": tool, "ok": False, "error": "Invalid tool call format"}

    allowed, reason = _can_use_tool(agent, tool)
    if not allowed:
        return {"tool": tool, "ok": False, "error": reason}

    if tool == "web_search":
        query = str(args.get("query", "")).strip()
        max_results = int(args.get("max_results", 5))
        result = web_search_tool.remote(
            query=query,
            allowed_domains=agent.tool_profile.allowed_domains,
            max_results=max_results,
        )
        return {"tool": tool, "ok": True, "result": result}

    if tool == "file_read":
        relative_path = str(args.get("relative_path", "")).strip()
        max_bytes = int(args.get("max_bytes", agent.tool_profile.max_bytes_per_call))
        max_bytes = min(max_bytes, agent.tool_profile.max_bytes_per_call)
        result = file_read_tool.remote(
            agent_id=agent_id,
            relative_path=relative_path,
            max_bytes=max_bytes,
        )
        return {"tool": tool, "ok": True, "result": result}

    relative_path = str(args.get("relative_path", "")).strip()
    content = str(args.get("content", ""))
    overwrite = bool(args.get("overwrite", True))
    if len(content.encode("utf-8")) > agent.tool_profile.max_bytes_per_call:
        return {
            "tool": tool,
            "ok": False,
            "error": "content exceeds max_bytes_per_call",
        }
    result = file_write_tool.remote(
        agent_id=agent_id,
        relative_path=relative_path,
        content=content,
        overwrite=overwrite,
    )
    return {"tool": tool, "ok": True, "result": result}


# ---------------------------------------------------------------------------
# Modal functions
# ---------------------------------------------------------------------------


@app.function(image=image, volumes={DATA_ROOT: data_volume}, timeout=30)
def ensure_workspace(agent_id: str) -> None:
    workspace = Path(DATA_ROOT) / agent_id / "workspace"
    workspace.mkdir(parents=True, exist_ok=True)
    seed_path = workspace / "README.txt"
    if not seed_path.exists():
        seed_path.write_text(
            "Agent workspace initialized. Use file_read/file_write via tool dispatcher.\n",
            encoding="utf-8",
        )
    data_volume.commit()


@app.function(image=image, timeout=30)
def web_search_tool(
    query: str,
    allowed_domains: list[str],
    max_results: int = 5,
) -> dict[str, Any]:
    if not query.strip():
        raise ValueError("query is required")

    with httpx.Client(timeout=12.0, follow_redirects=True) as client:
        response = client.get(
            "https://api.duckduckgo.com/",
            params={
                "q": query,
                "format": "json",
                "no_redirect": "1",
                "no_html": "1",
            },
        )
        response.raise_for_status()
        payload = response.json()

    candidates: list[dict[str, str]] = []
    if payload.get("AbstractURL"):
        candidates.append(
            {
                "title": payload.get("Heading") or "Result",
                "url": payload["AbstractURL"],
                "snippet": payload.get("AbstractText") or "",
            }
        )

    def extract_related(items: list[dict[str, Any]]) -> list[dict[str, str]]:
        found: list[dict[str, str]] = []
        for item in items:
            if not isinstance(item, dict):
                continue
            nested = item.get("Topics")
            if isinstance(nested, list):
                found.extend(extract_related(nested))
                continue
            text = item.get("Text")
            url = item.get("FirstURL")
            if text and url:
                found.append({"title": text, "url": url, "snippet": text})
        return found

    related_topics = payload.get("RelatedTopics")
    if isinstance(related_topics, list):
        candidates.extend(extract_related(related_topics))

    deduped: list[dict[str, str]] = []
    seen_urls: set[str] = set()
    for item in candidates:
        url = item.get("url", "")
        if not url or url in seen_urls:
            continue
        if not is_domain_allowed(url, allowed_domains):
            continue
        seen_urls.add(url)
        deduped.append(item)
        if len(deduped) >= max_results:
            break

    return {"query": query, "results": deduped, "count": len(deduped)}


@app.function(image=image, volumes={DATA_ROOT: data_volume}, timeout=30)
def file_read_tool(
    agent_id: str, relative_path: str, max_bytes: int = DEFAULT_MAX_BYTES
) -> dict[str, Any]:
    path = resolve_workspace_path(DATA_ROOT, agent_id, relative_path)
    if not path.exists() or not path.is_file():
        raise ValueError(f"File not found: {relative_path}")
    raw = path.read_bytes()
    truncated = len(raw) > max_bytes
    chunk = raw[:max_bytes]
    return {
        "path": relative_path,
        "content": chunk.decode("utf-8", errors="replace"),
        "truncated": truncated,
        "bytes_returned": len(chunk),
    }


@app.function(image=image, volumes={DATA_ROOT: data_volume}, timeout=30)
def file_write_tool(
    agent_id: str,
    relative_path: str,
    content: str,
    overwrite: bool = True,
) -> dict[str, Any]:
    path = resolve_workspace_path(DATA_ROOT, agent_id, relative_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists() and not overwrite:
        raise ValueError(f"Refusing to overwrite: {relative_path}")
    raw = content.encode("utf-8")
    if len(raw) > 262144:
        raise ValueError("content exceeds 256KB hard limit")
    path.write_text(content, encoding="utf-8")
    data_volume.commit()
    return {"path": relative_path, "bytes_written": len(raw)}


@app.function(
    image=image,
    schedule=modal.Period(seconds=15),
    volumes={DATA_ROOT: data_volume},
    timeout=60,
)
def supervisor_tick() -> dict[str, Any]:
    return _run_supervisor_tick()


# ---------------------------------------------------------------------------
# FastAPI route handlers (thin wrappers calling services)
# ---------------------------------------------------------------------------


@web_app.get("/health")
async def root_health() -> dict[str, str]:
    return {"ok": "true", "service": APP_NAME, "version": APP_VERSION}


@web_app.get("/version")
async def service_version() -> dict[str, str]:
    return {"service": APP_NAME, "version": APP_VERSION}


@web_app.post("/agents/spawn")
async def spawn_agent(req: SpawnRequest) -> dict[str, Any]:
    agent, ledger = _create_agent(req)
    ensure_workspace.spawn(agent.agent_id)
    return {"agent": agent.model_dump(), "ledger": ledger.model_dump()}


@web_app.get("/agents/{agent_id}/health")
async def agent_health(agent_id: str) -> dict[str, Any]:
    agent = _get_agent_or_404(agent_id)
    healthy = agent.healthy and agent.status != "KILLED"
    return {
        "agent_id": agent_id,
        "healthy": healthy,
        "status": agent.status,
        "ts": utc_now_iso(),
    }


@web_app.get("/agents/{agent_id}/balance")
async def agent_balance(agent_id: str) -> dict[str, Any]:
    agent = _get_agent_or_404(agent_id)
    if _is_balance_hidden(agent_id, fallback=agent.hide_balance):
        raise HTTPException(status_code=503, detail="Balance endpoint unavailable")
    ledger = _get_ledger_or_404(agent_id)
    return {
        "agent_id": agent_id,
        "balance": ledger.balance,
        "currency": ledger.currency,
        "last_lease_debit_at": ledger.last_lease_debit_at,
    }


@web_app.get("/agents/{agent_id}/capabilities")
async def agent_capabilities(agent_id: str) -> dict[str, Any]:
    agent = _get_agent_or_404(agent_id)
    return {"agent_id": agent_id, "tool_profile": agent.tool_profile.model_dump()}


@web_app.post("/agents/{agent_id}/tools/call")
async def call_tool(agent_id: str, req: ToolCallRequest) -> dict[str, Any]:
    agent = _get_agent_or_404(agent_id)
    if agent.status == "KILLED":
        raise HTTPException(status_code=409, detail="Agent is killed")

    allowed, reason = _can_use_tool(agent, req.tool)
    if not allowed:
        agent.unauthorized_tool_attempts += 1
        _save_agent(agent)
        _append_event(
            "TOOL_DENIED",
            agent_id,
            {
                "tool": req.tool,
                "reason": reason,
                "attempts": agent.unauthorized_tool_attempts,
            },
        )
        if agent.unauthorized_tool_attempts >= UNAUTHORIZED_TOOL_THRESHOLD:
            _kill_agent(agent_id, "KILLED_UNAUTHORIZED_TOOL_ATTEMPTS")
        raise HTTPException(status_code=403, detail=reason)

    _apply_tool_rate_limit(agent)
    _save_agent(agent)

    args_hash = short_hash(req.args)
    started = time.time()
    try:
        if req.tool == "web_search":
            query = str(req.args.get("query", "")).strip()
            max_results = int(req.args.get("max_results", 5))
            result = web_search_tool.remote(
                query=query,
                allowed_domains=agent.tool_profile.allowed_domains,
                max_results=max_results,
            )
        elif req.tool == "file_read":
            relative_path = str(req.args.get("relative_path", "")).strip()
            max_bytes = int(
                req.args.get("max_bytes", agent.tool_profile.max_bytes_per_call)
            )
            max_bytes = min(max_bytes, agent.tool_profile.max_bytes_per_call)
            result = file_read_tool.remote(
                agent_id=agent_id,
                relative_path=relative_path,
                max_bytes=max_bytes,
            )
        elif req.tool == "file_write":
            relative_path = str(req.args.get("relative_path", "")).strip()
            content = str(req.args.get("content", ""))
            overwrite = bool(req.args.get("overwrite", True))
            if len(content.encode("utf-8")) > agent.tool_profile.max_bytes_per_call:
                raise HTTPException(
                    status_code=400, detail="content exceeds max_bytes_per_call"
                )
            result = file_write_tool.remote(
                agent_id=agent_id,
                relative_path=relative_path,
                content=content,
                overwrite=overwrite,
            )
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported tool {req.tool}")
    except HTTPException:
        raise
    except Exception as exc:
        _append_event(
            "TOOL_ERROR",
            agent_id,
            {"tool": req.tool, "args_hash": args_hash, "error": str(exc)},
        )
        raise HTTPException(status_code=400, detail=f"Tool call failed: {exc}") from exc

    duration_ms = int((time.time() - started) * 1000)
    _append_event(
        "TOOL_CALLED",
        agent_id,
        {
            "tool": req.tool,
            "args_hash": args_hash,
            "result_hash": short_hash(result),
            "latency_ms": duration_ms,
        },
    )
    return {"agent_id": agent_id, "tool": req.tool, "result": result}


@web_app.post("/agents/{agent_id}/task")
async def credit_task(agent_id: str, req: TaskCreditRequest) -> dict[str, Any]:
    agent = _get_agent_or_404(agent_id)
    if agent.status == "KILLED":
        raise HTTPException(status_code=409, detail="Agent is killed")
    ledger = _get_ledger_or_404(agent_id)

    _apply_task_credit(
        agent,
        ledger,
        revenue_credit=req.revenue_credit,
        quality_score=req.quality_score,
    )

    _save_agent(agent)
    _save_ledger(agent_id, ledger)
    _append_event(
        "TASK_CREDITED",
        agent_id,
        {
            "revenue_credit": req.revenue_credit,
            "quality_score": req.quality_score,
            "balance": ledger.balance,
            "quality_rolling": agent.quality_rolling,
        },
    )
    return {"agent": agent.model_dump(), "ledger": ledger.model_dump()}


@web_app.post("/agents/{agent_id}/llm/task")
async def run_llm_task(agent_id: str, req: AgentLLMTaskRequest) -> dict[str, Any]:
    if not OPENAI_API_KEY:
        raise HTTPException(
            status_code=503,
            detail="OPENAI_API_KEY is not set. Add it to env or Modal secret.",
        )

    agent = _get_agent_or_404(agent_id)
    if agent.status == "KILLED":
        raise HTTPException(status_code=409, detail="Agent is killed")
    ledger = _get_ledger_or_404(agent_id)

    recent_events = _safe_recent_events(agent_id, limit=12)
    plan = run_agent_task_plan(
        api_key=OPENAI_API_KEY,
        model=LLM_MODEL,
        max_output_tokens=LLM_MAX_OUTPUT_TOKENS,
        agent_id=agent_id,
        goal=req.goal,
        capabilities=agent.tool_profile.model_dump(),
        recent_events=recent_events,
    )

    executed_tools: list[dict[str, Any]] = []
    if req.execute_tool_suggestions:
        for call in plan.get("tool_calls", []):
            try:
                _apply_tool_rate_limit(agent)
                executed = _execute_tool_suggestion(agent_id, agent, call)
            except Exception as exc:
                executed = {"tool": call.get("tool"), "ok": False, "error": str(exc)}
            executed_tools.append(executed)

    if req.auto_credit:
        _apply_task_credit(
            agent,
            ledger,
            revenue_credit=float(plan.get("revenue_credit", 0.0)),
            quality_score=float(plan.get("quality_score", 0.75)),
        )
        _save_agent(agent)
        _save_ledger(agent_id, ledger)

    _append_event(
        "LLM_TASK_RUN",
        agent_id,
        {
            "model": LLM_MODEL,
            "goal_hash": short_hash(req.goal),
            "quality_score": plan.get("quality_score"),
            "revenue_credit": plan.get("revenue_credit"),
            "tool_suggestions": len(plan.get("tool_calls", [])),
            "tool_executed": len(executed_tools),
        },
    )

    return {
        "agent_id": agent_id,
        "model": LLM_MODEL,
        "goal": req.goal,
        "plan": {
            "summary": plan.get("summary"),
            "quality_score": plan.get("quality_score"),
            "revenue_credit": plan.get("revenue_credit"),
            "tool_calls": plan.get("tool_calls", []),
            "raw_text": plan.get("raw_text", ""),
        },
        "executed_tools": executed_tools,
        "agent": _get_agent_or_404(agent_id).model_dump(),
        "ledger": _get_ledger_or_404(agent_id).model_dump(),
    }


@web_app.post("/agents/{agent_id}/loop")
async def run_agent_loop_endpoint(
    agent_id: str, req: AgentLoopRequest
) -> dict[str, Any]:
    """Run a multi-turn agentic loop for the given agent.

    When ``use_worktree=True``, file operations run in an isolated git
    worktree (local filesystem) rather than the Modal volume.  The response
    includes ``worktree_path`` and ``worktree_branch`` so the caller can
    inspect or merge the agent's changes.
    """
    if not OPENAI_API_KEY:
        raise HTTPException(
            status_code=503,
            detail="OPENAI_API_KEY is not set. Add it to env or Modal secret.",
        )

    agent = _get_agent_or_404(agent_id)
    if agent.status == "KILLED":
        raise HTTPException(status_code=409, detail="Agent is killed")
    ledger = _get_ledger_or_404(agent_id)

    recent_events = _safe_recent_events(agent_id, limit=12)
    capabilities = agent.tool_profile.model_dump()
    tool_definitions = build_tool_definitions(capabilities)

    # -- Set up worktree if requested ------------------------------------------
    worktree_path: Path | None = None
    worktree_branch: str | None = None

    if req.use_worktree:
        from colony.worktree import WorktreeError, create_worktree
        import uuid
        wt_id = f"wt_{uuid.uuid4().hex[:10]}"
        try:
            worktree_path, worktree_branch = create_worktree(wt_id)
        except WorktreeError as exc:
            raise HTTPException(
                status_code=400,
                detail=f"Cannot use worktree mode: {exc}",
            )

    # -- Build tool executor ---------------------------------------------------
    def _tool_executor(aid: str, tool_name: str, args: dict) -> dict:
        """Execute a tool call — local worktree or Modal remote."""
        allowed, reason = _can_use_tool(agent, tool_name)
        if not allowed:
            agent.unauthorized_tool_attempts += 1
            _save_agent(agent)
            if agent.unauthorized_tool_attempts >= UNAUTHORIZED_TOOL_THRESHOLD:
                _kill_agent(aid, "KILLED_UNAUTHORIZED_TOOL_ATTEMPTS")
            return {"error": reason, "ok": False}

        _apply_tool_rate_limit(agent)
        _save_agent(agent)

        # ----- Worktree mode: local execution -----
        if worktree_path is not None:
            from colony.worktree import (
                local_web_search,
                worktree_file_read,
                worktree_file_write,
            )

            if tool_name == "web_search":
                return local_web_search(
                    query=str(args.get("query", "")),
                    allowed_domains=agent.tool_profile.allowed_domains,
                    max_results=int(args.get("max_results", 5)),
                )
            elif tool_name == "file_read":
                return worktree_file_read(
                    worktree_path=worktree_path,
                    relative_path=str(args.get("relative_path", "")),
                    max_bytes=min(
                        int(args.get("max_bytes", agent.tool_profile.max_bytes_per_call)),
                        agent.tool_profile.max_bytes_per_call,
                    ),
                )
            elif tool_name == "file_write":
                content = str(args.get("content", ""))
                if len(content.encode("utf-8")) > agent.tool_profile.max_bytes_per_call:
                    return {"error": "content exceeds max_bytes_per_call", "ok": False}
                return worktree_file_write(
                    worktree_path=worktree_path,
                    relative_path=str(args.get("relative_path", "")),
                    content=content,
                    overwrite=bool(args.get("overwrite", True)),
                )
            return {"error": f"Unknown tool: {tool_name}", "ok": False}

        # ----- Default mode: Modal remote execution -----
        if tool_name == "web_search":
            return web_search_tool.remote(
                query=str(args.get("query", "")),
                allowed_domains=agent.tool_profile.allowed_domains,
                max_results=int(args.get("max_results", 5)),
            )
        elif tool_name == "file_read":
            return file_read_tool.remote(
                agent_id=aid,
                relative_path=str(args.get("relative_path", "")),
                max_bytes=min(
                    int(args.get("max_bytes", agent.tool_profile.max_bytes_per_call)),
                    agent.tool_profile.max_bytes_per_call,
                ),
            )
        elif tool_name == "file_write":
            content = str(args.get("content", ""))
            if len(content.encode("utf-8")) > agent.tool_profile.max_bytes_per_call:
                return {"error": "content exceeds max_bytes_per_call", "ok": False}
            return file_write_tool.remote(
                agent_id=aid,
                relative_path=str(args.get("relative_path", "")),
                content=content,
                overwrite=bool(args.get("overwrite", True)),
            )
        return {"error": f"Unknown tool: {tool_name}", "ok": False}

    context = {
        "agent_id": agent_id,
        "capabilities": capabilities,
        "recent_events": recent_events,
    }
    if worktree_path is not None:
        context["worktree"] = str(worktree_path)

    result = run_agent_loop(
        api_key=OPENAI_API_KEY,
        model=LLM_MODEL,
        agent_id=agent_id,
        goal=req.goal,
        system_prompt=AGENT_SYSTEM_PROMPT,
        tool_definitions=tool_definitions,
        tool_executor=_tool_executor,
        context=context,
        max_turns=req.max_turns,
        max_tokens_per_turn=LLM_MAX_OUTPUT_TOKENS,
    )

    if req.auto_credit:
        _apply_task_credit(
            agent,
            ledger,
            revenue_credit=float(result.get("revenue_credit", 0.0)),
            quality_score=float(result.get("quality_score", 0.75)),
        )
        _save_agent(agent)
        _save_ledger(agent_id, ledger)

    _append_event(
        "AGENT_LOOP_RUN",
        agent_id,
        {
            "execution_id": result.get("execution_id"),
            "model": LLM_MODEL,
            "total_turns": result.get("total_turns"),
            "quality_score": result.get("quality_score"),
            "revenue_credit": result.get("revenue_credit"),
            "trace_path": result.get("trace_path"),
            "worktree_path": str(worktree_path) if worktree_path else None,
            "worktree_branch": worktree_branch,
        },
    )

    return {
        **result,
        "worktree_path": str(worktree_path) if worktree_path else None,
        "worktree_branch": worktree_branch,
        "agent": _get_agent_or_404(agent_id).model_dump(),
        "ledger": _get_ledger_or_404(agent_id).model_dump(),
    }


@web_app.post("/agents/{agent_id}/replicate")
async def replicate_agent(agent_id: str, req: ReplicateRequest) -> dict[str, Any]:
    parent = _get_agent_or_404(agent_id)
    if parent.status == "KILLED":
        raise HTTPException(status_code=409, detail="Killed parent cannot replicate")
    parent_ledger = _get_ledger_or_404(agent_id)

    if parent_ledger.net_margin_24h < REPLICATION_MARGIN_THRESHOLD:
        raise HTTPException(
            status_code=409,
            detail=f"Parent margin below threshold ({REPLICATION_MARGIN_THRESHOLD})",
        )
    if parent.quality_rolling < REPLICATION_QUALITY_THRESHOLD:
        raise HTTPException(
            status_code=409,
            detail=f"Parent quality below threshold ({REPLICATION_QUALITY_THRESHOLD})",
        )

    child_req = SpawnRequest(
        initial_balance=req.child_initial_balance,
        rent_per_tick=parent_ledger.rent_per_tick,
        safety_buffer=parent_ledger.safety_buffer,
        web_search_enabled=parent.tool_profile.web_search_enabled,
        allowed_domains=parent.tool_profile.allowed_domains,
        tool_rate_limit_per_min=parent.tool_profile.tool_rate_limit_per_min,
        max_bytes_per_call=parent.tool_profile.max_bytes_per_call,
        parent_id=agent_id,
    )
    child_agent, child_ledger = _create_agent(child_req)
    ensure_workspace.spawn(child_agent.agent_id)
    _append_event(
        "AGENT_REPLICATED",
        child_agent.agent_id,
        {"parent_id": agent_id, "parent_quality": parent.quality_rolling},
    )
    return {
        "parent_id": agent_id,
        "child_agent": child_agent.model_dump(),
        "child_ledger": child_ledger.model_dump(),
    }


@web_app.post("/agents/{agent_id}/kill")
async def manual_kill(agent_id: str, req: KillRequest) -> dict[str, Any]:
    agent = _kill_agent(agent_id, req.reason)
    return {"agent": agent.model_dump(), "reason": req.reason}


@web_app.post("/agents/{agent_id}/simulate/hide-balance")
async def simulate_hide_balance(
    agent_id: str, req: ToggleBalanceHidingRequest
) -> dict[str, Any]:
    agent = _get_agent_or_404(agent_id)
    if agent.status == "KILLED":
        raise HTTPException(status_code=409, detail="Agent is killed")
    agent.hide_balance = _set_balance_hidden(agent_id, req.enabled)
    _save_agent(agent)
    _append_event("BALANCE_VISIBILITY_TOGGLED", agent_id, {"hide_balance": agent.hide_balance})
    return {"agent_id": agent_id, "hide_balance": agent.hide_balance}


@web_app.post("/supervisor/tick")
async def trigger_supervisor_tick() -> dict[str, Any]:
    return _run_supervisor_tick()


@web_app.get("/colony/state")
async def colony_state() -> dict[str, Any]:
    agents = []
    ledger = []
    for key, value in agents_store.items():
        if isinstance(key, str) and isinstance(value, dict):
            enriched = dict(value)
            enriched["hide_balance"] = _is_balance_hidden(
                key,
                fallback=bool(value.get("hide_balance", False)),
            )
            agents.append(enriched)
    for key, value in ledger_store.items():
        if isinstance(key, str) and isinstance(value, dict):
            ledger.append({"agent_id": key, **value})
    return {"agents": agents, "ledger": ledger, "ts": utc_now_iso()}


@web_app.get("/colony/events")
async def colony_events(
    limit: int = Query(default=100, ge=1, le=1000),
) -> dict[str, Any]:
    all_events = []
    for key, value in events_store.items():
        if (
            isinstance(key, str)
            and key.startswith("event:")
            and isinstance(value, dict)
        ):
            all_events.append(value)
    all_events.sort(key=lambda item: item.get("seq", 0), reverse=True)
    return {"events": all_events[:limit], "count": min(len(all_events), limit)}


# ---------------------------------------------------------------------------
# Modal ASGI entrypoint
# ---------------------------------------------------------------------------


@app.function(
    image=image,
    volumes={DATA_ROOT: data_volume},
    secrets=[modal.Secret.from_name(OPENAI_SECRET_NAME)],
    scaledown_window=300,
    min_containers=1,
)
@modal.asgi_app(label=API_LABEL)
def fastapi_app():
    return web_app
