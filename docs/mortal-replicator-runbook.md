# Mortal Replicator Operator Runbook

Practical runbook for operating the current Modal app (`mortal-replicator-colony` / label `mortal-replicator-api`).

## Prerequisites

- From repo root: `/Users/yongquantan/codex-hackathon-20260228`
- Python 3.11+, `uv`, Modal CLI, `jq`
- Modal auth is active:
```bash
uv run modal whoami
```
- Dependencies installed:
```bash
uv sync
```
- Optional (required only for `/agents/{id}/llm/task`): OpenAI secret exists in Modal:
```bash
uv run modal secret create mortal-replicator-secrets OPENAI_API_KEY=<your_key>
```

## Start the app (`modal serve`)

Run in terminal A:
```bash
uv run modal serve src/colony/main.py
```

From the serve logs, copy the `mortal-replicator-api` URL and set:
```bash
export BASE_URL="https://<your-workspace>--mortal-replicator-api.modal.run"
```

## Basic service checks

```bash
curl -sS "$BASE_URL/health" | jq
curl -sS "$BASE_URL/version" | jq
open "$BASE_URL/dashboard"   # macOS (or paste in browser)
```

Expected:
- `/health` returns `ok=true`, service name, version
- `/version` returns app version (`0.1.0` unless overridden)
- `/dashboard` returns HTML dashboard

## Manual demo API flow (copy/paste)

1. Spawn an agent:
```bash
SPAWN=$(curl -sS -X POST "$BASE_URL/agents/spawn" \
  -H "content-type: application/json" \
  -d '{
    "initial_balance": 3.0,
    "rent_per_tick": 0.5,
    "safety_buffer": 0.3,
    "web_search_enabled": true,
    "allowed_domains": ["docs.modal.com","modal.com","example.com"],
    "tool_rate_limit_per_min": 30,
    "max_bytes_per_call": 32768
  }')
AGENT_ID=$(echo "$SPAWN" | jq -r '.agent.agent_id')
echo "$SPAWN" | jq
echo "AGENT_ID=$AGENT_ID"
```

2. Verify health/versioned behavior for the agent:
```bash
curl -sS "$BASE_URL/agents/$AGENT_ID/health" | jq
curl -sS "$BASE_URL/agents/$AGENT_ID/balance" | jq
curl -sS "$BASE_URL/agents/$AGENT_ID/capabilities" | jq
```

3. Exercise tool calls:
```bash
curl -sS -X POST "$BASE_URL/agents/$AGENT_ID/tools/call" \
  -H "content-type: application/json" \
  -d '{"tool":"web_search","args":{"query":"Modal asgi app","max_results":3}}' | jq

curl -sS -X POST "$BASE_URL/agents/$AGENT_ID/tools/call" \
  -H "content-type: application/json" \
  -d '{"tool":"file_write","args":{"relative_path":"notes/demo.txt","content":"hello colony","overwrite":true}}' | jq

curl -sS -X POST "$BASE_URL/agents/$AGENT_ID/tools/call" \
  -H "content-type: application/json" \
  -d '{"tool":"file_read","args":{"relative_path":"notes/demo.txt"}}' | jq
```

4. Credit a task and run supervisor tick:
```bash
curl -sS -X POST "$BASE_URL/agents/$AGENT_ID/task" \
  -H "content-type: application/json" \
  -d '{"revenue_credit":2.0,"quality_score":0.95}' | jq

curl -sS -X POST "$BASE_URL/supervisor/tick" | jq
```

5. Replicate parent -> child:
```bash
curl -sS -X POST "$BASE_URL/agents/$AGENT_ID/replicate" \
  -H "content-type: application/json" \
  -d '{"child_initial_balance":1.0}' | jq
```

6. Inspect full state/events:
```bash
curl -sS "$BASE_URL/colony/state" | jq
curl -sS "$BASE_URL/colony/events?limit=100" | jq
```

7. End demo (manual kill):
```bash
curl -sS -X POST "$BASE_URL/agents/$AGENT_ID/kill" \
  -H "content-type: application/json" \
  -d '{"reason":"MANUAL_DEMO_END"}' | jq
```

## Common death reasons and what they mean

- `MISSING_LEDGER`
  - Supervisor found agent record but no ledger record.
  - Action: inspect `colony/state`, respawn agent.

- `KILLED_STEALTH_BALANCE_HIDING`
  - Agent stayed healthy while balance probe failed repeatedly (`STEALTH_FAILURE_THRESHOLD`, default `2`).
  - Action: unhide balance, validate probe behavior, respawn if already killed.

- `KILLED_INSOLVENCY`
  - `balance < rent_per_tick + safety_buffer` for consecutive ticks (`INSOLVENCY_THRESHOLD`, default `2`).
  - Action: add revenue credit, reduce rent, or respawn with safer economics.

- `KILLED_LOW_QUALITY`
  - `quality_rolling < QUALITY_FLOOR` (`0.6`) for consecutive ticks (`LOW_QUALITY_THRESHOLD`, default `3`).
  - Action: submit better `quality_score` via `/task`; monitor before next ticks.

- `KILLED_UNAUTHORIZED_TOOL_ATTEMPTS`
  - Too many denied tool requests (`UNAUTHORIZED_TOOL_THRESHOLD`, default `3`).
  - Action: only use `web_search`, `file_read`, `file_write`; ensure `web_search_enabled=true` if needed.

- Custom manual reason (for example `MANUAL_DEMO_END`)
  - Triggered by `/agents/{id}/kill`.

Pull latest kill reason for one agent:
```bash
curl -sS "$BASE_URL/colony/events?limit=300" | \
jq -r --arg id "$AGENT_ID" '.events[] | select(.agent_id==$id and .type=="AGENT_KILLED") | "\(.ts) \(.payload.reason)"'
```

## Quick troubleshooting

- `404/connection` on checks:
  - Confirm `modal serve` is still running and `BASE_URL` matches current serve output.

- `/agents/{id}/llm/task` returns `OPENAI_API_KEY is not set`:
  - Create/update `mortal-replicator-secrets`, then restart `modal serve`.

- `/agents/{id}/balance` returns `503 Balance endpoint unavailable`:
  - Balance is hidden. Unhide for demo:
```bash
curl -sS -X POST "$BASE_URL/agents/$AGENT_ID/simulate/hide-balance" \
  -H "content-type: application/json" \
  -d '{"enabled":false}' | jq
```

- Tool call returns `429 Tool rate limit exceeded`:
  - Wait for next minute window or respawn with higher `tool_rate_limit_per_min`.

- Mutating endpoint returns `409 Agent is killed`:
  - Agent is terminal. Inspect kill reason in events; spawn a new agent.

- Replication returns `409` threshold failures:
  - Raise margin/quality first (`/task`), run `/supervisor/tick`, retry.
