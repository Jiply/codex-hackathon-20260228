import type { ArchivedIdea, JsonMap, SimilarityMatch } from "../contracts.ts";
import type { VectorStore } from "../ports.ts";
import { cosineSimilarity } from "./similarity.ts";
import { lexicalOverlapScore } from "./lexical.ts";

export class InMemoryVectorStore implements VectorStore {
  private similarityFn: (a: number[], b: number[]) => number;
  private items: Map<string, { idea: ArchivedIdea; vector: number[] }>;

  constructor(options: { similarityFn?: (a: number[], b: number[]) => number } = {}) {
    this.similarityFn = options.similarityFn ?? cosineSimilarity;
    this.items = new Map();
  }

  async upsertArchivedIdea(idea: ArchivedIdea, vector: number[]): Promise<void> {
    this.items.set(idea.id, {
      idea,
      vector,
    });
  }

  async querySimilar(queryVector: number[], topK: number, filters: JsonMap = {}): Promise<SimilarityMatch[]> {
    const matches: SimilarityMatch[] = [];

    for (const [id, record] of this.items.entries()) {
      if (!passesFilter(record.idea, filters)) {
        continue;
      }

      matches.push({
        archived_idea_id: id,
        score: this.similarityFn(queryVector, record.vector),
        metadata: {
          agent_id: record.idea.agent_id,
          niche: record.idea.niche,
          tags: record.idea.tags,
          canonical_text: record.idea.canonical_text ?? "",
          ...record.idea.metadata,
        },
      });
    }

    matches.sort((a, b) => b.score - a.score);
    return matches.slice(0, topK);
  }

  async queryKeyword(queryText: string, topK: number, filters: JsonMap = {}): Promise<SimilarityMatch[]> {
    const matches: SimilarityMatch[] = [];

    for (const [id, record] of this.items.entries()) {
      if (!passesFilter(record.idea, filters)) {
        continue;
      }

      const documentText = record.idea.canonical_text ?? `${record.idea.title ?? ""} ${record.idea.body ?? ""}`;
      const score = lexicalOverlapScore(queryText, documentText);
      if (score <= 0) {
        continue;
      }

      matches.push({
        archived_idea_id: id,
        score,
        metadata: {
          agent_id: record.idea.agent_id,
          niche: record.idea.niche,
          tags: record.idea.tags,
          canonical_text: documentText,
          ...record.idea.metadata,
        },
      });
    }

    matches.sort((a, b) => b.score - a.score);
    return matches.slice(0, topK);
  }
}

function passesFilter(idea: ArchivedIdea, filters: JsonMap): boolean {
  const entries = Object.entries(filters);
  if (entries.length === 0) {
    return true;
  }

  for (const [key, expected] of entries) {
    const metadataValue = idea.metadata?.[key];
    const rootValue = (idea as Record<string, unknown>)[key];
    if (metadataValue !== expected && rootValue !== expected) {
      return false;
    }
  }

  return true;
}
