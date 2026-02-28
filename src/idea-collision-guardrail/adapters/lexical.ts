const TOKEN_RE = /[a-z0-9]{2,}/g;

export function tokenizeKeywordText(text: string): Set<string> {
  const tokens = text.toLowerCase().match(TOKEN_RE) ?? [];
  return new Set(tokens);
}

export function lexicalOverlapScore(queryText: string, documentText: string): number {
  const queryTokens = tokenizeKeywordText(queryText);
  const docTokens = tokenizeKeywordText(documentText);

  if (queryTokens.size === 0 || docTokens.size === 0) {
    return 0;
  }

  let intersection = 0;
  for (const token of queryTokens) {
    if (docTokens.has(token)) {
      intersection += 1;
    }
  }

  return (2 * intersection) / (queryTokens.size + docTokens.size);
}
