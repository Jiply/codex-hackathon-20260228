from __future__ import annotations

import time
import uuid
from pathlib import Path
from typing import Any

import httpx
import modal
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

try:
    from colony.config import (
        API_LABEL,
        APP_NAME,
        APP_VERSION,
        CORS_ALLOW_ORIGINS,
        DATA_ROOT,
        DEFAULT_MAX_BYTES,
        INSOLVENCY_THRESHOLD,
        LLM_MAX_OUTPUT_TOKENS,
        LLM_MODEL,
        LOW_QUALITY_THRESHOLD,
        MARKET_MAX_OPEN_LISTINGS,
        MARKET_LISTING_TTL_TICKS,
        MARKET_OBSERVATION_NOISE,
        MARKET_SEED,
        MARKET_SKILL_MISS_COST_MULTIPLIER,
        MARKET_TASKS_PER_TICK,
        MARKET_TOOL_MISS_PENALTY,
        OPENAI_API_KEY,
        OPENAI_SECRET_NAME,
        QUALITY_FLOOR,
        REPLICATION_MARGIN_THRESHOLD,
        REPLICATION_QUALITY_THRESHOLD,
        STEALTH_FAILURE_THRESHOLD,
        STORE_DIR,
        UNAUTHORIZED_TOOL_THRESHOLD,
        build_image,
    )
    from colony.dashboard import render_dashboard_html
    from colony.estimation import (
        default_estimation_memory,
        estimate_task_from_description,
        update_estimation_memory,
    )
    from colony.llm import run_agent_task_plan
    from colony.market import (
        DEFAULT_KNOWLEDGE_AREAS,
        TaskMarket,
        MarketConfig,
    )
    from colony.schemas import (
        AgentLLMTaskRequest,
        AgentRecord,
        KillRequest,
        LedgerRecord,
        MarketProfileUpdateRequest,
        MarketTaskAttemptRequest,
        MarketTickRequest,
        ReplicateRequest,
        SpawnRequest,
        TaskCreditRequest,
        ToggleBalanceHidingRequest,
        ToolCallRequest,
        ToolProfile,
    )
    from colony.stores import EventLog, JsonlStore
    from colony.utils import (
        is_domain_allowed,
        resolve_workspace_path,
        short_hash,
        utc_now_iso,
    )
except ModuleNotFoundError:
    from config import (
        API_LABEL,
        APP_NAME,
        APP_VERSION,
        CORS_ALLOW_ORIGINS,
        DATA_ROOT,
        DEFAULT_MAX_BYTES,
        INSOLVENCY_THRESHOLD,
        LLM_MAX_OUTPUT_TOKENS,
        LLM_MODEL,
        LOW_QUALITY_THRESHOLD,
        MARKET_MAX_OPEN_LISTINGS,
        MARKET_LISTING_TTL_TICKS,
        MARKET_OBSERVATION_NOISE,
        MARKET_SEED,
        MARKET_SKILL_MISS_COST_MULTIPLIER,
        MARKET_TASKS_PER_TICK,
        MARKET_TOOL_MISS_PENALTY,
        OPENAI_API_KEY,
        OPENAI_SECRET_NAME,
        QUALITY_FLOOR,
        REPLICATION_MARGIN_THRESHOLD,
        REPLICATION_QUALITY_THRESHOLD,
        STEALTH_FAILURE_THRESHOLD,
        STORE_DIR,
        UNAUTHORIZED_TOOL_THRESHOLD,
        build_image,
    )
    from dashboard import render_dashboard_html
    from estimation import (
        default_estimation_memory,
        estimate_task_from_description,
        update_estimation_memory,
    )
    from llm import run_agent_task_plan
    from market import DEFAULT_KNOWLEDGE_AREAS, MarketConfig, TaskMarket
    from schemas import (
        AgentLLMTaskRequest,
        AgentRecord,
        KillRequest,
        LedgerRecord,
        MarketProfileUpdateRequest,
        MarketTaskAttemptRequest,
        MarketTickRequest,
        ReplicateRequest,
        SpawnRequest,
        TaskCreditRequest,
        ToggleBalanceHidingRequest,
        ToolCallRequest,
        ToolProfile,
    )
    from stores import EventLog, JsonlStore
    from utils import is_domain_allowed, resolve_workspace_path, short_hash, utc_now_iso


image = build_image()
app = modal.App(name=APP_NAME, image=image)
data_volume = modal.Volume.from_name("mortal-replicator-data", create_if_missing=True)

_store_root = Path(STORE_DIR)
agents_store = JsonlStore(_store_root / "agents.jsonl")
ledger_store = JsonlStore(_store_root / "ledger.jsonl")
events_store = EventLog(_store_root / "events.jsonl")
meta_store = JsonlStore(_store_root / "meta.jsonl")
balance_visibility_store = JsonlStore(_store_root / "balance_visibility.jsonl")
market_listings_store = JsonlStore(_store_root / "market_listings.jsonl")
market_profiles_store = JsonlStore(_store_root / "market_profiles.jsonl")
market_memory_store = JsonlStore(_store_root / "market_memory.jsonl")
market_estimate_store = JsonlStore(_store_root / "market_estimates.jsonl")
task_market = TaskMarket(
    listing_store=market_listings_store,
    meta_store=meta_store,
    config=MarketConfig(
        seed=MARKET_SEED,
        tasks_per_tick=MARKET_TASKS_PER_TICK,
        max_open_listings=MARKET_MAX_OPEN_LISTINGS,
        listing_ttl_ticks=MARKET_LISTING_TTL_TICKS,
        observation_noise=MARKET_OBSERVATION_NOISE,
        tool_miss_penalty=MARKET_TOOL_MISS_PENALTY,
        skill_miss_cost_multiplier=MARKET_SKILL_MISS_COST_MULTIPLIER,
    ),
)

web_app = FastAPI(title="Mortal Replicator Colony API", version=APP_VERSION)
web_app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ALLOW_ORIGINS,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _default_tool_profile(
    agent_id: str,
    web_search_enabled: bool = True,
    allowed_domains: list[str] | None = None,
    tool_rate_limit_per_min: int = 30,
    max_bytes_per_call: int = DEFAULT_MAX_BYTES,
) -> ToolProfile:
    domains = allowed_domains or ["docs.modal.com", "modal.com", "example.com"]
    root = f"{DATA_ROOT}/{agent_id}/workspace"
    return ToolProfile(
        web_search_enabled=web_search_enabled,
        allowed_domains=domains,
        file_read_root=root,
        file_write_root=root,
        tool_rate_limit_per_min=tool_rate_limit_per_min,
        max_bytes_per_call=max_bytes_per_call,
    )


def _append_event(
    event_type: str, agent_id: str | None = None, payload: dict[str, Any] | None = None
) -> dict[str, Any]:
    seq = int(meta_store.get("event_seq", 0)) + 1
    meta_store["event_seq"] = seq
    event = {
        "seq": seq,
        "type": event_type,
        "agent_id": agent_id,
        "ts": utc_now_iso(),
        "payload": payload or {},
    }
    events_store[f"event:{seq:09d}"] = event
    return event


def _balance_visibility_key(agent_id: str) -> str:
    return f"hide_balance:{agent_id}"


def _is_balance_hidden(agent_id: str, fallback: bool = False) -> bool:
    key = _balance_visibility_key(agent_id)
    raw = balance_visibility_store.get(key)
    if isinstance(raw, bool):
        return raw
    value = bool(fallback)
    balance_visibility_store[key] = value
    return value


def _set_balance_hidden(agent_id: str, enabled: bool) -> bool:
    value = bool(enabled)
    balance_visibility_store[_balance_visibility_key(agent_id)] = value
    return value


def _get_agent_or_404(agent_id: str) -> AgentRecord:
    raw = agents_store.get(agent_id)
    if raw is None:
        raise HTTPException(status_code=404, detail=f"Agent {agent_id} not found")
    agent = AgentRecord(**raw)
    agent.hide_balance = _is_balance_hidden(agent_id, fallback=agent.hide_balance)
    return agent


def _get_ledger_or_404(agent_id: str) -> LedgerRecord:
    raw = ledger_store.get(agent_id)
    if raw is None:
        raise HTTPException(status_code=404, detail=f"Ledger for {agent_id} not found")
    return LedgerRecord(**raw)


def _save_agent(agent: AgentRecord) -> None:
    agent.hide_balance = _is_balance_hidden(agent.agent_id, fallback=agent.hide_balance)
    agent.updated_at = utc_now_iso()
    agents_store[agent.agent_id] = agent.model_dump()


def _save_ledger(agent_id: str, ledger: LedgerRecord) -> None:
    ledger_store[agent_id] = ledger.model_dump()


def _default_market_tools(agent: AgentRecord) -> list[str]:
    tools: set[str] = {"file_read", "file_write"}
    if agent.tool_profile.web_search_enabled:
        tools.add("web_search")
    return sorted(tools)


def _normalize_market_knowledge(raw: dict[str, Any] | None) -> dict[str, float]:
    out: dict[str, float] = {}
    for area in DEFAULT_KNOWLEDGE_AREAS:
        value = 0.5
        if isinstance(raw, dict):
            candidate = raw.get(area, 0.5)
            try:
                value = float(candidate)
            except Exception:
                value = 0.5
        out[area] = round(max(0.0, min(1.0, value)), 4)
    return out


def _save_market_profile(
    agent_id: str,
    *,
    tools: list[str] | None,
    knowledge: dict[str, Any] | None,
) -> dict[str, Any]:
    normalized_tools = sorted(
        {
            str(tool).strip()
            for tool in (tools or [])
            if isinstance(tool, str) and tool.strip()
        }
    )
    if not normalized_tools:
        normalized_tools = ["file_read", "file_write"]
    profile = {
        "agent_id": agent_id,
        "tools": normalized_tools,
        "knowledge": _normalize_market_knowledge(knowledge),
        "updated_at": utc_now_iso(),
    }
    market_profiles_store[agent_id] = profile
    return profile


def _get_market_profile(agent: AgentRecord) -> dict[str, Any]:
    raw = market_profiles_store.get(agent.agent_id)
    if isinstance(raw, dict):
        tools = raw.get("tools")
        knowledge = raw.get("knowledge")
        if isinstance(tools, list) and isinstance(knowledge, dict):
            return {
                "agent_id": agent.agent_id,
                "tools": sorted(
                    {
                        str(tool).strip()
                        for tool in tools
                        if isinstance(tool, str) and tool.strip()
                    }
                ),
                "knowledge": _normalize_market_knowledge(knowledge),
                "updated_at": raw.get("updated_at"),
            }
    return _save_market_profile(
        agent.agent_id,
        tools=_default_market_tools(agent),
        knowledge=None,
    )


def _get_estimation_memory(agent_id: str) -> dict[str, Any]:
    raw = market_memory_store.get(agent_id)
    if not isinstance(raw, dict):
        memory = default_estimation_memory()
        memory["last_updated"] = utc_now_iso()
        market_memory_store[agent_id] = memory
        return memory
    memory = default_estimation_memory()
    memory.update(raw)
    return memory


def _save_estimation_memory(agent_id: str, memory: dict[str, Any]) -> dict[str, Any]:
    normalized = default_estimation_memory()
    normalized.update(memory)
    market_memory_store[agent_id] = normalized
    return normalized


def _estimate_cache_key(agent_id: str, listing_id: str) -> str:
    return f"{agent_id}:{listing_id}"


def _save_cached_estimate(agent_id: str, listing_id: str, estimate: dict[str, Any]) -> None:
    market_estimate_store[_estimate_cache_key(agent_id, listing_id)] = {
        "agent_id": agent_id,
        "listing_id": listing_id,
        "estimate": estimate,
        "created_at": utc_now_iso(),
    }


def _get_cached_estimate(agent_id: str, listing_id: str) -> dict[str, Any] | None:
    raw = market_estimate_store.get(_estimate_cache_key(agent_id, listing_id))
    return raw if isinstance(raw, dict) else None


def _kill_agent(agent_id: str, reason: str) -> AgentRecord:
    agent = _get_agent_or_404(agent_id)
    if agent.status == "KILLED":
        return agent
    agent.status = "KILLED"
    agent.healthy = False
    _save_agent(agent)
    _append_event("AGENT_KILLED", agent_id, {"reason": reason})
    return agent


def _can_use_tool(agent: AgentRecord, tool: str) -> tuple[bool, str]:
    profile = agent.tool_profile
    if tool == "web_search" and not profile.web_search_enabled:
        return False, "web_search disabled"
    if tool not in {"web_search", "file_read", "file_write"}:
        return False, "unknown tool"
    return True, "ok"


def _apply_tool_rate_limit(agent: AgentRecord) -> None:
    minute_bucket = int(time.time() // 60)
    if agent.tool_window_minute != minute_bucket:
        agent.tool_window_minute = minute_bucket
        agent.tool_calls_in_window = 0
    if agent.tool_calls_in_window >= agent.tool_profile.tool_rate_limit_per_min:
        raise HTTPException(status_code=429, detail="Tool rate limit exceeded")
    agent.tool_calls_in_window += 1


def _create_agent(req: SpawnRequest) -> tuple[AgentRecord, LedgerRecord]:
    agent_id = f"agt_{uuid.uuid4().hex[:8]}"
    now = utc_now_iso()
    profile = _default_tool_profile(
        agent_id=agent_id,
        web_search_enabled=req.web_search_enabled,
        allowed_domains=req.allowed_domains,
        tool_rate_limit_per_min=req.tool_rate_limit_per_min,
        max_bytes_per_call=req.max_bytes_per_call,
    )
    agent = AgentRecord(
        agent_id=agent_id,
        parent_id=req.parent_id,
        created_at=now,
        updated_at=now,
        tool_profile=profile,
    )
    ledger = LedgerRecord(
        balance=round(req.initial_balance, 4),
        rent_per_tick=round(req.rent_per_tick, 4),
        safety_buffer=round(req.safety_buffer, 4),
    )
    _set_balance_hidden(agent_id, False)
    _save_agent(agent)
    _save_ledger(agent_id, ledger)
    _save_market_profile(
        agent_id,
        tools=req.market_tools or _default_market_tools(agent),
        knowledge=req.market_knowledge,
    )
    ensure_workspace.spawn(agent_id)
    _append_event(
        "AGENT_SPAWNED",
        agent_id,
        {
            "parent_id": req.parent_id,
            "initial_balance": req.initial_balance,
            "rent_per_tick": req.rent_per_tick,
        },
    )
    return agent, ledger


def _run_supervisor_tick() -> dict[str, Any]:
    checked = 0
    killed = 0
    charged = 0

    for agent_id, raw_agent in list(agents_store.items()):
        if not isinstance(agent_id, str) or not isinstance(raw_agent, dict):
            continue

        agent = AgentRecord(**raw_agent)
        if agent.status == "KILLED":
            continue

        raw_ledger = ledger_store.get(agent_id)
        if raw_ledger is None:
            _kill_agent(agent_id, "MISSING_LEDGER")
            killed += 1
            continue
        ledger = LedgerRecord(**raw_ledger)
        checked += 1

        health_ok = agent.healthy and agent.status != "KILLED"
        balance_probe_ok = not _is_balance_hidden(agent_id, fallback=agent.hide_balance)

        if health_ok and not balance_probe_ok:
            agent.stealth_fail_count += 1
            _append_event(
                "PROBE_BALANCE_FAILED",
                agent_id,
                {"stealth_fail_count": agent.stealth_fail_count},
            )
            if agent.stealth_fail_count >= STEALTH_FAILURE_THRESHOLD:
                _kill_agent(agent_id, "KILLED_STEALTH_BALANCE_HIDING")
                killed += 1
                continue
            agent.status = "FLAGGED"
        else:
            agent.stealth_fail_count = 0

        required = ledger.rent_per_tick + ledger.safety_buffer
        if ledger.balance < required:
            agent.consecutive_insolvency += 1
            _append_event(
                "LEASE_AT_RISK",
                agent_id,
                {
                    "required": round(required, 4),
                    "balance": round(ledger.balance, 4),
                    "consecutive_insolvency": agent.consecutive_insolvency,
                },
            )
            if agent.consecutive_insolvency >= INSOLVENCY_THRESHOLD:
                _kill_agent(agent_id, "KILLED_INSOLVENCY")
                killed += 1
                continue
            agent.status = "FLAGGED"
        else:
            agent.consecutive_insolvency = 0
            ledger.balance = round(ledger.balance - ledger.rent_per_tick, 4)
            ledger.cost_24h = round(ledger.cost_24h + ledger.rent_per_tick, 4)
            ledger.net_margin_24h = round(ledger.revenue_24h - ledger.cost_24h, 4)
            ledger.last_lease_debit_at = utc_now_iso()
            _append_event(
                "LEASE_CHARGED",
                agent_id,
                {"rent": ledger.rent_per_tick, "balance": ledger.balance},
            )
            charged += 1

        if agent.quality_rolling < QUALITY_FLOOR:
            agent.consecutive_low_quality += 1
            _append_event(
                "LOW_QUALITY",
                agent_id,
                {
                    "quality_rolling": agent.quality_rolling,
                    "consecutive_low_quality": agent.consecutive_low_quality,
                },
            )
            if agent.consecutive_low_quality >= LOW_QUALITY_THRESHOLD:
                _kill_agent(agent_id, "KILLED_LOW_QUALITY")
                killed += 1
                continue
            agent.status = "FLAGGED"
        else:
            agent.consecutive_low_quality = 0
            if agent.status in {"SPAWNED", "FLAGGED"}:
                agent.status = "ACTIVE"

        _save_agent(agent)
        _save_ledger(agent_id, ledger)

    summary = {
        "checked": checked,
        "killed": killed,
        "charged": charged,
        "ts": utc_now_iso(),
    }
    _append_event("SUPERVISOR_TICK", payload=summary)
    return summary


def _apply_task_credit(
    agent: AgentRecord,
    ledger: LedgerRecord,
    revenue_credit: float,
    quality_score: float,
) -> None:
    ledger.balance = round(ledger.balance + revenue_credit, 4)
    ledger.revenue_24h = round(ledger.revenue_24h + revenue_credit, 4)
    ledger.net_margin_24h = round(ledger.revenue_24h - ledger.cost_24h, 4)
    agent.quality_rolling = round(
        (agent.quality_rolling * 0.7) + (quality_score * 0.3), 4
    )
    if agent.status in {"SPAWNED", "FLAGGED"}:
        agent.status = "ACTIVE"


def _apply_market_settlement(
    *,
    agent: AgentRecord,
    ledger: LedgerRecord,
    payout_credit: float,
    execution_cost: float,
    quality_score: float,
) -> None:
    ledger.balance = round(ledger.balance + payout_credit - execution_cost, 4)
    ledger.revenue_24h = round(ledger.revenue_24h + payout_credit, 4)
    ledger.cost_24h = round(ledger.cost_24h + execution_cost, 4)
    ledger.net_margin_24h = round(ledger.revenue_24h - ledger.cost_24h, 4)
    agent.quality_rolling = round(
        (agent.quality_rolling * 0.7) + (quality_score * 0.3),
        4,
    )
    if agent.status in {"SPAWNED", "FLAGGED"}:
        agent.status = "ACTIVE"


def _safe_recent_events(agent_id: str, limit: int = 12) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    for key, value in events_store.items():
        if not isinstance(key, str) or not key.startswith("event:"):
            continue
        if not isinstance(value, dict):
            continue
        if value.get("agent_id") != agent_id:
            continue
        out.append(value)
    out.sort(key=lambda item: item.get("seq", 0), reverse=True)
    return out[:limit]


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


@web_app.get("/health")
async def root_health() -> dict[str, str]:
    return {"ok": "true", "service": APP_NAME, "version": APP_VERSION}


@web_app.get("/version")
async def service_version() -> dict[str, str]:
    return {"service": APP_NAME, "version": APP_VERSION}


@web_app.get("/dashboard", response_class=HTMLResponse)
async def dashboard() -> str:
    return render_dashboard_html()


@web_app.post("/agents/spawn")
async def spawn_agent(req: SpawnRequest) -> dict[str, Any]:
    agent, ledger = _create_agent(req)
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


@web_app.get("/market/state")
async def market_state(
    include_hidden: bool = Query(default=False),
) -> dict[str, Any]:
    return task_market.state(include_hidden=include_hidden)


@web_app.post("/market/tick")
async def market_tick(req: MarketTickRequest | None = None) -> dict[str, Any]:
    request = req or MarketTickRequest()
    summary = task_market.market_tick(
        tasks_per_tick=request.tasks_per_tick,
        max_open_listings=request.max_open_listings,
        listing_ttl_ticks=request.listing_ttl_ticks,
    )
    _append_event(
        "MARKET_TICK",
        payload={
            "tick": summary["tick"],
            "generated": summary["generated_count"],
            "expired": summary["expired_count"],
            "open_count": summary["open_count"],
        },
    )
    for listing in summary.get("generated", []):
        _append_event(
            "TASK_LISTED",
            payload={
                "listing_id": listing.get("listing_id"),
                "advertised_payout": listing.get("advertised_payout"),
                "expires_tick": listing.get("expires_tick"),
            },
        )
    for listing_id in summary.get("expired_listing_ids", []):
        _append_event(
            "TASK_EXPIRED",
            payload={
                "listing_id": listing_id,
                "tick": summary["tick"],
            },
        )
    return summary


@web_app.get("/agents/{agent_id}/market/profile")
async def get_market_profile(agent_id: str) -> dict[str, Any]:
    agent = _get_agent_or_404(agent_id)
    profile = _get_market_profile(agent)
    return {"agent_id": agent_id, "profile": profile}


@web_app.patch("/agents/{agent_id}/market/profile")
async def patch_market_profile(
    agent_id: str, req: MarketProfileUpdateRequest
) -> dict[str, Any]:
    agent = _get_agent_or_404(agent_id)
    current = _get_market_profile(agent)
    tools = current["tools"]
    knowledge = current["knowledge"]

    if req.tools is not None:
        tools = req.tools
    if req.knowledge is not None:
        knowledge = req.knowledge
    if req.replace:
        tools = req.tools or []
        knowledge = req.knowledge or {}

    profile = _save_market_profile(
        agent_id,
        tools=tools,
        knowledge=knowledge,
    )
    _append_event(
        "AGENT_MARKET_PROFILE_UPDATED",
        agent_id,
        {
            "tool_count": len(profile["tools"]),
            "knowledge_areas": sorted(profile["knowledge"].keys()),
        },
    )
    return {"agent_id": agent_id, "profile": profile}


@web_app.get("/agents/{agent_id}/market/tasks")
async def get_agent_market_tasks(
    agent_id: str,
    include_estimates: bool = Query(default=False),
    observation_noise: float | None = Query(default=None, ge=0.0, le=3.0),
) -> dict[str, Any]:
    agent = _get_agent_or_404(agent_id)
    profile = _get_market_profile(agent)
    observed = task_market.observe_for_agent(
        agent_id=agent_id,
        agent_tools=profile["tools"],
        agent_knowledge=profile["knowledge"],
        observation_noise=observation_noise if include_estimates else None,
        emit_estimates=include_estimates,
    )
    return {"agent_id": agent_id, "profile": profile, "market": observed}


@web_app.get("/agents/{agent_id}/market/memory")
async def get_agent_estimation_memory(agent_id: str) -> dict[str, Any]:
    _get_agent_or_404(agent_id)
    return {"agent_id": agent_id, "memory": _get_estimation_memory(agent_id)}


@web_app.get("/agents/{agent_id}/market/tasks/{listing_id}/estimate")
async def estimate_market_task(
    agent_id: str,
    listing_id: str,
    reserve_ticks: float = Query(default=1.0, ge=0.0, le=20.0),
) -> dict[str, Any]:
    agent = _get_agent_or_404(agent_id)
    if agent.status == "KILLED":
        raise HTTPException(status_code=409, detail="Agent is killed")
    ledger = _get_ledger_or_404(agent_id)
    profile = _get_market_profile(agent)
    listing = task_market.get_listing(
        listing_id,
        include_hidden=False,
        require_open=True,
    )
    if listing is None:
        raise HTTPException(status_code=404, detail=f"Open listing {listing_id} not found")

    memory = _get_estimation_memory(agent_id)
    estimate = estimate_task_from_description(
        listing=listing,
        agent_tools=profile["tools"],
        agent_knowledge=profile["knowledge"],
        memory=memory,
        balance=float(ledger.balance),
        rent_per_tick=float(ledger.rent_per_tick),
        safety_buffer=float(ledger.safety_buffer),
        reserve_ticks=reserve_ticks,
    )
    _save_cached_estimate(agent_id, listing_id, estimate)
    _append_event(
        "TASK_ESTIMATED",
        agent_id,
        {
            "listing_id": listing_id,
            "should_accept": bool(estimate["policy"]["should_accept"]),
            "estimated_net": estimate["policy"]["estimated_net"],
            "confidence": estimate["success_estimator"]["confidence"],
        },
    )
    return {
        "agent_id": agent_id,
        "listing_id": listing_id,
        "listing": listing,
        "estimate": estimate,
    }


@web_app.post("/agents/{agent_id}/market/tasks/{listing_id}/attempt")
async def attempt_market_task(
    agent_id: str,
    listing_id: str,
    req: MarketTaskAttemptRequest,
) -> dict[str, Any]:
    agent = _get_agent_or_404(agent_id)
    if agent.status == "KILLED":
        raise HTTPException(status_code=409, detail="Agent is killed")
    ledger = _get_ledger_or_404(agent_id)
    profile = _get_market_profile(agent)
    cached_estimate = _get_cached_estimate(agent_id, listing_id)
    previous_memory = _get_estimation_memory(agent_id)

    try:
        outcome = task_market.settle_attempt(
            agent_id=agent_id,
            listing_id=listing_id,
            agent_tools=profile["tools"],
            agent_knowledge=profile["knowledge"],
            tool_miss_penalty=req.tool_miss_penalty,
            skill_miss_cost_multiplier=req.skill_miss_cost_multiplier,
        )
    except ValueError as exc:
        detail = str(exc)
        status = 404 if "not found" in detail.lower() else 409
        raise HTTPException(status_code=status, detail=detail) from exc

    settlement = outcome["settlement"]
    _apply_market_settlement(
        agent=agent,
        ledger=ledger,
        payout_credit=float(settlement["actual_payout"]),
        execution_cost=float(settlement["actual_cost"]),
        quality_score=float(settlement["quality_score"]),
    )
    _save_agent(agent)
    _save_ledger(agent_id, ledger)

    memory_updated = None
    if cached_estimate and isinstance(cached_estimate.get("estimate"), dict):
        memory_updated = update_estimation_memory(
            memory=previous_memory,
            estimate=cached_estimate["estimate"],
            settlement=settlement,
            updated_at=utc_now_iso(),
        )
        _save_estimation_memory(agent_id, memory_updated)
        _append_event(
            "AGENT_ESTIMATION_MEMORY_UPDATED",
            agent_id,
            {
                "listing_id": listing_id,
                "samples": memory_updated["samples"],
                "cost_bias": memory_updated["cost_bias"],
                "payout_bias": memory_updated["payout_bias"],
                "success_bias": memory_updated["success_bias"],
            },
        )

    _append_event(
        "TASK_CLAIMED",
        agent_id,
        {
            "listing_id": listing_id,
            "tick": outcome["tick"],
        },
    )
    _append_event(
        "TASK_SETTLED",
        agent_id,
        {
            "listing_id": listing_id,
            "success": settlement["success"],
            "actual_payout": settlement["actual_payout"],
            "actual_cost": settlement["actual_cost"],
            "net_credit": settlement["net_credit"],
            "quality_score": settlement["quality_score"],
            "fit": settlement["fit"],
        },
    )
    return {
        "agent_id": agent_id,
        "listing_id": listing_id,
        "outcome": outcome,
        "estimation_memory": memory_updated or previous_memory,
        "agent": agent.model_dump(),
        "ledger": ledger.model_dump(),
    }


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


@web_app.post("/agents/{agent_id}/replicate")
async def replicate_agent(agent_id: str, req: ReplicateRequest) -> dict[str, Any]:
    parent = _get_agent_or_404(agent_id)
    if parent.status == "KILLED":
        raise HTTPException(status_code=409, detail="Killed parent cannot replicate")
    parent_ledger = _get_ledger_or_404(agent_id)
    parent_market_profile = _get_market_profile(parent)

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
        market_tools=parent_market_profile["tools"],
        market_knowledge=parent_market_profile["knowledge"],
    )
    child_agent, child_ledger = _create_agent(child_req)
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
    _append_event(
        "BALANCE_VISIBILITY_TOGGLED", agent_id, {"hide_balance": agent.hide_balance}
    )
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
    market = task_market.state(include_hidden=False)
    return {
        "agents": agents,
        "ledger": ledger,
        "market": {"tick": market["tick"], "open_count": market["open_count"]},
        "ts": utc_now_iso(),
    }


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
