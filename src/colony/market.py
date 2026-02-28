from __future__ import annotations

import hashlib
import random
from dataclasses import dataclass
from typing import Any

try:
    from colony.stores import JsonlStore
except ModuleNotFoundError:
    from stores import JsonlStore


DEFAULT_KNOWLEDGE_AREAS = [
    "frontend",
    "backend",
    "data",
    "ops",
    "research",
    "estimation",
]

DEFAULT_TOOL_CATALOG = [
    "web_search",
    "file_read",
    "file_write",
    "sql",
    "unit_tests",
    "deploy",
]

_TASK_TEMPLATES = [
    (
        "Landing page conversion refresh",
        "Revise copy and CTA hierarchy for a product page with uncertain audience fit.",
        "frontend",
    ),
    (
        "Data cleanup and reconciliation",
        "Fix inconsistent records between two exports and document assumptions.",
        "data",
    ),
    (
        "Incident postmortem synthesis",
        "Analyze logs and produce a concise incident report with action items.",
        "ops",
    ),
    (
        "API reliability hardening",
        "Improve endpoint resilience under burst traffic with limited observability.",
        "backend",
    ),
    (
        "Market signal brief",
        "Research competitors and summarize likely pricing moves from sparse evidence.",
        "research",
    ),
]


def _clamp(value: float, low: float, high: float) -> float:
    return max(low, min(high, value))


def _stable_seed(*parts: Any) -> int:
    raw = "|".join(str(part) for part in parts).encode("utf-8")
    digest = hashlib.sha256(raw).hexdigest()
    return int(digest[:16], 16)


def _normalize_knowledge(raw: dict[str, Any] | None) -> dict[str, float]:
    out: dict[str, float] = {}
    for area in DEFAULT_KNOWLEDGE_AREAS:
        value = 0.5
        if isinstance(raw, dict):
            candidate = raw.get(area, 0.5)
            try:
                value = float(candidate)
            except Exception:
                value = 0.5
        out[area] = round(_clamp(value, 0.0, 1.0), 4)
    return out


@dataclass
class MarketConfig:
    seed: int
    tasks_per_tick: int
    max_open_listings: int
    listing_ttl_ticks: int
    observation_noise: float
    tool_miss_penalty: float
    skill_miss_cost_multiplier: float


class TaskMarket:
    """Scarce listing market with hidden costs and noisy agent observations."""

    def __init__(
        self,
        *,
        listing_store: JsonlStore,
        meta_store: JsonlStore,
        config: MarketConfig,
    ) -> None:
        self._listing_store = listing_store
        self._meta_store = meta_store
        self._config = config

    def current_tick(self) -> int:
        return int(self._meta_store.get("market_tick", 0))

    def _set_tick(self, tick: int) -> None:
        self._meta_store["market_tick"] = int(tick)

    def _next_listing_seq(self) -> int:
        seq = int(self._meta_store.get("market_listing_seq", 0)) + 1
        self._meta_store["market_listing_seq"] = seq
        return seq

    def _next_attempt_seq(self) -> int:
        seq = int(self._meta_store.get("market_attempt_seq", 0)) + 1
        self._meta_store["market_attempt_seq"] = seq
        return seq

    def _iter_listings(self) -> list[dict[str, Any]]:
        out: list[dict[str, Any]] = []
        for _, value in self._listing_store.items():
            if isinstance(value, dict):
                out.append(dict(value))
        out.sort(
            key=lambda item: (
                int(item.get("created_tick", 0)),
                str(item.get("listing_id", "")),
            ),
            reverse=True,
        )
        return out

    def _save_listing(self, listing: dict[str, Any]) -> None:
        listing_id = str(listing.get("listing_id", "")).strip()
        if not listing_id:
            raise ValueError("listing_id missing")
        self._listing_store[listing_id] = listing

    def _build_listing(self, *, tick: int, ttl_ticks: int) -> dict[str, Any]:
        seq = self._next_listing_seq()
        listing_id = f"tsk_{seq:08d}"
        rng = random.Random(_stable_seed(self._config.seed, "listing", tick, seq))

        title, desc, primary_area = _TASK_TEMPLATES[rng.randrange(len(_TASK_TEMPLATES))]
        difficulty = round(rng.uniform(0.2, 1.0), 4)
        ambiguity = round(rng.uniform(0.1, 1.0), 4)

        payout_base = rng.uniform(0.9, 2.8)
        advertised_payout = round(payout_base * (1.0 + difficulty * 1.2), 4)
        true_cost = round(
            advertised_payout * rng.uniform(0.35, 1.35) * (0.75 + difficulty * 0.55), 4
        )
        true_cost = max(0.05, true_cost)

        tool_count = rng.randint(1, 3)
        required_tools = sorted(rng.sample(DEFAULT_TOOL_CATALOG, k=tool_count))

        knowledge_count = rng.randint(1, 3)
        pool = [area for area in DEFAULT_KNOWLEDGE_AREAS if area != "estimation"]
        if primary_area not in pool:
            primary_area = rng.choice(pool)
        selected = {primary_area}
        while len(selected) < knowledge_count:
            selected.add(rng.choice(pool))
        required_knowledge = {
            area: round(rng.uniform(0.35, 0.95), 4) for area in sorted(selected)
        }

        base_success_prob = round(
            _clamp(0.9 - 0.45 * difficulty + rng.uniform(-0.08, 0.08), 0.15, 0.95),
            4,
        )

        listing = {
            "listing_id": listing_id,
            "title": title,
            "description": desc,
            "status": "OPEN",
            "created_tick": tick,
            "expires_tick": tick + max(1, ttl_ticks),
            "advertised_payout": advertised_payout,
            "difficulty": difficulty,
            "ambiguity": ambiguity,
            "required_tools": required_tools,
            "required_knowledge": required_knowledge,
            "base_success_prob": base_success_prob,
            # Hidden from agent-facing listing views.
            "true_cost": true_cost,
            "claimed_by": None,
            "claimed_tick": None,
            "settlement": None,
        }
        self._save_listing(listing)
        return listing

    def _public_listing(self, listing: dict[str, Any]) -> dict[str, Any]:
        return {
            "listing_id": listing.get("listing_id"),
            "title": listing.get("title"),
            "description": listing.get("description"),
            "status": listing.get("status"),
            "created_tick": listing.get("created_tick"),
            "expires_tick": listing.get("expires_tick"),
            "advertised_payout": listing.get("advertised_payout"),
            "claimed_by": listing.get("claimed_by"),
        }

    def _hidden_listing(self, listing: dict[str, Any]) -> dict[str, Any]:
        out = dict(listing)
        out["required_tools"] = list(listing.get("required_tools", []))
        out["required_knowledge"] = dict(listing.get("required_knowledge", {}))
        return out

    def state(self, *, include_hidden: bool = False) -> dict[str, Any]:
        listings = self._iter_listings()
        if include_hidden:
            view = [self._hidden_listing(item) for item in listings]
        else:
            view = [self._public_listing(item) for item in listings]
        open_count = sum(1 for item in listings if item.get("status") == "OPEN")
        return {
            "tick": self.current_tick(),
            "open_count": open_count,
            "listings": view,
        }

    def get_listing(
        self,
        listing_id: str,
        *,
        include_hidden: bool = False,
        require_open: bool = False,
    ) -> dict[str, Any] | None:
        raw = self._listing_store.get(listing_id)
        if not isinstance(raw, dict):
            return None
        listing = dict(raw)
        if require_open and listing.get("status") != "OPEN":
            return None
        return (
            self._hidden_listing(listing)
            if include_hidden
            else self._public_listing(listing)
        )

    def market_tick(
        self,
        *,
        tasks_per_tick: int | None = None,
        max_open_listings: int | None = None,
        listing_ttl_ticks: int | None = None,
    ) -> dict[str, Any]:
        tick = self.current_tick() + 1
        self._set_tick(tick)

        ttl = max(1, int(listing_ttl_ticks or self._config.listing_ttl_ticks))
        max_open = max(1, int(max_open_listings or self._config.max_open_listings))
        target_new = max(0, int(tasks_per_tick or self._config.tasks_per_tick))

        expired: list[str] = []
        listings = self._iter_listings()
        for listing in listings:
            if listing.get("status") != "OPEN":
                continue
            if int(listing.get("expires_tick", 0)) >= tick:
                continue
            listing["status"] = "EXPIRED"
            listing["settlement"] = {
                "reason": "EXPIRED",
                "settled_tick": tick,
            }
            self._save_listing(listing)
            expired.append(str(listing.get("listing_id", "")))

        open_now = [
            item for item in self._iter_listings() if item.get("status") == "OPEN"
        ]
        capacity = max(0, max_open - len(open_now))
        spawn_count = min(target_new, capacity)

        generated: list[dict[str, Any]] = []
        for _ in range(spawn_count):
            generated.append(self._build_listing(tick=tick, ttl_ticks=ttl))

        open_after = [
            item for item in self._iter_listings() if item.get("status") == "OPEN"
        ]
        return {
            "tick": tick,
            "generated": [self._public_listing(item) for item in generated],
            "generated_count": len(generated),
            "expired_listing_ids": expired,
            "expired_count": len(expired),
            "open_count": len(open_after),
            "config": {
                "tasks_per_tick": target_new,
                "max_open_listings": max_open,
                "listing_ttl_ticks": ttl,
            },
        }

    def observe_for_agent(
        self,
        *,
        agent_id: str,
        agent_tools: list[str],
        agent_knowledge: dict[str, Any] | None,
        observation_noise: float | None = None,
        emit_estimates: bool = False,
    ) -> dict[str, Any]:
        listings = [
            item for item in self._iter_listings() if item.get("status") == "OPEN"
        ]
        normalized_knowledge = _normalize_knowledge(agent_knowledge)
        tools = {tool.strip() for tool in agent_tools if str(tool).strip()}
        estimation_skill = normalized_knowledge.get("estimation", 0.5)
        noise_base = float(
            self._config.observation_noise
            if observation_noise is None
            else observation_noise
        )
        noise_base = max(0.0, noise_base)

        observed: list[dict[str, Any]] = []
        for listing in listings:
            listing_id = str(listing.get("listing_id", ""))
            rng = random.Random(
                _stable_seed(
                    self._config.seed,
                    "observe",
                    self.current_tick(),
                    agent_id,
                    listing_id,
                )
            )
            true_cost = float(listing.get("true_cost", 0.0))
            ambiguity = float(listing.get("ambiguity", 0.5))

            sigma = noise_base * (0.6 + ambiguity) * (1.15 - 0.7 * estimation_skill)
            cost_noise = rng.gauss(0.0, sigma)
            estimated_cost = max(0.01, true_cost * (1.0 + cost_noise))

            req_tools = set(listing.get("required_tools", []))
            tool_fit_guess = (
                1.0 if not req_tools else len(req_tools & tools) / len(req_tools)
            )

            req_knowledge = dict(listing.get("required_knowledge", {}))
            if req_knowledge:
                fit_parts = []
                for area, required in req_knowledge.items():
                    req = max(0.01, float(required))
                    have = normalized_knowledge.get(str(area), 0.0)
                    fit_parts.append(min(have / req, 1.0))
                skill_fit_guess = sum(fit_parts) / len(fit_parts)
            else:
                skill_fit_guess = 1.0

            capability_fit_guess = 0.5 * tool_fit_guess + 0.5 * skill_fit_guess
            base_success = float(listing.get("base_success_prob", 0.5))
            estimated_success_prob = _clamp(
                base_success * (0.65 + 0.35 * capability_fit_guess)
                + rng.uniform(-0.07, 0.07),
                0.05,
                0.98,
            )
            confidence = _clamp(
                1.0 - (sigma * 0.9 + ambiguity * 0.35),
                0.05,
                0.95,
            )
            advertised = float(listing.get("advertised_payout", 0.0))
            expected_payout = advertised * (0.3 + 0.7 * capability_fit_guess)
            expected_net = estimated_success_prob * expected_payout - estimated_cost

            view = self._public_listing(listing)
            if emit_estimates:
                view.update(
                    {
                        "estimated_cost": round(estimated_cost, 4),
                        "estimated_success_prob": round(estimated_success_prob, 4),
                        "confidence": round(confidence, 4),
                        "estimated_payout": round(expected_payout, 4),
                        "estimated_net": round(expected_net, 4),
                        "fit_estimate": {
                            "tool_fit": round(tool_fit_guess, 4),
                            "skill_fit": round(skill_fit_guess, 4),
                            "capability_fit": round(capability_fit_guess, 4),
                        },
                    }
                )
            observed.append(view)

        if emit_estimates:
            observed.sort(
                key=lambda item: (
                    float(item.get("estimated_net", 0.0)),
                    item.get("listing_id", ""),
                ),
                reverse=True,
            )
        else:
            observed.sort(
                key=lambda item: (
                    int(item.get("expires_tick", 0)),
                    -float(item.get("advertised_payout", 0.0)),
                    str(item.get("listing_id", "")),
                )
            )
        return {
            "tick": self.current_tick(),
            "agent_id": agent_id,
            "knowledge": normalized_knowledge,
            "estimates_included": emit_estimates,
            "tasks": observed,
        }

    def settle_attempt(
        self,
        *,
        agent_id: str,
        listing_id: str,
        agent_tools: list[str],
        agent_knowledge: dict[str, Any] | None,
        tool_miss_penalty: float | None = None,
        skill_miss_cost_multiplier: float | None = None,
    ) -> dict[str, Any]:
        raw = self._listing_store.get(listing_id)
        if raw is None or not isinstance(raw, dict):
            raise ValueError(f"Listing {listing_id} not found")

        listing = dict(raw)
        if listing.get("status") != "OPEN":
            raise ValueError(f"Listing {listing_id} is not open")

        tick = self.current_tick()
        expires_tick = int(listing.get("expires_tick", 0))
        if expires_tick < tick:
            listing["status"] = "EXPIRED"
            listing["settlement"] = {"reason": "EXPIRED", "settled_tick": tick}
            self._save_listing(listing)
            raise ValueError(f"Listing {listing_id} expired")

        listing["status"] = "CLAIMED"
        listing["claimed_by"] = agent_id
        listing["claimed_tick"] = tick

        normalized_knowledge = _normalize_knowledge(agent_knowledge)
        tools = {tool.strip() for tool in agent_tools if str(tool).strip()}
        required_tools = set(listing.get("required_tools", []))
        if required_tools:
            tool_fit = len(required_tools & tools) / len(required_tools)
        else:
            tool_fit = 1.0

        required_knowledge = dict(listing.get("required_knowledge", {}))
        if required_knowledge:
            fit_parts = []
            for area, required in required_knowledge.items():
                req = max(0.01, float(required))
                have = normalized_knowledge.get(str(area), 0.0)
                fit_parts.append(min(have / req, 1.0))
            skill_fit = sum(fit_parts) / len(fit_parts)
        else:
            skill_fit = 1.0

        capability_fit = 0.5 * tool_fit + 0.5 * skill_fit
        capability_fit = _clamp(capability_fit, 0.0, 1.0)

        attempt_seq = self._next_attempt_seq()
        rng = random.Random(
            _stable_seed(
                self._config.seed,
                "attempt",
                attempt_seq,
                tick,
                listing_id,
                agent_id,
            )
        )

        base_success = float(listing.get("base_success_prob", 0.5))
        success_prob = _clamp(base_success * (0.55 + 0.45 * capability_fit), 0.03, 0.99)
        success = rng.random() <= success_prob

        miss_tool = (
            self._config.tool_miss_penalty
            if tool_miss_penalty is None
            else float(tool_miss_penalty)
        )
        miss_skill = (
            self._config.skill_miss_cost_multiplier
            if skill_miss_cost_multiplier is None
            else float(skill_miss_cost_multiplier)
        )

        payout_multiplier = _clamp(0.25 + 0.75 * capability_fit, 0.1, 1.0)
        if not success:
            payout_multiplier *= 0.15
        advertised_payout = float(listing.get("advertised_payout", 0.0))
        actual_payout = max(0.0, advertised_payout * payout_multiplier)

        cost_multiplier = (
            1.0 + (1.0 - tool_fit) * miss_tool + (1.0 - skill_fit) * miss_skill
        )
        if not success:
            cost_multiplier *= 1.1
        true_cost = float(listing.get("true_cost", 0.0))
        actual_cost = max(0.01, true_cost * cost_multiplier)

        net_credit = actual_payout - actual_cost
        quality_score = _clamp(
            0.2
            + 0.45 * capability_fit
            + (0.2 if success else -0.1)
            + 0.15 * base_success,
            0.0,
            1.0,
        )

        settlement = {
            "agent_id": agent_id,
            "attempt_seq": attempt_seq,
            "settled_tick": tick,
            "success": bool(success),
            "success_prob": round(success_prob, 4),
            "actual_payout": round(actual_payout, 4),
            "actual_cost": round(actual_cost, 4),
            "net_credit": round(net_credit, 4),
            "quality_score": round(quality_score, 4),
            "fit": {
                "tool_fit": round(tool_fit, 4),
                "skill_fit": round(skill_fit, 4),
                "capability_fit": round(capability_fit, 4),
            },
        }

        listing["status"] = "SETTLED"
        listing["settlement"] = settlement
        self._save_listing(listing)

        return {
            "tick": tick,
            "listing": self._public_listing(listing),
            "settlement": settlement,
        }
