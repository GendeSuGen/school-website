import { getContent, getPost } from "../../../lib/content";
import { renderShareImage, SHARE_IMAGE_SIZE } from "../../../lib/share-image";

export const dynamic = "force-static";
export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Blog post";

export function generateStaticParams() {
  return getContent().posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderShareImage({
    schoolName: getContent().site.name,
    headline: post?.title ?? getContent().site.tagline,
    label: "Blog",
  });
}
