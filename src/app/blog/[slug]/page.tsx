import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, getPost } from "../../../lib/content";
import { formatDate } from "../../../lib/format";
import { renderMarkdown } from "../../../lib/markdown";
import { ui } from "../../../lib/strings";

export const dynamicParams = false;

export function generateStaticParams() {
  return getContent().posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: { type: "article", title: post.title, description: post.summary, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="prose">
      <p><Link href="/blog/">&larr; {ui.blog.back}</Link></p>
      <h1>{post.title}</h1>
      <p className="meta">
        <span className="tag">{post.category}</span> <time dateTime={post.date}>{formatDate(post.date)}</time> · By {post.author}
      </p>
      <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.markdown) }} />
    </article>
  );
}
