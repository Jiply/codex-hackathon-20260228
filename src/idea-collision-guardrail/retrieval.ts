import type { SimilarityMatch } from "./contracts.ts";

export interface RetrievalConfig {
  mode: "auto" | "semantic" | "hybrid";
  semanticCandidatePool: number;
  keywordCandidatePool: number;
  rrfK: number;
}

export const DEFAULT_RETRIEVAL_CONFIG: RetrievalConfig = Object.freeze({
  mode: "auto",
  semanticCandidatePool: 20,
  keywordCandidatePool: 20,
  rrfK: 60,
});

export function fuseMatchesWithRrf(input: {
  semanticMatches: SimilarityMatch[];
  keywordMatches: SimilarityMatch[];
  topK: number;
  rrfK: number;
}): SimilarityMatch[] {
  const byId = new Map<
    string,
    {
      archived_idea_id: string;
      semantic_score?: number;
      lexical_score?: number;
      semantic_rank?: number;
      keyword_rank?: number;
      metadata: Record<string, unknown>;
    }
  >();

  for (let i = 0; i < input.semanticMatches.length; i += 1) {
    const match = input.semanticMatches[i];
    const existing = byId.get(match.archived_idea_id) ?? {
      archived_idea_id: match.archived_idea_id,
      metadata: {},
    };

    byId.set(match.archived_idea_id, {
      ...existing,
      semantic_score: match.score,
      semantic_rank: i + 1,
      metadata: {
        ...(existing.metadata ?? {}),
        ...(match.metadata ?? {}),
      },
    });
  }

  for (let i = 0; i < input.keywordMatches.length; i += 1) {
    const match = input.keywordMatches[i];
    const existing = byId.get(match.archived_idea_id) ?? {
      archived_idea_id: match.archived_idea_id,
      metadata: {},
    };

    byId.set(match.archived_idea_id, {
      ...existing,
      lexical_score: match.score,
      keyword_rank: i + 1,
      metadata: {
        ...(existing.metadata ?? {}),
        ...(match.metadata ?? {}),
      },
    });
  }

  const fused: SimilarityMatch[] = [];
  for (const item of byId.values()) {
    const rrfScore =
      (item.semantic_rank ? 1 / (input.rrfK + item.semantic_rank) : 0) +
      (item.keyword_rank ? 1 / (input.rrfK + item.keyword_rank) : 0);

    fused.push({
      archived_idea_id: item.archived_idea_id,
      score: item.semantic_score ?? 0,
      metadata: {
        ...(item.metadata ?? {}),
        semantic_score: item.semantic_score ?? 0,
        lexical_score: item.lexical_score ?? 0,
        rrf_score: rrfScore,
        semantic_rank: item.semantic_rank ?? null,
        keyword_rank: item.keyword_rank ?? null,
      },
    });
  }

  fused.sort((a, b) => {
    const rrfA = Number(a.metadata?.rrf_score ?? 0);
    const rrfB = Number(b.metadata?.rrf_score ?? 0);
    if (rrfB !== rrfA) {
      return rrfB - rrfA;
    }

    const semA = Number(a.metadata?.semantic_score ?? a.score ?? 0);
    const semB = Number(b.metadata?.semantic_score ?? b.score ?? 0);
    if (semB !== semA) {
      return semB - semA;
    }

    const lexA = Number(a.metadata?.lexical_score ?? 0);
    const lexB = Number(b.metadata?.lexical_score ?? 0);
    return lexB - lexA;
  });

  return fused.slice(0, input.topK);
}

console.log("[codex] loaded: src/idea-collision-guardrail/retrieval.ts");
