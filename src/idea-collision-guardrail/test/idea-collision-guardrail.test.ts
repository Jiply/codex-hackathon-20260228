import assert from "node:assert/strict";
import test from "node:test";

import {
  CollisionReasonCode,
  DefaultCollisionPolicy,
  GuardrailError,
  IdeaCollisionGuardrail,
  InMemoryVectorStore,
  TokenHashEmbeddingProvider,
} from "../src/idea-collision-guardrail/essential.ts";
import { MemoryEventPublisher, MemoryLogWriter } from "../src/idea-collision-guardrail/testing.ts";

function createGuardrail(overrides: Record<string, unknown> = {}) {
  return new IdeaCollisionGuardrail({
    embeddingProvider:
      (overrides.embeddingProvider as TokenHashEmbeddingProvider | undefined) ?? new TokenHashEmbeddingProvider(),
    vectorStore: (overrides.vectorStore as InMemoryVectorStore | undefined) ?? new InMemoryVectorStore(),
    eventPublisher: overrides.eventPublisher as MemoryEventPublisher | undefined,
    humanLogWriter: overrides.humanLogWriter as MemoryLogWriter | undefined,
    collisionPolicy: overrides.collisionPolicy as DefaultCollisionPolicy | undefined,
    retrieval: overrides.retrieval as
      | {
          mode?: "semantic" | "hybrid" | "auto";
          semanticCandidatePool?: number;
          keywordCandidatePool?: number;
          rrfK?: number;
        }
      | undefined,
    now: (overrides.now as (() => string) | undefined) ?? (() => "2026-02-28T13:00:00.000Z"),
  });
}

test("near-duplicate candidate is rejected", async () => {
  const guardrail = createGuardrail();

  await guardrail.archiveDeadIdea({
    id: "dead_idea_1",
    agent_id: "agent_dead",
    title: "Research summary endpoint for sales leads",
    body: "Generate concise summaries for inbound sales lead packets.",
    terminated_reason: "MISSED_LEASE_LIMIT",
  });

  const decision = await guardrail.checkCandidateCollision({
    candidate_idea: {
      source_agent_id: "agent_live",
      title: "Research summary endpoint for sales leads",
      body: "Generate concise summaries for inbound sales lead packets",
    },
    attempt: 1,
  });

  assert.equal(decision.accepted, false);
  assert.ok(decision.top_score >= 0.88);
  assert.equal(decision.regeneration_exhausted, false);
});

test("novel candidate is accepted", async () => {
  const guardrail = createGuardrail();

  await guardrail.archiveDeadIdea({
    id: "dead_idea_2",
    agent_id: "agent_dead",
    title: "Data cleanup for spreadsheet imports",
    body: "Normalize CSV columns and dedupe vendor records.",
  });

  const decision = await guardrail.checkCandidateCollision({
    candidate_idea: {
      source_agent_id: "agent_live",
      title: "Voice-driven meeting retro assistant",
      body: "Summarize standup themes and identify blockers by team.",
    },
  });

  assert.equal(decision.accepted, true);
  assert.ok(decision.top_score < 0.88);
});

test("terminated idea becomes retrievable after archival", async () => {
  const vectorStore = new InMemoryVectorStore();
  const embeddingProvider = new TokenHashEmbeddingProvider();
  const guardrail = createGuardrail({ vectorStore, embeddingProvider });

  await guardrail.archiveDeadIdea({
    id: "dead_idea_3",
    agent_id: "agent_dead",
    title: "Website changelog diff bot",
    body: "Track release notes and classify meaningful product deltas.",
  });

  const queryVector = await embeddingProvider.embed("website changelog diff assistant for product release notes");
  const matches = await vectorStore.querySimilar(queryVector, 3);

  assert.equal(matches.length, 1);
  assert.equal(matches[0].archived_idea_id, "dead_idea_3");
});

test("regeneration is flagged exhausted at max attempts", async () => {
  const guardrail = createGuardrail();

  await guardrail.archiveDeadIdea({
    id: "dead_idea_4",
    agent_id: "agent_dead",
    title: "Autonomous bug triage summary",
    body: "Summarize production incidents and sort by impact.",
  });

  const decision = await guardrail.checkCandidateCollision({
    candidate_idea: {
      source_agent_id: "agent_live",
      title: "Autonomous bug triage summary",
      body: "Summarize production incidents and sort by impact",
    },
    attempt: 3,
  });

  assert.equal(decision.accepted, false);
  assert.equal(decision.regeneration_exhausted, true);
});

test("vector store failure returns retryable guardrail error", async () => {
  const guardrail = createGuardrail({
    vectorStore: {
      async upsertArchivedIdea() {
        // no-op for this test
      },
      async querySimilar() {
        throw new Error("vector db offline");
      },
    },
  });

  await assert.rejects(
    guardrail.checkCandidateCollision({
      candidate_idea: {
        source_agent_id: "agent_live",
        title: "Idea title",
        body: "Idea body",
      },
    }),
    (err: unknown) => {
      assert.ok(err instanceof GuardrailError);
      assert.equal(err.code, "VECTOR_STORE_UNAVAILABLE");
      assert.equal(err.retryable, true);
      return true;
    },
  );
});

test("disabled event and log adapters do not break guardrail behavior", async () => {
  const guardrail = createGuardrail();

  const archived = await guardrail.archiveDeadIdea({
    id: "dead_idea_5",
    agent_id: "agent_dead",
    title: "Contract clause extraction",
    body: "Extract legal clauses and summarize obligations.",
  });

  const decision = await guardrail.checkCandidateCollision({
    candidate_idea: {
      source_agent_id: "agent_live",
      title: "Podcast chapter marker generator",
      body: "Create timestamps and themes from transcript segments.",
    },
  });

  assert.equal(archived.archived, true);
  assert.equal(typeof decision.accepted, "boolean");
});

test("event and log adapters receive collision decisions", async () => {
  const eventPublisher = new MemoryEventPublisher();
  const logWriter = new MemoryLogWriter();
  const guardrail = createGuardrail({
    eventPublisher,
    humanLogWriter: logWriter,
  });

  await guardrail.archiveDeadIdea({
    id: "dead_idea_6",
    agent_id: "agent_dead",
    title: "Customer intent classifier",
    body: "Classify user prompts by purchase intent.",
  });

  await guardrail.checkCandidateCollision({
    candidate_idea: {
      source_agent_id: "agent_live",
      title: "Customer intent classifier",
      body: "Classify user prompts by purchase intent",
    },
    attempt: 1,
  });

  assert.ok(eventPublisher.events.length >= 2);
  assert.ok(logWriter.timeline.length >= 2);
  assert.ok(logWriter.agentLogs.has("agent_live"));
});

test("hybrid retrieval uses rrf metadata when keyword search exists", async () => {
  const guardrail = createGuardrail({
    retrieval: {
      mode: "hybrid",
      semanticCandidatePool: 10,
      keywordCandidatePool: 10,
      rrfK: 60,
    },
  });

  await guardrail.archiveDeadIdea({
    id: "dead_idea_7",
    agent_id: "agent_dead",
    title: "Sales outreach email optimizer",
    body: "Rewrite cold outbound drafts using intent and persona.",
  });

  const decision = await guardrail.checkCandidateCollision({
    candidate_idea: {
      source_agent_id: "agent_live",
      title: "Intent-based sales email optimizer",
      body: "Rewrite outbound drafts by persona and expected buyer intent.",
    },
  });

  assert.ok(decision.matches.length > 0);
  const top = decision.matches[0];
  assert.equal(typeof top.metadata?.rrf_score, "number");
  assert.equal(typeof top.metadata?.semantic_score, "number");
  assert.equal(typeof top.metadata?.lexical_score, "number");
});

test("lexical hard reject triggers when semantic thresholds are intentionally disabled", async () => {
  const guardrail = createGuardrail({
    collisionPolicy: new DefaultCollisionPolicy({
      rejectSingleScore: 1.01,
      rejectMultiScore: 1.01,
      rejectMultiCount: 99,
      lexicalHardReject: 0.8,
    }),
  });

  await guardrail.archiveDeadIdea({
    id: "dead_idea_8",
    agent_id: "agent_dead",
    title: "Contract clause extraction",
    body: "Extract legal clauses and summarize obligations.",
  });

  const decision = await guardrail.checkCandidateCollision({
    candidate_idea: {
      source_agent_id: "agent_live",
      title: "Contract clause extraction",
      body: "Extract legal clauses and summarize obligations.",
    },
  });

  assert.equal(decision.accepted, false);
  assert.equal(decision.reason_code, CollisionReasonCode.IDEA_COLLISION_LEXICAL_HIGH_OVERLAP);
});
