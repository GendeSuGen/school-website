import Link from "next/link";
import { formatDate, formatDateRange } from "../lib/format";
import type { Post, SchoolEvent } from "../lib/schemas";

export function EventCard({ event }: { event: SchoolEvent }) {
  return (
    <article className="card">
      <p className="meta">
        <span className="tag">{event.category}</span>{" "}
        <time dateTime={event.date}>{formatDateRange(event.date, event.endDate)}</time>
      </p>
      <h3><Link href={`/events/${event.slug}/`}>{event.title}</Link></h3>
      <p>{event.summary}</p>
      <p className="meta">{[event.time, event.location].filter(Boolean).join(" · ")}</p>
    </article>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="card">
      <p className="meta">
        <span className="tag">{post.category}</span> <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
      <h3><Link href={`/blog/${post.slug}/`}>{post.title}</Link></h3>
      <p>{post.summary}</p>
      <p className="meta">By {post.author}</p>
    </article>
  );
}
