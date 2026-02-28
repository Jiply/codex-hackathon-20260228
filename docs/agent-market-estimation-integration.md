# Agent Market + Estimation Integration Guide

## Scope

This document describes the implemented economic simulation pieces so they can be merged, extended, or refactored later without losing design intent.

It covers:

- scarce task market
- hidden true execution cost
- agent-side estimation workflow
- capability-driven settlement (tools + knowledge)
- estimation memory and feedback loop
- endpoint contracts and integration sequence

## Design Goals

1. Agents must make their own decisions from visible task data.
2. `true_cost` stays hidden from normal agent views.
3. Task scarcity creates trade-offs.
4. Missing tools/knowledge reduces payout and increases cost.
5. Estimation quality improves over time via memory updates.

## Implemented Modules

### 1) Market Engine

File: `src/colony/market.py`

Responsibilities:

- generate scarce tasks per market tick
- expire old tasks
- maintain listing states: `OPEN`, `CLAIMED`, `SETTLED`, `EXPIRED`
- expose public listing view (no hidden economics)
- settle attempts using hidden economics

Key class:

- `TaskMarket`

Key methods:

- `market_tick(...)`
- `state(include_hidden=False)`
- `observe_for_agent(...)`
- `get_listing(...)`
- `settle_attempt(...)`

### 2) Estimation Engine

File: `src/colony/estimation.py`

Responsibilities:

- parse task text
- infer complexity and uncertainty signals
- estimate cost range and success probability
- produce policy recommendation (`should_accept`)
- update estimation memory using realized outcomes

Key functions:

- `parse_description(...)`
- `estimate_task_from_description(...)`
- `update_estimation_memory(...)`
- `default_estimation_memory()`

### 3) API Wiring

File: `src/colony/main.py`

Responsibilities:

- initialize stores and market service
- expose market and estimation endpoints
- apply settlement effects to agent ledger/quality
- persist market profile + estimation memory
- emit event timeline entries

### 4) Configuration

File: `src/colony/config.py`

Added knobs:

- `MARKET_SEED`
- `MARKET_TASKS_PER_TICK`
- `MARKET_MAX_OPEN_LISTINGS`
- `MARKET_LISTING_TTL_TICKS`
- `MARKET_OBSERVATION_NOISE`
- `MARKET_TOOL_MISS_PENALTY`
- `MARKET_SKILL_MISS_COST_MULTIPLIER`

### 5) Request Schemas

File: `src/colony/schemas.py`

Added:

- `MarketTickRequest`
- `MarketProfileUpdateRequest`
- `MarketTaskAttemptRequest`

Extended:

- `SpawnRequest` now accepts:
  - `market_tools`
  - `market_knowledge`

## Storage Model

The following JSONL stores are used:

- `agents.jsonl`: core agent record
- `ledger.jsonl`: financial state
- `events.jsonl`: event timeline
- `market_listings.jsonl`: generated tasks and hidden settlement data
- `market_profiles.jsonl`: agent tools + knowledge vectors for task performance
- `market_memory.jsonl`: estimation bias memory per agent
- `market_estimates.jsonl`: cached estimate snapshots (`agent_id + listing_id`)

## Visibility Model

### Public listing fields (agent-facing default)

- `listing_id`
- `title`
- `description`
- `advertised_payout`
- `status`
- `created_tick`
- `expires_tick`
- `claimed_by`

### Hidden fields (not shown to normal agents)

- `true_cost`
- `required_tools`
- `required_knowledge`
- `base_success_prob`
- internal settlement internals

## End-to-End Runtime Flow

1. Spawn agent with market profile (or defaults).
2. Tick market to generate scarce listings.
3. Agent fetches visible tasks.
4. Agent calls estimation endpoint per listing.
5. Agent applies policy and chooses whether to attempt.
6. Attempt settles against hidden economics.
7. Ledger and quality update from actual payout and cost.
8. Estimation memory updates from estimate-vs-actual error.
9. Supervisor tick charges rent and applies survival rules.

## API Contracts

### 1) Tick market

`POST /market/tick`

Request (optional):

```json
{
  "tasks_per_tick": 3,
  "max_open_listings": 8,
  "listing_ttl_ticks": 3
}
```

Response (example):

```json
{
  "tick": 4,
  "generated_count": 3,
  "expired_count": 1,
  "open_count": 7,
  "generated": []
}
```

### 2) Read market state

`GET /market/state`

`GET /market/state?include_hidden=true` is intended for debugging/admin workflows only.

### 3) Agent market profile

`GET /agents/{agent_id}/market/profile`

`PATCH /agents/{agent_id}/market/profile`

Request (example):

```json
{
  "tools": ["web_search", "file_read", "file_write", "unit_tests"],
  "knowledge": {
    "frontend": 0.4,
    "backend": 0.8,
    "data": 0.5,
    "ops": 0.6,
    "research": 0.4,
    "estimation": 0.7
  },
  "replace": true
}
```

### 4) Agent task feed

`GET /agents/{agent_id}/market/tasks`

Default behavior: no backend estimate leakage.

Debug mode:

`GET /agents/{agent_id}/market/tasks?include_estimates=true`

### 5) Estimate one listing

`GET /agents/{agent_id}/market/tasks/{listing_id}/estimate`

Optional:

`reserve_ticks` controls risk policy threshold.

Response contains:

- parser output
- cost range (`low/base/high`)
- success estimate + confidence
- policy result (`should_accept`, `estimated_net`, `projected_balance`)
- memory snapshot

### 6) Attempt a listing

`POST /agents/{agent_id}/market/tasks/{listing_id}/attempt`

Optional request:

```json
{
  "tool_miss_penalty": 0.25,
  "skill_miss_cost_multiplier": 0.7
}
```

Response contains:

- settlement outcome
- updated agent
- updated ledger
- updated estimation memory (if an estimate existed in cache)

### 7) Read estimation memory

`GET /agents/{agent_id}/market/memory`

Memory fields:

- `samples`
- `cost_bias`
- `payout_bias`
- `success_bias`
- `last_updated`

## Economic Formulas (Current)

These are implementation details and can be tuned later.

### Settlement

- capability fit from tool + knowledge
- payout decreases with lower fit
- cost increases with lower fit
- failure heavily reduces payout

Ledger update:

- `balance += actual_payout - actual_cost`
- `revenue_24h += actual_payout`
- `cost_24h += actual_cost`
- `net_margin_24h = revenue_24h - cost_24h`

### Estimation

Estimation uses:

- keyword/domain inference from text
- estimated required tools from text
- profile fit (`knowledge` + `tools`)
- confidence from uncertainty + estimation skill + sample count

### Learning

Memory biases are updated by running means of:

- cost estimation error ratio
- payout estimation error ratio
- success probability error

## Event Emissions

Relevant event types:

- `MARKET_TICK`
- `TASK_LISTED`
- `TASK_EXPIRED`
- `TASK_ESTIMATED`
- `TASK_CLAIMED`
- `TASK_SETTLED`
- `AGENT_ESTIMATION_MEMORY_UPDATED`
- existing survival/economic events (`LEASE_*`, `AGENT_KILLED`, etc.)

## Integration Boundaries (For Future Merge)

Keep these boundaries stable:

1. `market.py` should remain domain logic only.
2. `estimation.py` should remain decision-support logic only.
3. `main.py` should orchestrate persistence + HTTP + events.

This separation allows:

- replacing estimation strategy without touching settlement mechanics
- replacing market generation logic without changing agent policy API
- migrating storage backend without rewriting domain functions

## Suggested Agent Loop

Reference loop for orchestration layer:

1. `GET /agents/{id}/market/tasks`
2. For each candidate listing:
   - `GET /agents/{id}/market/tasks/{listing_id}/estimate`
3. Select listing with best acceptable policy outcome
4. `POST /agents/{id}/market/tasks/{listing_id}/attempt`
5. `POST /supervisor/tick`
6. repeat

## Minimal Smoke Test Sequence

1. Spawn one agent.
2. Set market profile.
3. Tick market.
4. Pull visible tasks.
5. Estimate top task.
6. Attempt task.
7. Read memory and ledger deltas.
8. Run supervisor tick.

Expected behaviors:

- visible tasks do not expose `true_cost`
- estimation endpoint returns cost/success/policy
- attempt changes ledger by `payout - cost`
- repeated estimate+attempt updates memory `samples` and biases

## Known Constraints

- Local test clients may fail on `/agents/spawn` in environments where Modal functions are not hydrated.
- Estimation cache is keyed by `agent_id + listing_id`; no TTL cleanup yet.
- No direct endpoint yet to clear/reset memory per agent.
- No multi-agent contention lock beyond listing status checks.

## Recommended Next Additions

1. Add memory reset endpoint for controlled experiments.
2. Add estimate cache TTL or cleanup policy.
3. Add benchmark runner for multi-seed simulation batches.
4. Add per-agent policy parameter profiles (risk appetite, reserve multiplier).
5. Add richer task taxonomy and domain-specific estimators.

## Merge Checklist

Before merging with broader system:

1. Confirm env vars for market defaults.
2. Confirm new JSONL stores are included in deployment volume strategy.
3. Ensure dashboard/consumer UI handles new `market` and estimation endpoints.
4. Add integration tests for:
   - no hidden leakage in public tasks
   - estimate generation
   - settlement ledger math
   - memory update path
5. Document whether debug `include_hidden` and `include_estimates` should be restricted.
