import { z } from "zod";

const nonEmpty = z.string().min(1);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be lowercase letters, numbers and hyphens");
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be a date like 2026-12-31");
const publicPath = z.string().regex(/^\/[^/]/, "must start with / (a path inside /public)");

export const siteSchema = z.object({
  name: nonEmpty,
  tagline: nonEmpty,
  hero: z.object({ headline: nonEmpty, subheadline: nonEmpty }),
  about: z.object({
    history: nonEmpty,
    mission: nonEmpty,
    vision: nonEmpty,
    leadership: z.array(z.object({ name: nonEmpty, role: nonEmpty, message: z.string().optional() })),
    campusFacts: z.array(z.object({ label: nonEmpty, value: nonEmpty })),
  }),
  contact: z.object({
    address: nonEmpty,
    phone: nonEmpty,
    email: z.string().email(),
    hours: nonEmpty,
    mapUrl: z.string().url().optional(),
  }),
});

export const postMetaSchema = z.object({
  slug,
  title: nonEmpty,
  date: isoDate,
  author: nonEmpty,
  category: nonEmpty,
  summary: nonEmpty,
  body: z.string().regex(/^[\w-]+\.md$/, "must be a Markdown file name in content/posts, like welcome.md"),
  image: publicPath.optional(),
});

export const eventSchema = z.object({
  slug,
  title: nonEmpty,
  date: isoDate,
  endDate: isoDate.optional(),
  time: z.string().optional(),
  location: nonEmpty,
  category: nonEmpty,
  summary: nonEmpty,
  description: z.string().optional(),
  image: publicPath.optional(),
});

export const requirementsSchema = z.object({
  title: nonEmpty,
  intro: nonEmpty,
  documents: z.array(z.object({ name: nonEmpty, note: z.string().optional() })).min(1),
  steps: z.array(z.object({ title: nonEmpty, description: nonEmpty })).min(1),
  deadlines: z.array(z.object({ label: nonEmpty, when: nonEmpty })),
  fees: z.array(z.object({ label: nonEmpty, amount: nonEmpty })),
  contact: z.object({ office: nonEmpty, email: z.string().email(), phone: nonEmpty }),
  formPdf: publicPath.optional(),
});

export type Site = z.infer<typeof siteSchema>;
export type PostMeta = z.infer<typeof postMetaSchema>;
export type Post = PostMeta & { markdown: string };
export type SchoolEvent = z.infer<typeof eventSchema>;
export type Requirements = z.infer<typeof requirementsSchema>;
