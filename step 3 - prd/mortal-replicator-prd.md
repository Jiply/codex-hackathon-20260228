# Product Requirements Document (PRD)

## 1) Document Control

- Product: Mortal Replicator - Agent Colony
- Version: v1 (Hackathon MVP)
- Date: February 28, 2026
- Status: Draft for build

## 2) Product Summary

Mortal Replicator is a live, visual simulation where autonomous agents must earn enough revenue to pay recurring compute rent. Agents that remain profitable survive and can replicate. Agents that fail survivability checks are terminated automatically.

Core loop: `earn -> survive -> replicate` and `fail -> die`.

## 3) Problem Statement

Most agent demos show capability but not economic accountability. This product demonstrates an agent lifecycle where market fitness directly controls existence, making autonomous behavior measurable, constrained, and easy to understand in a short demo.

## 4) Goals and Success Criteria

### Primary goals

- Demonstrate a complete autonomous economic lifecycle in a 3-5 minute demo.
- Show one successful replication event and one forced termination event.
- Keep implementation feasible in a 2-4 hour hackathon build window.

### Success metrics (MVP)

- At least 1 seed agent starts with visible rent countdown and balance.
- At least 1 child agent is spawned via replication rule.
- At least 1 agent is auto-terminated via death rule.
- Dashboard updates all state changes in near real-time (<2 seconds perceived delay).
- End-of-demo scoreboard shows survivors, terminated agents, and total colony profit.

## 5) Scope

### In scope (MVP)

- In-memory orchestrator service.
- Agent ledger with core fields: `balance`, `quality`, `burn_rate`, `status`.
- Lease/rent tick every 10-15 seconds.
- Simulated paid-task endpoint to credit revenue and affect quality/error.
- Survival, replication, and death rule engine.
- Mutation-on-replication (small config variation per child).
- Operator toggles for deterministic demo moments (force degrade, force task mix).
- Lightweight dashboard with agent cards + timeline + scoreboard.

### Out of scope (MVP)

- Real blockchain or crypto settlement.
- Real Stripe/x402 integration.
- Real machine deployment/orchestration APIs (Fly, cloud lifecycle).
- Persistent database.
- Multi-user auth/permissions.

## 6) Stakeholders and Users

- Primary user: Hackathon demo operator.
- Primary audience: Judges and technical reviewers.
- Internal stakeholders: Builder/developer team.

## 7) User Stories

1. As a demo operator, I can start a seed colony and see each agent's live balance, quality, and lease status.
2. As a demo operator, I can submit paid tasks and observe revenue being credited immediately.
3. As a demo operator, I can observe automatic replication when profitability and quality thresholds are met.
4. As a demo operator, I can trigger degradation on a child agent and observe quality decline.
5. As a demo operator, I can observe automatic termination after consecutive failed lease checks.
6. As a judge, I can understand what happened from a plain-English event timeline and final scoreboard.

## 8) Functional Requirements

### FR-1 Colony initialization

- System must create one seed agent with configurable starting balance, quality, and burn rate.

### FR-2 Lease engine

- System must run a lease tick every configurable interval (default 10s).
- Each tick debits rent from all alive agents according to burn rate.

### FR-3 Task simulation

- System must expose a task action that credits agent revenue.
- Task action must also update quality/error metrics based on task outcome profile.

### FR-4 Survival evaluation

- Agent survives if `balance >= next_lease_cost + safety_buffer` and `quality >= quality_floor`.

### FR-5 Replication evaluation

- Agent replicates only when all conditions are true.
- Net margin is positive for `M` consecutive intervals.
- Error rate is below threshold.
- Colony budget cap and max-agent cap are not exceeded.

### FR-6 Replication behavior

- Child agent inherits parent baseline config with one bounded mutation (prompt/tool strategy weight/profile id).
- Parent-child lineage must be recorded.

### FR-7 Death evaluation

- Agent is terminated when either condition is true.
- Balance is below lease requirement for `K` consecutive checks.
- High failure rate and negative margin persists for `T` minutes.

### FR-8 Termination actions

- On termination: mark status `terminated`, stop further task assignment, emit event-log entry.

### FR-9 Event timeline

- Every major state transition (task paid, lease debit, replicate, degrade, terminate) must emit a timestamped event.

### FR-10 Dashboard

- UI must show all of the following.
- Agent cards (`balance`, `lease due`, `quality`, `status`, generation).
- Event timeline.
- Colony totals (profit, alive count, terminated count).

### FR-11 Demo controls

- UI or API must support all of the following.
- Force-degrade an agent.
- Trigger deterministic paid-task burst.
- Pause/resume lease engine.

### FR-12 Determinism mode

- System must support seeded randomness for repeatable demo outcomes.

## 9) Non-Functional Requirements

- NFR-1 Simplicity: Single-process local run for MVP.
- NFR-2 Responsiveness: State refresh within 2 seconds perceived latency.
- NFR-3 Reliability: No uncaught runtime errors during 5-minute demo path.
- NFR-4 Explainability: Timeline entries must be human-readable, not raw debug traces.
- NFR-5 Safety: Hard caps for max agents, max simulated spend, and max simulation duration.

## 10) Data Model (MVP)

### Agent

- `id: string`
- `parent_id: string | null`
- `generation: number`
- `status: alive | terminated`
- `balance: number`
- `burn_rate_per_tick: number`
- `quality_score: number`
- `error_rate: number`
- `positive_margin_streak: number`
- `lease_fail_streak: number`
- `strategy_profile: string`
- `created_at: datetime`
- `terminated_at: datetime | null`

### Event

- `id: string`
- `timestamp: datetime`
- `agent_id: string | null`
- `type: seed_created | task_paid | lease_debited | replicated | degraded | terminated`
- `message: string`
- `delta_balance: number | null`

## 11) System Architecture (MVP)

### Components

- Orchestrator API (Node.js/TypeScript): owns rules, state transitions, and control endpoints.
- Simulation engine: lease ticker + rule evaluator + mutation logic.
- In-memory ledger store: agent/event state.
- Dashboard client: polls or subscribes for live state.

### Key API endpoints (suggested)

- `POST /colony/start`
- `POST /tasks/simulate`
- `POST /agents/:id/degrade`
- `POST /simulation/pause`
- `POST /simulation/resume`
- `GET /agents`
- `GET /events`
- `GET /scoreboard`

## 12) Demo Narrative Requirements

- Demo must begin with one seed agent and visible starting conditions.
- Demo must show at least one profitable phase with replication.
- Demo must show one deliberately degraded child that is later terminated.
- Demo must end on a summary screen with colony outcome metrics.

## 13) Milestones (2-4 Hours)

1. Hour 1: Orchestrator + in-memory ledger + lease tick.
2. Hour 2: Paid-task simulation + quality/error updates + survival/death checks.
3. Hour 3: Replication + mutation + degrade toggle.
4. Hour 4: Dashboard + event timeline + deterministic rehearsal script.

## 14) Risks and Mitigations

- Risk: Scope creep into real integrations.
- Mitigation: Enforce local simulation only for MVP.

- Risk: Non-deterministic demo behavior.
- Mitigation: Seeded randomness + manual control toggles + rehearsed path.

- Risk: Story gets lost in implementation details.
- Mitigation: UI limited to core signals (`balance`, `lease`, `quality`, `status`) plus timeline.

## 15) Open Questions (Post-MVP)

- Should colony state persist between runs?
- Which real payment rail should be integrated first (x402 vs Stripe)?
- Should policy controls become configurable through a rules DSL?
