import type { Metadata } from "next";
import { PostCard } from "../../components/Cards";
import { getContent } from "../../lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "News, announcements and stories from our campus.",
};

export default function BlogPage() {
  const { posts } = getContent();
  return (
    <>
      <h1>Blog</h1>
      <p className="lead">News, announcements and stories from our campus.</p>
      <div className="grid">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
    </>
  );
}
