import { CollisionReasonCode, type CollisionDecision, type SimilarityMatch } from "./contracts.ts";
import type { CollisionPolicy } from "./ports.ts";

export interface CollisionPolicyConfig {
  topK: number;
  rejectSingleScore: number;
  rejectMultiScore: number;
  rejectMultiCount: number;
  lexicalHardReject: number;
  maxRegenerationAttempts: number;
}

export const DEFAULT_COLLISION_POLICY_CONFIG: CollisionPolicyConfig = Object.freeze({
  topK: 5,
  rejectSingleScore: 0.88,
  rejectMultiScore: 0.84,
  rejectMultiCount: 2,
  lexicalHardReject: 0.92,
  maxRegenerationAttempts: 3,
});

export class DefaultCollisionPolicy implements CollisionPolicy {
  config: CollisionPolicyConfig;

  constructor(config: Partial<CollisionPolicyConfig> = {}) {
    this.config = {
      ...DEFAULT_COLLISION_POLICY_CONFIG,
      ...config,
    };
  }

  evaluate(matches: SimilarityMatch[]): CollisionDecision {
    const ranked = [...matches];
    const semanticScores = ranked.map((match) => Number(match.metadata?.semantic_score ?? match.score ?? 0));
    const lexicalScores = ranked.map((match) => Number(match.metadata?.lexical_score ?? 0));

    const topScore = semanticScores.length > 0 ? Math.max(...semanticScores) : 0;
    const topLexicalScore = lexicalScores.length > 0 ? Math.max(...lexicalScores) : 0;
    const highNeighborCount = semanticScores.filter((score) => score >= this.config.rejectMultiScore).length;

    let accepted = true;
    let reasonCode: string | undefined;

    if (topScore >= this.config.rejectSingleScore) {
      accepted = false;
      reasonCode = CollisionReasonCode.IDEA_COLLISION_SINGLE_HIGH_SCORE;
    } else if (highNeighborCount >= this.config.rejectMultiCount) {
      accepted = false;
      reasonCode = CollisionReasonCode.IDEA_COLLISION_MULTI_NEIGHBOR;
    } else if (topLexicalScore >= this.config.lexicalHardReject) {
      accepted = false;
      reasonCode = CollisionReasonCode.IDEA_COLLISION_LEXICAL_HIGH_OVERLAP;
    }

    return {
      accepted,
      reason_code: reasonCode,
      top_score: topScore,
      matches: ranked,
      policy_snapshot: {
        top_k: this.config.topK,
        reject_single_score: this.config.rejectSingleScore,
        reject_multi_score: this.config.rejectMultiScore,
        reject_multi_count: this.config.rejectMultiCount,
        lexical_hard_reject: this.config.lexicalHardReject,
        max_regeneration_attempts: this.config.maxRegenerationAttempts,
      },
    };
  }
}

console.log("[codex] loaded: src/idea-collision-guardrail/policy.ts");
