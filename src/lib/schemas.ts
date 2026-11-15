import { z } from "zod";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be lowercase letters, numbers and hyphens");
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be a date like 2026-12-31");
const publicPath = z.string().regex(/^\/[^/]/, "must start with / (a path inside /public)");

export const siteSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  hero: z.object({ headline: z.string().min(1), subheadline: z.string().min(1) }),
  about: z.object({
    history: z.string().min(1),
    mission: z.string().min(1),
    vision: z.string().min(1),
    leadership: z.array(z.object({ name: z.string().min(1), role: z.string().min(1), message: z.string().optional() })),
    campusFacts: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })),
  }),
  contact: z.object({
    address: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email(),
    hours: z.string().min(1),
    mapUrl: z.string().url().optional(),
  }),
});

export const postMetaSchema = z.object({
  slug,
  title: z.string().min(1),
  date: isoDate,
  author: z.string().min(1),
  category: z.string().min(1),
  summary: z.string().min(1),
  body: z.string().regex(/^[\w-]+\.md$/, "must be a Markdown file name in content/posts, like welcome.md"),
  image: publicPath.optional(),
});

export const eventSchema = z.object({
  slug,
  title: z.string().min(1),
  date: isoDate,
  endDate: isoDate.optional(),
  time: z.string().optional(),
  location: z.string().min(1),
  category: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().optional(),
  image: publicPath.optional(),
});

export const requirementsSchema = z.object({
  title: z.string().min(1),
  intro: z.string().min(1),
  documents: z.array(z.object({ name: z.string().min(1), note: z.string().optional() })).min(1),
  steps: z.array(z.object({ title: z.string().min(1), description: z.string().min(1) })).min(1),
  deadlines: z.array(z.object({ label: z.string().min(1), when: z.string().min(1) })),
  fees: z.array(z.object({ label: z.string().min(1), amount: z.string().min(1) })),
  contact: z.object({ office: z.string().min(1), email: z.string().email(), phone: z.string().min(1) }),
  formPdf: publicPath.optional(),
});

export type Site = z.infer<typeof siteSchema>;
export type PostMeta = z.infer<typeof postMetaSchema>;
export type Post = PostMeta & { markdown: string };
export type SchoolEvent = z.infer<typeof eventSchema>;
export type Requirements = z.infer<typeof requirementsSchema>;
