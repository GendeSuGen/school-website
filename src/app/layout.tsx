import type { Metadata } from "next";
import { Footer, Header } from "../components/SiteChrome";
import { loadContent } from "../lib/content";
import { SITE_URL } from "../lib/format";
import "./globals.css";

export function generateMetadata(): Metadata {
  const { site } = loadContent();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
    description: site.hero.subheadline,
    openGraph: { siteName: site.name, type: "website", locale: "en_PH" },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { site } = loadContent();
  return (
    <html lang="en">
      <body>
        <Header name={site.name} />
        <main id="main" className="container main">{children}</main>
        <Footer site={site} />
      </body>
    </html>
  );
}
