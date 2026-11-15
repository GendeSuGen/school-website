import type { MetadataRoute } from "next";
import { getContent } from "../lib/content";
import { SITE_URL } from "../lib/format";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const { posts, events } = getContent();
  const pages = ["/", "/about/", "/blog/", "/events/", "/requirements/", "/requirements/enrollees/", "/requirements/transferees/"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}` })),
    ...posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}/`, lastModified: p.date })),
    ...events.map((e) => ({ url: `${SITE_URL}/events/${e.slug}/` })),
  ];
}
