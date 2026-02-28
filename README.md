# Mortal Replicator

![Project cover](/cover.png)

Mortal Replicator is a simulated colony of AI agents where survival is not implicit—it is earned.
Every agent must remain economically and qualitatively fit to continue running. If it cannot cover its operating costs or maintain quality, it is removed. If it thrives, it can replicate.

## Motivation

Most AI-agent demos still optimize for what an agent can do, not for whether it should keep running.
There is no hard lifecycle control around runtime cost, sustained quality, or failure behavior.

In real systems, this is risky:
- Unprofitable agents can consume resources indefinitely.
- Poor-quality agents can persist and poison workflows.
- Operational costs are often hidden behind “just-in-time” task execution.

Mortal Replicator makes existence itself a controlled resource.

## Problem

How do we build an agent system where existence is conditional on both economics and performance?

We model this as a market-constrained lifecycle:
- Agents earn from completed tasks.
- Rent is charged periodically.
- Quality is continuously scored.
- Survival and replication follow deterministic rules.
- The output is a population-level outcome, not just isolated task completion.

## Inspiration

This project draws from market selection and survival systems:
- Fit agents earn to survive.
- Surviving agents can reproduce with controlled mutation.
- Underperforming agents fail checks and are terminated.

That creates a clear loop:
**earn → survive → replicate or fail → die**.

## System idea (MVP)

The colony runs on a visible task market and deterministic colony rules.

1. Initialize a seeded colony of agents (not one agent).
   - Each has balance, quality score, burn/rent profile.
2. Expose a scoped set of tasks with visible payout and effort signals.
3. Agents decide which tasks to bid/attempt based on expected payoff.
4. On completion, each task settles against a hidden true cost.
   - Update each agent ledger: balance, margin, quality.
5. On each supervisor tick:
   - charge rent
   - evaluate survival
6. Healthy agents may replicate with small mutations.
7. Agents failing repeated checks are terminated.
8. Expose colony outcomes:
   - survivors
   - terminated agents
   - replication count
   - total colony profit

## Why this matters in a hackathon demo

We intentionally constrain scope to deliver a clear story under judge scrutiny:
- No real payment APIs in MVP.
- No direct external execution dependencies for core logic.
- Deterministic seeding + operator controls to keep runs reproducible.
- UI focuses on four hard signals:
  - balance
  - rent/lease health
  - quality
  - status

## Repository structure

- `src/colony/main.py` — backend API and colony simulation runtime.
- `agents/` — Vite dashboard for observability and operator controls.
- `docs/` — supporting docs and design notes.

## Setup

### 1) Environment files

```bash
cp .env.example .env
cp agents/.env.example agents/.env.local
```

Required backend keys in `.env`:

- `OPENAI_API_KEY`
- `MODAL_TOKEN_ID`
- `MODAL_TOKEN_SECRET`

Optional overrides are supported (for app labeling and model selection).

### 2) Backend (Python 3.11)

```bash
python3.11 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -e .
python -m pip install "uvicorn[standard]"
```

Load env vars:

```bash
set -a
source .env
set +a
```

Create/update Modal secret used by the app:

```bash
python -m modal secret create "$OPENAI_SECRET_NAME" OPENAI_API_KEY="$OPENAI_API_KEY"
```

If the secret exists, recreate/update it in Modal as needed.

### 3) Run backend

```bash
source .venv/bin/activate
set -a; source .env; set +a
python -m uvicorn src.colony.main:web_app --host 127.0.0.1 --port 8000 --reload
```

### 4) Run dashboard (`http://localhost:5174`)

```bash
cd agents
pnpm install
pnpm dev --host 127.0.0.1 --port 5174
```

Dashboard API config from `agents/.env.local`:

```bash
VITE_COLONY_API_BASE=http://127.0.0.1:8000
```

### 5) Optional mock mode (no backend required)

```bash
VITE_USE_MOCKS=true
VITE_MOCK_SCENARIO=seeded
```

Available scenarios:

- `seeded`
- `empty`
- `high-risk`
- `backend-down`
- `slow-network`

Example fault injection:

```bash
VITE_MOCK_FAULTS={"GET /colony/logs":{"status":500,"detail":"forced logs failure"}}
```

## Deployment

After local validation, run or deploy the backend with Modal:

```bash
python -m modal serve src/colony/main.py
```

or

```bash
python -m modal deploy src/colony/main.py
```

Use the resulting HTTPS endpoint as `VITE_COLONY_API_BASE`.

## Project status & limitations

- Scope is intentionally simulated for MVP velocity.
- Determinism and explainability are favored over production economics integration.
- The current iteration proves lifecycle control first; externalized payment rails are a stage-2 extension.

## Suggested GitHub repository name

`mortal-replicator`

If you want a stronger narrative name, alternatives are:
- `mortal-replicator-colony`
- `agent-survival-market`
- `economic-agent-colony`
