import type { EmbeddingProvider } from "../ports.ts";

export class TokenHashEmbeddingProvider implements EmbeddingProvider {
  private dimensions: number;

  constructor(options: { dimensions?: number } = {}) {
    this.dimensions = options.dimensions ?? 256;
  }

  async embed(text: string): Promise<number[]> {
    const vector = new Array(this.dimensions).fill(0);
    const tokens = (text || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    for (const token of tokens) {
      const idx = stableHash(token, this.dimensions);
      vector[idx] += 1;
    }

    const norm = Math.sqrt(vector.reduce((sum, x) => sum + x * x, 0));
    if (norm === 0) {
      return vector;
    }

    return vector.map((x) => x / norm);
  }
}

function stableHash(token: string, mod: number): number {
  let hash = 0;

  for (let i = 0; i < token.length; i += 1) {
    hash = (hash * 31 + token.charCodeAt(i)) >>> 0;
  }

  return hash % mod;
}
