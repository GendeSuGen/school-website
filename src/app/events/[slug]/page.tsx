import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadContent } from "../../../lib/content";
import { formatDateRange } from "../../../lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return loadContent().events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = loadContent().events.find((e) => e.slug === slug);
  if (!event) return {};
  return { title: event.title, description: event.summary, openGraph: { title: event.title, description: event.summary } };
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const event = loadContent().events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <article className="prose">
      <p><Link href="/events/">&larr; All events</Link></p>
      <h1>{event.title}</h1>
      <p className="meta"><span className="tag">{event.category}</span></p>
      <dl className="facts">
        <div><dt>Date</dt><dd><time dateTime={event.date}>{formatDateRange(event.date, event.endDate)}</time></dd></div>
        {event.time ? <div><dt>Time</dt><dd>{event.time}</dd></div> : null}
        <div><dt>Where</dt><dd>{event.location}</dd></div>
      </dl>
      <p>{event.description ?? event.summary}</p>
    </article>
  );
}
