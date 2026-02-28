import { randomUUID } from "node:crypto";
import { canonicalizeIdeaText } from "./canonicalizer.ts";
import { CollisionEventType, type CandidateIdea, type SimilarityMatch } from "./contracts.ts";
import {
  DefaultCollisionPolicy,
  DEFAULT_COLLISION_POLICY_CONFIG,
  type CollisionPolicyConfig
} from "./policy.ts";
import { GuardrailError, asGuardrailError } from "./errors.ts";
import {
  DEFAULT_RETRIEVAL_CONFIG,
  fuseMatchesWithRrf,
  type RetrievalConfig
} from "./retrieval.ts";
import type {
  CollisionPolicy,
  EmbeddingProvider,
  EventPublisher,
  HumanLogWriter,
  VectorStore
} from "./ports.ts";

export interface ArchiveDeadIdeaInput {
  id?: string;
  agent_id: string;
  lineage_id?: string | null;
  parent_id?: string | null;
  title: string;
  body: string;
  tags?: string[];
  niche?: string;
  terminated_reason?: string;
  terminated_at?: string;
  metadata?: Record<string, unknown>;
}

export interface CheckCandidateCollisionInput {
  candidate_idea: CandidateIdea;
  top_k?: number;
  filters?: Record<string, unknown>;
  attempt?: number;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function assertPort(
  target: unknown,
  methodName: string,
  portName: string
): asserts target is Record<string, (...args: unknown[]) => unknown> {
  if (!target || typeof (target as Record<string, unknown>)[methodName] !== "function") {
    throw new GuardrailError(
      "INVALID_DEPENDENCY",
      `${portName} must implement ${methodName}()`
    );
  }
}

function toIsoOrNow(value: string | undefined, now: () => string): string {
  if (!isNonEmptyString(value)) {
    return now();
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return now();
  }

  return parsed.toISOString();
}

export class IdeaCollisionGuardrail {
  private embeddingProvider: EmbeddingProvider;
  private vectorStore: VectorStore;
  private collisionPolicy: CollisionPolicy;
  private retrieval: RetrievalConfig;
  private eventPublisher?: EventPublisher;
  private humanLogWriter?: HumanLogWriter;
  private now: () => string;
  private maxRegenerationAttempts: number;

  constructor(deps: {
    embeddingProvider: EmbeddingProvider;
    vectorStore: VectorStore;
    collisionPolicy?: CollisionPolicy;
    retrieval?: Partial<RetrievalConfig>;
    eventPublisher?: EventPublisher;
    humanLogWriter?: HumanLogWriter;
    now?: () => string;
  }) {
    assertPort(deps.embeddingProvider, "embed", "EmbeddingProvider");
    assertPort(deps.vectorStore, "upsertArchivedIdea", "VectorStore");
    assertPort(deps.vectorStore, "querySimilar", "VectorStore");

    this.embeddingProvider = deps.embeddingProvider;
    this.vectorStore = deps.vectorStore;
    this.collisionPolicy = deps.collisionPolicy ?? new DefaultCollisionPolicy();
    this.retrieval = {
      ...DEFAULT_RETRIEVAL_CONFIG,
      ...(deps.retrieval ?? {})
    };
    this.eventPublisher = deps.eventPublisher;
    this.humanLogWriter = deps.humanLogWriter;
    this.now = deps.now ?? (() => new Date().toISOString());

    const config = (this.collisionPolicy as { config?: CollisionPolicyConfig }).config;
    this.maxRegenerationAttempts =
      config?.maxRegenerationAttempts ??
      DEFAULT_COLLISION_POLICY_CONFIG.maxRegenerationAttempts;
  }

  async archiveDeadIdea(input: ArchiveDeadIdeaInput): Promise<{ archived: true; id: string }> {
    if (!isNonEmptyString(input?.agent_id)) {
      throw new GuardrailError("INVALID_INPUT", "agent_id is required");
    }

    if (!isNonEmptyString(input?.title) && !isNonEmptyString(input?.body)) {
      throw new GuardrailError(
        "INVALID_INPUT",
        "title or body is required for dead-idea archival"
      );
    }

    const idea = {
      id: input.id ?? randomUUID(),
      agent_id: input.agent_id,
      lineage_id: input.lineage_id ?? null,
      parent_id: input.parent_id ?? null,
      title: input.title ?? "",
      body: input.body ?? "",
      tags: input.tags ?? [],
      niche: input.niche,
      terminated_reason: input.terminated_reason,
      terminated_at: toIsoOrNow(input.terminated_at, this.now),
      metadata: input.metadata ?? {}
    };

    const canonicalText = canonicalizeIdeaText({
      title: idea.title,
      body: idea.body,
      tags: idea.tags
    });

    try {
      const vector = await this.embeddingProvider.embed(canonicalText);
      await this.vectorStore.upsertArchivedIdea(
        {
          ...idea,
          canonical_text: canonicalText
        },
        vector
      );
    } catch (error) {
      throw asGuardrailError(
        error,
        "VECTOR_STORE_UNAVAILABLE",
        "failed to archive dead idea",
        true
      );
    }

    const timestamp = this.now();
    const eventPayload = {
      timestamp,
      event_type: CollisionEventType.IDEA_ARCHIVED,
      agent_id: idea.agent_id,
      archived_idea_id: idea.id,
      terminated_reason: idea.terminated_reason ?? null
    };

    await this.safePublish(CollisionEventType.IDEA_ARCHIVED, eventPayload);
    await this.safeLog(
      idea.agent_id,
      `[${timestamp}] [${idea.agent_id}] idea-archived id=${idea.id} reason=${idea.terminated_reason ?? "unknown"}`
    );

    return {
      archived: true,
      id: idea.id
    };
  }

  async checkCandidateCollision(
    input: CheckCandidateCollisionInput
  ): Promise<import("./contracts.ts").CollisionDecision> {
    const candidate = input?.candidate_idea;

    if (!candidate || !isNonEmptyString(candidate.source_agent_id)) {
      throw new GuardrailError(
        "INVALID_INPUT",
        "candidate_idea.source_agent_id is required"
      );
    }

    if (!isNonEmptyString(candidate.title) && !isNonEmptyString(candidate.body)) {
      throw new GuardrailError(
        "INVALID_INPUT",
        "candidate idea title or body is required"
      );
    }

    const canonicalText = canonicalizeIdeaText({
      title: candidate.title,
      body: candidate.body,
      tags: candidate.tags
    });

    const policyConfig = (this.collisionPolicy as { config?: CollisionPolicyConfig }).config;
    const topK =
      Number.isInteger(input.top_k) && (input.top_k as number) > 0
        ? (input.top_k as number)
        : policyConfig?.topK ?? DEFAULT_COLLISION_POLICY_CONFIG.topK;

    let matches: SimilarityMatch[];

    try {
      matches = await this.retrieveMatches(canonicalText, topK, input.filters);
    } catch (error) {
      throw asGuardrailError(
        error,
        "VECTOR_STORE_UNAVAILABLE",
        "failed to query idea collisions",
        true
      );
    }

    const decision = this.collisionPolicy.evaluate(matches);
    const attempt = Math.max(1, input.attempt ?? 1);

    if (!decision.accepted) {
      decision.regeneration_exhausted = attempt >= this.maxRegenerationAttempts;
    }

    const matchedIds = decision.matches.map((item) => item.archived_idea_id);
    const timestamp = this.now();
    const eventType = decision.accepted
      ? CollisionEventType.IDEA_COLLISION_PASSED
      : CollisionEventType.IDEA_COLLISION_REJECTED;

    const eventPayload = {
      timestamp,
      event_type: eventType,
      agent_id: candidate.source_agent_id,
      decision: decision.accepted ? "accepted" : "rejected",
      top_score: decision.top_score,
      matched_idea_ids: matchedIds,
      reason_code: decision.reason_code,
      attempt,
      regeneration_exhausted: decision.regeneration_exhausted ?? false
    };

    await this.safePublish(eventType, eventPayload);
    await this.safeLog(
      candidate.source_agent_id,
      `[${timestamp}] [${candidate.source_agent_id}] idea-collision ${decision.accepted ? "passed" : "rejected"} top_score=${decision.top_score.toFixed(4)} matched=${matchedIds.join(",") || "none"}${decision.reason_code ? ` reason=${decision.reason_code}` : ""}`
    );

    return decision;
  }

  private async retrieveMatches(
    canonicalText: string,
    topK: number,
    filters?: Record<string, unknown>
  ): Promise<SimilarityMatch[]> {
    const vector = await this.embeddingProvider.embed(canonicalText);
    const hasKeywordQuery = typeof this.vectorStore.queryKeyword === "function";
    const runHybrid =
      this.retrieval.mode === "hybrid" ||
      (this.retrieval.mode === "auto" && hasKeywordQuery);

    if (!runHybrid || !hasKeywordQuery) {
      const semantic = await this.vectorStore.querySimilar(vector, topK, filters);
      return semantic.map((match) => ({
        ...match,
        metadata: {
          ...(match.metadata ?? {}),
          semantic_score: match.score
        }
      }));
    }

    const semanticPool = Math.max(topK, this.retrieval.semanticCandidatePool);
    const keywordPool = Math.max(topK, this.retrieval.keywordCandidatePool);
    const [semantic, keyword] = await Promise.all([
      this.vectorStore.querySimilar(vector, semanticPool, filters),
      this.vectorStore.queryKeyword!(canonicalText, keywordPool, filters)
    ]);

    return fuseMatchesWithRrf({
      semanticMatches: semantic,
      keywordMatches: keyword,
      topK,
      rrfK: this.retrieval.rrfK
    });
  }

  private async safePublish(eventType: string, payload: Record<string, unknown>): Promise<void> {
    if (!this.eventPublisher || typeof this.eventPublisher.publish !== "function") {
      return;
    }

    try {
      await this.eventPublisher.publish(eventType, payload);
    } catch {
      // Event publication should not break core guardrail behavior in MVP.
    }
  }

  private async safeLog(agentId: string, entry: string): Promise<void> {
    if (!this.humanLogWriter) {
      return;
    }

    try {
      if (typeof this.humanLogWriter.appendTimeline === "function") {
        await this.humanLogWriter.appendTimeline(entry);
      }

      if (typeof this.humanLogWriter.appendAgentLog === "function") {
        await this.humanLogWriter.appendAgentLog(agentId, entry);
      }
    } catch {
      // Logging should not break core guardrail behavior in MVP.
    }
  }
}
