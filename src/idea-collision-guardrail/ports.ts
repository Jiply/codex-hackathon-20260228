import type { ArchivedIdea, CandidateIdea, CollisionDecision, JsonMap, SimilarityMatch } from "./contracts.ts";

export interface EmbeddingProvider {
  embed(text: string): Promise<number[]> | number[];
}

export interface VectorStore {
  upsertArchivedIdea(idea: ArchivedIdea, vector: number[]): Promise<void> | void;
  querySimilar(vector: number[], topK: number, filters?: JsonMap): Promise<SimilarityMatch[]> | SimilarityMatch[];
  queryKeyword?(queryText: string, topK: number, filters?: JsonMap): Promise<SimilarityMatch[]> | SimilarityMatch[];
}

export interface LifecycleHookAdapter {
  onAgentTerminated(payload: unknown): ArchivedIdea;
  onPreSpawn(payload: unknown): CandidateIdea;
}

export interface EventPublisher {
  publish(eventType: string, payload: JsonMap): Promise<void> | void;
}

export interface HumanLogWriter {
  appendTimeline(entry: string): Promise<void> | void;
  appendAgentLog(agentId: string, entry: string): Promise<void> | void;
}

export interface CollisionPolicy {
  evaluate(matches: SimilarityMatch[]): CollisionDecision;
}

export const PORT_MARKER = "idea-collision-guardrail-ports";
