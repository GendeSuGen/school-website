import { describe, expect, it } from "vitest";
import { renderMarkdown } from "./markdown";

describe("renderMarkdown", () => {
  it("prefixes site-relative links with the base path so they work on a subpath host", () => {
    const html = renderMarkdown("See [Requirements](/requirements/).", "/school-website");
    expect(html).toContain('href="/school-website/requirements/"');
  });

  it("leaves external links and anchors alone", () => {
    const html = renderMarkdown("[Out](https://example.org/a) and [Here](#top) and [Mail](mailto:a@b.co)", "/school-website");
    expect(html).toContain('href="https://example.org/a"');
    expect(html).toContain('href="#top"');
    expect(html).toContain('href="mailto:a@b.co"');
  });

  it("changes nothing when there is no base path", () => {
    expect(renderMarkdown("[R](/requirements/)", "")).toContain('href="/requirements/"');
  });
});
