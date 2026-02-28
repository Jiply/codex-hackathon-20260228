from __future__ import annotations

import time
import uuid
from typing import Any

from fastapi import HTTPException

from colony.config import (
    DATA_ROOT,
    DEFAULT_MAX_BYTES,
    INSOLVENCY_THRESHOLD,
    LOW_QUALITY_THRESHOLD,
    QUALITY_FLOOR,
    STEALTH_FAILURE_THRESHOLD,
)
from colony.schemas import AgentRecord, LedgerRecord, SpawnRequest, ToolProfile
from colony.stores import (
    agents_store,
    balance_visibility_store,
    events_store,
    ledger_store,
    meta_store,
)
from colony.utils import utc_now_iso


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
    event_type: str,
    agent_id: str | None = None,
    payload: dict[str, Any] | None = None,
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
    agent.quality_rolling = round((agent.quality_rolling * 0.7) + (quality_score * 0.3), 4)
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
