import type { Metadata } from "next";
import Link from "next/link";
import { RequirementsView } from "../../../components/RequirementsView";
import { loadContent } from "../../../lib/content";

export function generateMetadata(): Metadata {
  const { enrollees } = loadContent().requirements;
  return { title: enrollees.title, description: enrollees.intro };
}

export default function EnrolleesPage() {
  const { enrollees } = loadContent().requirements;
  return (
    <>
      <p className="no-print"><Link href="/requirements/">&larr; All requirements</Link></p>
      <h1>{enrollees.title}</h1>
      <RequirementsView data={enrollees} />
    </>
  );
}
