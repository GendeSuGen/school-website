import type { Metadata } from "next";
import { PostsBrowser } from "../../components/PostsBrowser";
import { getContent } from "../../lib/content";
import { ui } from "../../lib/strings";

export const metadata: Metadata = {
  title: "Blog",
  description: "News, announcements and stories from our campus.",
};

export default function BlogPage() {
  const { posts } = getContent();
  return (
    <>
      <h1>{ui.blog.title}</h1>
      <p className="lead">{ui.blog.lead}</p>
      <PostsBrowser posts={posts} />
    </>
  );
}
