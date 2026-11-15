import { marked } from "marked";

/** Renders trusted, repo-owned Markdown (content/posts/*.md) to HTML at build time. */
export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown, { async: false });
}
