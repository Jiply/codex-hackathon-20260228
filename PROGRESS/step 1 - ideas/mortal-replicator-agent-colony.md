# Mortal Replicator: A Self-Funding, Self-Replicating Agent Colony

As of **February 28, 2026**, this note proposes a hackathon project where an AI agent must earn enough to pay for its own runtime. If it cannot pay, it is automatically shut down.

## Core Conclusion

The strongest hackathon idea is a **"survive-or-die" agent colony**:

- Each agent instance runs as an isolated service.
- It receives a small starting balance.
- It must generate real revenue (paid API calls/tasks).
- It pays periodic "compute rent" to stay alive.
- If balance and performance fall below thresholds, an orchestrator shuts it down.
- Profitable agents can spawn new agents from a template.

This creates a clear demo loop: **earn -> survive -> replicate** and **fail -> die**.

## Why This Is Feasible Right Now

1. **Automatable deploy/kill primitives exist**

- Fly Machines API supports create, stop, suspend, start, and delete operations for instances.
- This gives hard lifecycle control for enforcing death conditions.

2. **Runtime costs can be priced continuously**

- Fly bills started machines per second and also charges for stopped/suspended storage.
- You can estimate burn rate in near real-time and enforce lease intervals.

3. **Replication can be done from a code template**

- GitHub supports creating repositories from templates (UI and REST API).
- New child agents can be created from a base agent repo with config mutations.

4. **Agent-native revenue rails exist**

- x402 enables machine-to-machine paid HTTP requests using `402 Payment Required`.
- Optional fiat path: Stripe usage-based billing and credits for metered usage.

5. **Provider-level spend guardrails are available**

- AWS Budgets Actions can automatically apply controls or target EC2/RDS instances at budget thresholds.
- This can be an outer kill ring in addition to the app-level "rent" mechanism.

## Project Idea: ColonyOS (MVP)

Build a control plane plus agent template where every running child has an expiring lease.

## System Design

1. **Queen Orchestrator (control plane)**

- Tracks every child's balance, revenue, error rate, and burn rate.
- Charges lease rent every N minutes.
- Calls deploy API to spawn children.
- Calls stop/delete API when a child fails survivability rules.

2. **Agent Template (worker/data plane)**

- General-purpose tool-use agent with constrained tool permissions.
- Exposes paid endpoints (for example: research summary, data cleanup, code transform).
- Emits signed usage and quality events.

3. **Treasury + Ledger**

- Internal wallet ledger for child balances.
- Revenue credit from paid tasks.
- Rent debits using provider-informed burn estimates.

4. **Replication Engine**

- If an agent exceeds profitability + quality gates, spawn a child with small mutations:
  - Prompt/system profile variant
  - Tool strategy preset
  - Task niche routing weights
- Keep hard caps on total children and per-generation growth.

## Life/Death Rules (Concrete)

1. **Survive rule**

- `balance >= next_lease_cost + safety_buffer`
- `recent_quality_score >= quality_floor`

2. **Replication rule**

- Positive net margin for M intervals.
- Error rate below threshold.
- Colony-wide budget cap not exceeded.

3. **Death rule**

- Balance below lease requirement for K consecutive checks, or
- High failure rate with negative margin for T minutes.

4. **Kill actions**

- Mark child as terminated in ledger.
- Stop machine immediately.
- Delete machine after grace period if unpaid.

## Hackathon Demo Script

1. Launch one seed agent with a small balance.
2. Generate paid requests against the seed agent.
3. Show lease payment ticks and live balance chart.
4. Trigger replication when profitability threshold is met.
5. Intentionally degrade one child (bad prompt / high failure).
6. Show automatic termination of that child.

## Recommended Build Stack (fast path)

- **Runtime**: TypeScript + Node.js
- **Queue/state**: Redis (jobs, heartbeat, leases)
- **Control API**: Express/Fastify
- **Agent framework**: simple tool-calling loop (no heavy orchestration required for MVP)
- **Deployment**: Fly Machines API (child lifecycle), GitHub template repos (child code lineage)
- **Payments**: x402 first (agent-native), Stripe metered fallback

## Guardrails (important)

- Replication only within owner-approved accounts/projects.
- No autonomous credential discovery or privilege escalation.
- Strict allowlist for external domains/tools.
- Per-child max spend, max runtime, and max request rate.
- Human override kill switch at colony and child level.

## Strategic Inference

The novelty is not "another agent framework." The novelty is a **market-constrained autonomous lifecycle** where economic fitness directly controls existence. That is memorable, demo-friendly, and technically achievable in a weekend.

## Sources

- [Fly Machines API: create/stop/start/delete](https://fly.io/docs/machines/api/machines-resource)
- [Fly billing model (per-second compute, storage charges)](https://fly.io/docs/about/billing/)
- [Fly pricing reference](https://fly.io/docs/about/pricing/)
- [GitHub: creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
- [GitHub REST: workflows endpoints (dispatch/automation)](https://docs.github.com/en/rest/actions/workflows)
- [x402 overview](https://docs.x402.org/)
- [x402 HTTP 402 core concept](https://docs.x402.org/core-concepts/http-402)
- [CDP x402 facilitator](https://docs.cdp.coinbase.com/x402/core-concepts/facilitator)
- [Stripe usage-based billing overview](https://docs.stripe.com/billing/subscriptions/usage-based)
- [AWS Budgets Actions](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-controls.html)
