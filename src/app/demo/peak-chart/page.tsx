import type { Metadata } from "next";
import { PeakChartDemo } from "../../../components/PeakChartDemo";

// A preview page for the Peak Chart component. Not linked from the menu or the sitemap, and hidden from search engines.
export const metadata: Metadata = {
  title: "Peak Chart demo",
  robots: { index: false, follow: false },
};

export default function PeakChartDemoPage() {
  return (
    <>
      <h1>Peak Chart demo</h1>
      <p className="lead">Hover the line to read values. Use the dropdown on the second card to switch periods.</p>
      <PeakChartDemo />
    </>
  );
}
