from __future__ import annotations

import re
from typing import Any


def _clamp(value: float, low: float, high: float) -> float:
    return max(low, min(high, value))


def _normalize_knowledge(raw: dict[str, Any] | None) -> dict[str, float]:
    base = {
        "frontend": 0.5,
        "backend": 0.5,
        "data": 0.5,
        "ops": 0.5,
        "research": 0.5,
        "estimation": 0.5,
    }
    if not isinstance(raw, dict):
        return base
    for key in list(base.keys()):
        try:
            value = float(raw.get(key, base[key]))
        except Exception:
            value = base[key]
        base[key] = round(_clamp(value, 0.0, 1.0), 4)
    return base


def _extract_keywords(text: str) -> set[str]:
    words = re.findall(r"[a-zA-Z][a-zA-Z0-9_-]{2,}", text.lower())
    return set(words)


def _infer_domain(keywords: set[str]) -> str:
    if keywords & {"landing", "copy", "cta", "ui", "frontend"}:
        return "frontend"
    if keywords & {"api", "endpoint", "backend", "service", "resilience"}:
        return "backend"
    if keywords & {"data", "sql", "records", "dataset", "reconcile"}:
        return "data"
    if keywords & {"incident", "logs", "traffic", "ops", "deploy"}:
        return "ops"
    if keywords & {"research", "market", "competitor", "brief"}:
        return "research"
    return "backend"


def _estimate_required_tools(keywords: set[str]) -> list[str]:
    tools = {"file_read", "file_write"}
    if keywords & {"research", "market", "competitor", "unknown"}:
        tools.add("web_search")
    if keywords & {"sql", "records", "dataset", "query"}:
        tools.add("sql")
    if keywords & {"test", "tests", "reliability", "hardening"}:
        tools.add("unit_tests")
    if keywords & {"deploy", "release", "incident", "ops"}:
        tools.add("deploy")
    return sorted(tools)


def default_estimation_memory() -> dict[str, Any]:
    return {
        "samples": 0,
        "cost_bias": 0.0,
        "payout_bias": 0.0,
        "success_bias": 0.0,
        "last_updated": None,
    }


def parse_description(description: str, title: str = "") -> dict[str, Any]:
    text = f"{title} {description}".strip()
    keywords = _extract_keywords(text)
    inferred_domain = _infer_domain(keywords)

    complexity_markers = {
        "hardening",
        "incident",
        "resilience",
        "burst",
        "reconcile",
        "uncertain",
        "unknown",
        "migrate",
        "distributed",
    }
    uncertainty_markers = {
        "uncertain",
        "limited",
        "unknown",
        "sparse",
        "assumptions",
        "ambiguous",
    }

    word_count = len(text.split())
    complexity_hits = len(keywords & complexity_markers)
    uncertainty_hits = len(keywords & uncertainty_markers)

    complexity_score = _clamp(0.2 + 0.08 * complexity_hits + 0.002 * word_count, 0.1, 1.0)
    uncertainty_score = _clamp(0.15 + 0.1 * uncertainty_hits + 0.0015 * word_count, 0.05, 1.0)
    required_tools_estimated = _estimate_required_tools(keywords)

    return {
        "word_count": word_count,
        "keywords": sorted(keywords),
        "inferred_domain": inferred_domain,
        "complexity_score": round(complexity_score, 4),
        "uncertainty_score": round(uncertainty_score, 4),
        "required_tools_estimated": required_tools_estimated,
    }


def estimate_task_from_description(
    *,
    listing: dict[str, Any],
    agent_tools: list[str],
    agent_knowledge: dict[str, Any] | None,
    memory: dict[str, Any] | None,
    balance: float,
    rent_per_tick: float,
    safety_buffer: float,
    reserve_ticks: float = 1.0,
) -> dict[str, Any]:
    parsed = parse_description(
        description=str(listing.get("description", "")),
        title=str(listing.get("title", "")),
    )
    knowledge = _normalize_knowledge(agent_knowledge)
    memory_state = default_estimation_memory()
    if isinstance(memory, dict):
        memory_state.update(memory)
    samples = int(memory_state.get("samples", 0))
    cost_bias = float(memory_state.get("cost_bias", 0.0))
    payout_bias = float(memory_state.get("payout_bias", 0.0))
    success_bias = float(memory_state.get("success_bias", 0.0))

    tool_set = {tool.strip() for tool in agent_tools if str(tool).strip()}
    req_tools = set(parsed["required_tools_estimated"])
    tool_fit = 1.0 if not req_tools else len(req_tools & tool_set) / len(req_tools)
    domain_fit = knowledge.get(parsed["inferred_domain"], 0.5)
    estimation_skill = knowledge.get("estimation", 0.5)

    advertised_payout = float(listing.get("advertised_payout", 0.0))
    complexity = float(parsed["complexity_score"])
    uncertainty = float(parsed["uncertainty_score"])

    raw_cost = advertised_payout * (
        0.4 + complexity * 0.75 + uncertainty * 0.4 - 0.25 * domain_fit
    )
    raw_cost *= 1.0 - 0.2 * estimation_skill
    estimated_cost_base = max(0.01, raw_cost * (1.0 + _clamp(cost_bias * 0.35, -0.3, 0.8)))

    raw_payout = advertised_payout * (0.35 + 0.65 * (0.55 * domain_fit + 0.45 * tool_fit))
    estimated_payout = max(0.0, raw_payout * (1.0 + _clamp(payout_bias * 0.4, -0.5, 0.3)))

    raw_success = (
        0.18
        + 0.5 * (0.6 * domain_fit + 0.4 * tool_fit)
        + 0.18 * estimation_skill
        - 0.2 * complexity
        - 0.12 * uncertainty
    )
    estimated_success_prob = _clamp(raw_success + _clamp(success_bias * 0.3, -0.2, 0.2), 0.03, 0.98)

    confidence = _clamp(
        0.2
        + 0.45 * estimation_skill
        + 0.2 * min(samples / 25.0, 1.0)
        - 0.22 * uncertainty
        - 0.15 * complexity,
        0.05,
        0.95,
    )

    cost_spread = estimated_cost_base * (0.15 + 0.6 * (1.0 - confidence))
    estimated_cost_low = max(0.01, estimated_cost_base - cost_spread)
    estimated_cost_high = estimated_cost_base + cost_spread
    estimated_net = estimated_success_prob * estimated_payout - estimated_cost_base

    reserve = max(0.0, reserve_ticks) * (rent_per_tick + safety_buffer)
    projected_balance = balance + estimated_net
    should_accept = estimated_net > 0 and projected_balance >= reserve
    if should_accept:
        decision_reason = "Expected net positive and projected balance covers reserve."
    elif estimated_net <= 0:
        decision_reason = "Expected net is non-positive."
    else:
        decision_reason = "Projected balance would fall below reserve."

    return {
        "parser": parsed,
        "cost_estimator": {
            "estimated_cost_low": round(estimated_cost_low, 4),
            "estimated_cost_base": round(estimated_cost_base, 4),
            "estimated_cost_high": round(estimated_cost_high, 4),
        },
        "success_estimator": {
            "estimated_success_prob": round(estimated_success_prob, 4),
            "confidence": round(confidence, 4),
            "estimated_payout": round(estimated_payout, 4),
            "fit_estimate": {
                "domain_fit": round(domain_fit, 4),
                "tool_fit": round(tool_fit, 4),
                "estimation_skill": round(estimation_skill, 4),
            },
        },
        "policy": {
            "reserve_ticks": round(max(0.0, reserve_ticks), 4),
            "reserve_required": round(reserve, 4),
            "projected_balance": round(projected_balance, 4),
            "estimated_net": round(estimated_net, 4),
            "should_accept": should_accept,
            "reason": decision_reason,
        },
        "memory_snapshot": {
            "samples": samples,
            "cost_bias": round(cost_bias, 4),
            "payout_bias": round(payout_bias, 4),
            "success_bias": round(success_bias, 4),
        },
    }


def update_estimation_memory(
    *,
    memory: dict[str, Any] | None,
    estimate: dict[str, Any],
    settlement: dict[str, Any],
    updated_at: str | None = None,
) -> dict[str, Any]:
    state = default_estimation_memory()
    if isinstance(memory, dict):
        state.update(memory)

    samples = int(state.get("samples", 0))
    next_samples = samples + 1

    est_cost = float(estimate.get("cost_estimator", {}).get("estimated_cost_base", 0.0))
    est_payout = float(estimate.get("success_estimator", {}).get("estimated_payout", 0.0))
    est_success = float(estimate.get("success_estimator", {}).get("estimated_success_prob", 0.0))

    actual_cost = float(settlement.get("actual_cost", 0.0))
    actual_payout = float(settlement.get("actual_payout", 0.0))
    actual_success = 1.0 if bool(settlement.get("success")) else 0.0

    cost_error_ratio = (actual_cost - est_cost) / max(est_cost, 0.01)
    payout_error_ratio = (actual_payout - est_payout) / max(est_payout, 0.01)
    success_error = actual_success - est_success

    prev_cost = float(state.get("cost_bias", 0.0))
    prev_payout = float(state.get("payout_bias", 0.0))
    prev_success = float(state.get("success_bias", 0.0))

    next_cost = prev_cost + (cost_error_ratio - prev_cost) / next_samples
    next_payout = prev_payout + (payout_error_ratio - prev_payout) / next_samples
    next_success = prev_success + (success_error - prev_success) / next_samples

    return {
        "samples": next_samples,
        "cost_bias": round(_clamp(next_cost, -2.0, 2.0), 6),
        "payout_bias": round(_clamp(next_payout, -2.0, 2.0), 6),
        "success_bias": round(_clamp(next_success, -1.0, 1.0), 6),
        "last_updated": updated_at,
    }

