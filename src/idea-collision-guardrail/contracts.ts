export type JsonMap = Record<string, unknown>;

export interface ArchivedIdea {
  id: string;
  agent_id: string;
  lineage_id?: string | null;
  parent_id?: string | null;
  title: string;
  body: string;
  tags?: string[];
  niche?: string;
  terminated_reason?: string;
  terminated_at: string;
  metadata?: JsonMap;
  canonical_text?: string;
}

export interface CandidateIdea {
  source_agent_id: string;
  title: string;
  body: string;
  tags?: string[];
  niche?: string;
  metadata?: JsonMap;
}

export interface SimilarityMatch {
  archived_idea_id: string;
  score: number;
  metadata?: JsonMap;
}

export interface CollisionPolicySnapshot {
  top_k: number;
  reject_single_score: number;
  reject_multi_score: number;
  reject_multi_count: number;
  lexical_hard_reject?: number;
  max_regeneration_attempts: number;
}

export interface CollisionDecision {
  accepted: boolean;
  reason_code?: string;
  top_score: number;
  matches: SimilarityMatch[];
  policy_snapshot: CollisionPolicySnapshot;
  regeneration_exhausted?: boolean;
}

export const CollisionEventType = Object.freeze({
  IDEA_ARCHIVED: "IDEA_ARCHIVED",
  IDEA_COLLISION_PASSED: "IDEA_COLLISION_PASSED",
  IDEA_COLLISION_REJECTED: "IDEA_COLLISION_REJECTED",
});

export type CollisionEventTypeValue = (typeof CollisionEventType)[keyof typeof CollisionEventType];

export const CollisionReasonCode = Object.freeze({
  IDEA_COLLISION_SINGLE_HIGH_SCORE: "IDEA_COLLISION_SINGLE_HIGH_SCORE",
  IDEA_COLLISION_MULTI_NEIGHBOR: "IDEA_COLLISION_MULTI_NEIGHBOR",
  IDEA_COLLISION_LEXICAL_HIGH_OVERLAP: "IDEA_COLLISION_LEXICAL_HIGH_OVERLAP",
});

export type CollisionReasonCodeValue = (typeof CollisionReasonCode)[keyof typeof CollisionReasonCode];
