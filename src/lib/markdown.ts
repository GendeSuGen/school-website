import { marked } from "marked";
import { BASE_PATH } from "./format";

/**
 * Renders trusted, repo-owned Markdown (content/posts/*.md) to HTML at build time.
 * Links that start with "/" are site-relative, so they get the base path prefixed
 * (needed when the site is served from a subpath such as /school-website on GitHub Pages).
 */
export function renderMarkdown(markdown: string, basePath: string = BASE_PATH): string {
  const html = marked.parse(markdown, { async: false });
  return basePath ? html.replace(/href="\/(?!\/)/g, `href="${basePath}/`) : html;
}
