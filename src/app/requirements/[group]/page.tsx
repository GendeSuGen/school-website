import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RequirementsView } from "../../../components/RequirementsView";
import { getContent } from "../../../lib/content";
import { ui } from "../../../lib/strings";

// One page per audience; the URLs are /requirements/enrollees/ and /requirements/transferees/.
const GROUPS = ["enrollees", "transferees"] as const;
type Group = (typeof GROUPS)[number];

export const dynamicParams = false;

export function generateStaticParams() {
  return GROUPS.map((group) => ({ group }));
}

function find(group: string) {
  return GROUPS.includes(group as Group) ? getContent().requirements[group as Group] : undefined;
}

export async function generateMetadata({ params }: PageProps<"/requirements/[group]">): Promise<Metadata> {
  const data = find((await params).group);
  return data ? { title: data.title, description: data.intro } : {};
}

export default async function RequirementsGroupPage({ params }: PageProps<"/requirements/[group]">) {
  const data = find((await params).group);
  if (!data) notFound();

  return (
    <>
      <p className="no-print"><Link href="/requirements/">&larr; {ui.requirements.back}</Link></p>
      <h1>{data.title}</h1>
      <RequirementsView data={data} />
    </>
  );
}
