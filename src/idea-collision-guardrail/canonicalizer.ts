const WHITESPACE_RE = /\s+/g;
const URL_RE = /https?:\/\/\S+/g;
const MARKDOWN_RE = /[`*_>#~]+/g;
const NON_ALNUM_RE = /[^a-z0-9\s]/g;

export function canonicalizeIdeaText(input: {
  title?: string;
  body?: string;
  tags?: string[];
}): string {
  const title = (input.title ?? "").trim();
  const body = (input.body ?? "").trim();
  const tags = input.tags ?? [];

  return [title, body, tags.join(" ")]
    .filter(Boolean)
    .join("\n")
    .toLowerCase()
    .replace(URL_RE, " ")
    .replace(MARKDOWN_RE, " ")
    .replace(NON_ALNUM_RE, " ")
    .replace(WHITESPACE_RE, " ")
    .trim();
}
