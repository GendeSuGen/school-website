import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import {
  eventSchema, postMetaSchema, requirementsSchema, siteSchema,
  type Post, type Requirements, type SchoolEvent, type Site,
} from "./schemas";

export type Content = {
  site: Site;
  posts: Post[];
  events: SchoolEvent[];
  requirements: { enrollees: Requirements; transferees: Requirements };
};

export const CONTENT_DIR = join(process.cwd(), "content");
export const PUBLIC_DIR = join(process.cwd(), "public");

function readJson<T>(root: string, file: string, schema: z.ZodType<T>): T {
  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(join(root, file), "utf8"));
  } catch (err) {
    throw new Error(`content/${file}: cannot read or parse JSON (${(err as Error).message})`);
  }
  const result = schema.safeParse(raw);
  if (!result.success) {
    const problems = result.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`).join("; ");
    throw new Error(`content/${file}: invalid content. ${problems}`);
  }
  return result.data;
}

function assertUniqueSlugs(file: string, items: { slug: string }[]) {
  const seen = new Set<string>();
  for (const { slug } of items) {
    if (seen.has(slug)) throw new Error(`content/${file}: duplicate slug "${slug}"`);
    seen.add(slug);
  }
}

function assertPublicFiles(publicDir: string, file: string, paths: (string | undefined)[]) {
  for (const path of paths) {
    if (path && !existsSync(join(publicDir, path))) {
      throw new Error(`content/${file}: "${path}" does not exist in public/ (put the file there or fix the path)`);
    }
  }
}

let cached: Content | undefined;

/** Content for pages: loaded once per build (re-read on every request in dev so edits show up). */
export function getContent(): Content {
  if (process.env.NODE_ENV !== "production") return loadContent();
  return (cached ??= loadContent());
}

export const getPost = (slug: string) => getContent().posts.find((p) => p.slug === slug);
export const getEvent = (slug: string) => getContent().events.find((e) => e.slug === slug);

/** Reads and validates every content file. Throws a descriptive error on the first problem. */
export function loadContent(root: string = CONTENT_DIR, publicDir: string = PUBLIC_DIR): Content {
  const site = readJson(root, "site.json", siteSchema);
  const events = readJson(root, "events.json", z.array(eventSchema));
  const postMetas = readJson(root, "posts.json", z.array(postMetaSchema));
  assertUniqueSlugs("events.json", events);
  assertUniqueSlugs("posts.json", postMetas);
  assertPublicFiles(publicDir, "events.json", events.map((e) => e.image));
  assertPublicFiles(publicDir, "posts.json", postMetas.map((p) => p.image));

  const posts: Post[] = postMetas
    .map((meta) => {
      const path = join(root, "posts", meta.body);
      if (!existsSync(path)) throw new Error(`content/posts.json: post "${meta.slug}" points at missing file posts/${meta.body}`);
      return { ...meta, markdown: readFileSync(path, "utf8") };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  const enrollees = readJson(root, "requirements-enrollees.json", requirementsSchema);
  const transferees = readJson(root, "requirements-transferees.json", requirementsSchema);
  assertPublicFiles(publicDir, "requirements-enrollees.json", [enrollees.formPdf]);
  assertPublicFiles(publicDir, "requirements-transferees.json", [transferees.formPdf]);

  return { site, posts, events, requirements: { enrollees, transferees } };
}
