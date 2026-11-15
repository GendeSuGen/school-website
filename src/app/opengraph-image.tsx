import { getContent } from "../lib/content";
import { renderShareImage, SHARE_IMAGE_SIZE } from "../lib/share-image";

// Default social share image, generated at build time from site.json.
export const dynamic = "force-static";
export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "College name and tagline";

export default function Image() {
  const { site } = getContent();
  return renderShareImage({ schoolName: site.name, headline: site.tagline });
}
