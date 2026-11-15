import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { loadContent } from "./content";

const site = {
  name: "Test College", tagline: "Learn", hero: { headline: "Welcome", subheadline: "Apply today" },
  about: { history: "h", mission: "m", vision: "v", leadership: [{ name: "Dr. A", role: "President" }], campusFacts: [{ label: "Students", value: "100" }] },
  contact: { address: "1 Main St", phone: "123", email: "info@test.edu", hours: "9-5" },
};
const post = { slug: "hello", title: "Hello", date: "2026-11-01", author: "Admin", category: "News", summary: "s", body: "hello.md" };
const event = { slug: "fair", title: "Fair", date: "2026-12-01", location: "Gym", category: "Campus", summary: "s" };
const reqs = {
  title: "Requirements", intro: "i", documents: [{ name: "Birth certificate" }],
  steps: [{ title: "Submit", description: "Go to registrar" }], deadlines: [], fees: [],
  contact: { office: "Registrar", email: "reg@test.edu", phone: "123" },
};

let dir: string;
const write = (file: string, data: unknown) => writeFileSync(join(dir, file), typeof data === "string" ? data : JSON.stringify(data));

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "content-"));
  mkdirSync(join(dir, "posts"));
  write("site.json", site);
  write("posts.json", [post]);
  write("events.json", [event]);
  write("requirements-enrollees.json", reqs);
  write("requirements-transferees.json", { ...reqs, title: "Transferee Requirements" });
  write("posts/hello.md", "# Hello\n\nBody text.");
});
afterEach(() => rmSync(dir, { recursive: true, force: true }));

describe("loadContent", () => {
  it("loads every content file and attaches each post's Markdown body", () => {
    const c = loadContent(dir);
    expect(c.site.name).toBe("Test College");
    expect(c.events.map((e) => e.slug)).toEqual(["fair"]);
    expect(c.requirements.enrollees.title).toBe("Requirements");
    expect(c.requirements.transferees.title).toBe("Transferee Requirements");
    expect(c.posts[0].markdown).toContain("Body text.");
  });

  it("returns posts newest first", () => {
    write("posts.json", [post, { ...post, slug: "newer", date: "2026-11-10", body: "newer.md" }]);
    write("posts/newer.md", "newer");
    expect(loadContent(dir).posts.map((p) => p.slug)).toEqual(["newer", "hello"]);
  });

  it("fails naming the file and field when a value is invalid", () => {
    write("events.json", [{ ...event, date: "December 1" }]);
    expect(() => loadContent(dir)).toThrowError(/events\.json.*date/s);
  });

  it("fails naming the file when the JSON is malformed", () => {
    write("site.json", "{ not json");
    expect(() => loadContent(dir)).toThrowError(/site\.json/);
  });

  it("fails when a post points at a Markdown file that does not exist", () => {
    write("posts.json", [{ ...post, body: "missing.md" }]);
    expect(() => loadContent(dir)).toThrowError(/missing\.md/);
  });

  it("fails when two entries share a slug", () => {
    write("events.json", [event, event]);
    expect(() => loadContent(dir)).toThrowError(/duplicate.*fair/i);
  });
});
