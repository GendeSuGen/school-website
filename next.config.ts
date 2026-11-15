import type { NextConfig } from "next";

// Runs once per build (not once per worker), so the warning prints a single time.
if (!process.env.NEXT_PUBLIC_SITE_URL && process.argv.includes("build")) {
  console.warn(
    "[warning] NEXT_PUBLIC_SITE_URL is not set, so the sitemap, robots.txt and share links will point at http://localhost:3000. " +
      "Set it to your real address before deploying, for example NEXT_PUBLIC_SITE_URL=https://www.example.edu",
  );
}

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Set NEXT_PUBLIC_BASE_PATH (for example /school-website) when hosting under a subpath, as GitHub Pages project sites do.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
