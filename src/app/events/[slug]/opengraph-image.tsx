import { getContent, getEvent } from "../../../lib/content";
import { renderShareImage, SHARE_IMAGE_SIZE } from "../../../lib/share-image";

export const dynamic = "force-static";
export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Event";

export function generateStaticParams() {
  return getContent().events.map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  return renderShareImage({
    schoolName: getContent().site.name,
    headline: event?.title ?? getContent().site.tagline,
    label: "Event",
  });
}
