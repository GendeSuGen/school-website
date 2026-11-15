import { ImageResponse } from "next/og";

export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 };

/** Social share card (1200x630): school name, a headline, and an optional small label. Colors match globals.css. */
export function renderShareImage({ schoolName, headline, label }: { schoolName: string; headline: string; label?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#1d4e89",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 700, color: "#f2a900" }}>{label ? `${schoolName} · ${label}` : schoolName}</div>
        <div style={{ fontSize: headline.length > 60 ? 56 : 72, fontWeight: 700, lineHeight: 1.2 }}>{headline}</div>
      </div>
    ),
    SHARE_IMAGE_SIZE,
  );
}
