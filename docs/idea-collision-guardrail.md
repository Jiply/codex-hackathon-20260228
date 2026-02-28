# Idea Collision Guardrail

This module prevents child-agent idea collisions by storing ideas from terminated agents and checking new proposals against that memory.

## What it does

1. Archives dead-agent ideas into a vector store.
2. Runs hybrid top-k retrieval on candidate ideas (semantic + keyword).
3. Applies configurable collision policy.
4. Emits optional events and markdown-friendly logs.

## Design goals

1. Contract-first and framework-agnostic.
2. No hard dependency on one API style, event bus, or database.
3. Lifecycle payloads mapped through adapter boundaries.
4. Policy configurable at runtime.

## Default policy

- `topK = 5`
- reject if `max_score >= 0.88`
- reject if `count(score >= 0.84) >= 2`
- reject if `lexical_overlap >= 0.92`
- `max_regeneration_attempts = 3`

## Default retrieval strategy

- mode: `auto`
- semantic candidate pool: `20`
- keyword candidate pool: `20`
- fusion: Reciprocal Rank Fusion (`rrfK = 60`)
- fallback: semantic-only if the vector store does not implement `queryKeyword`

## Minimal contract

- `archiveDeadIdea(input) -> { archived: true, id }`
- `checkCandidateCollision(input) -> CollisionDecision`

## Adapter ports

- `EmbeddingProvider`: `embed(text) -> vector`
- `VectorStore`: `upsertArchivedIdea(idea, vector)`, `querySimilar(vector, topK, filters?)`, optional `queryKeyword(text, topK, filters?)`
- `LifecycleHookAdapter`: `onAgentTerminated(payload)`, `onPreSpawn(payload)`
- `EventPublisher` (optional): `publish(eventType, payload)`
- `HumanLogWriter` (optional): `appendTimeline(entry)`, `appendAgentLog(agentId, entry)`

## Integration points

- in-process orchestrator: call methods directly
- internal service: wrap methods behind HTTP/RPC
- event worker: call from `agent_terminated` and `pre_spawn_candidate` handlers

## Suggested lifecycle wiring

1. On agent termination: map payload to `ArchivedIdea` and call `archiveDeadIdea`.
2. Before spawn: map payload to `CandidateIdea` and call `checkCandidateCollision`.
3. Reject and regenerate if collision decision is not accepted.
4. Stop regeneration when `regeneration_exhausted = true`.

## Structured events and markdown projection

Suggested event payload fields:

- `timestamp`
- `agent_id`
- `decision`
- `top_score`
- `matched_idea_ids`
- `reason_code`

Suggested markdown projection line:

`[time] [agent] idea-collision rejected top_score=0.91 matched=idea_42`

## Team adaptation checklist

1. Map your lifecycle event names to the lifecycle bridge handlers.
2. Map your agent schema fields to `ArchivedIdea` and `CandidateIdea`.
3. Choose integration mode (library/service/worker).
4. Plug your embedding and vector store adapters.
5. Register optional event/log adapters for timeline UI.
6. Tune thresholds for your risk tolerance.

## File location

- Essential entrypoint: `src/idea-collision-guardrail/essential.ts`
- Testing-only entrypoint: `src/idea-collision-guardrail/testing.ts`
- Combined entrypoint (optional): `src/idea-collision-guardrail/index.ts`
- Core service: `src/idea-collision-guardrail/service.ts`
- Policy engine: `src/idea-collision-guardrail/policy.ts`
- Lifecycle bridge: `src/idea-collision-guardrail/lifecycle-bridge.ts`
- Runtime adapters: `src/idea-collision-guardrail/adapters/*`
- Test helpers: `src/idea-collision-guardrail/testing/*`

## Keep vs throw away

Keep for production integration:

- `src/idea-collision-guardrail/essential.ts`
- `src/idea-collision-guardrail/service.ts`
- `src/idea-collision-guardrail/policy.ts`
- `src/idea-collision-guardrail/retrieval.ts`
- `src/idea-collision-guardrail/contracts.ts`
- `src/idea-collision-guardrail/ports.ts`
- `src/idea-collision-guardrail/errors.ts`
- `src/idea-collision-guardrail/canonicalizer.ts`
- `src/idea-collision-guardrail/adapters/in-memory-vector-store.ts`
- `src/idea-collision-guardrail/adapters/token-hash-embedding-provider.ts`
- `src/idea-collision-guardrail/adapters/similarity.ts`
- `src/idea-collision-guardrail/adapters/lexical.ts`

Safe to delete when stripping test/demo helpers:

- `src/idea-collision-guardrail/testing.ts`
- `src/idea-collision-guardrail/testing/*`
- `test/idea-collision-guardrail.test.ts`

## Example usage

```js
import {
  IdeaCollisionGuardrail,
  InMemoryVectorStore,
  TokenHashEmbeddingProvider,
} from "../src/idea-collision-guardrail/essential.ts";

const guardrail = new IdeaCollisionGuardrail({
  embeddingProvider: new TokenHashEmbeddingProvider(),
  vectorStore: new InMemoryVectorStore(),
});

await guardrail.archiveDeadIdea({
  agent_id: "a-1",
  title: "Autonomous storefront optimizer",
  body: "Optimize product listings with demand-aware rewrites",
  terminated_reason: "MISSED_LEASE_LIMIT",
});

const decision = await guardrail.checkCandidateCollision({
  candidate_idea: {
    source_agent_id: "a-2",
    title: "Demand-aware storefront optimizer",
    body: "Rewrite listings based on buyer intent",
  },
  attempt: 1,
});

console.log(decision);
```
