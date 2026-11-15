import type { Metadata } from "next";
import Link from "next/link";
import { RequirementsView } from "../../../components/RequirementsView";
import { loadContent } from "../../../lib/content";

export function generateMetadata(): Metadata {
  const { transferees } = loadContent().requirements;
  return { title: transferees.title, description: transferees.intro };
}

export default function TransfereesPage() {
  const { transferees } = loadContent().requirements;
  return (
    <>
      <p className="no-print"><Link href="/requirements/">&larr; All requirements</Link></p>
      <h1>{transferees.title}</h1>
      <RequirementsView data={transferees} />
    </>
  );
}
