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

/** Reads and validates every content file. Throws a descriptive error on the first problem. */
export function loadContent(root: string = CONTENT_DIR): Content {
  const site = readJson(root, "site.json", siteSchema);
  const events = readJson(root, "events.json", z.array(eventSchema));
  const postMetas = readJson(root, "posts.json", z.array(postMetaSchema));
  assertUniqueSlugs("events.json", events);
  assertUniqueSlugs("posts.json", postMetas);

  const posts: Post[] = postMetas
    .map((meta) => {
      const path = join(root, "posts", meta.body);
      if (!existsSync(path)) throw new Error(`content/posts.json: post "${meta.slug}" points at missing file posts/${meta.body}`);
      return { ...meta, markdown: readFileSync(path, "utf8") };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return {
    site,
    posts,
    events,
    requirements: {
      enrollees: readJson(root, "requirements-enrollees.json", requirementsSchema),
      transferees: readJson(root, "requirements-transferees.json", requirementsSchema),
    },
  };
}
