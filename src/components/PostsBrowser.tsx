"use client";

import { useState } from "react";
import { ui } from "../lib/strings";
import type { Post } from "../lib/schemas";
import { PostCard } from "./Cards";
import { CategoryFilter, uniqueCategories } from "./CategoryFilter";

export function PostsBrowser({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string>(ui.all);
  const visible = posts.filter((p) => active === ui.all || p.category === active);

  return (
    <>
      <CategoryFilter categories={uniqueCategories(posts)} active={active} onChange={setActive} label={ui.blog.filterLabel} />
      {visible.length ? (
        <div className="grid">{visible.map((p) => <PostCard key={p.slug} post={p} />)}</div>
      ) : (
        <p className="empty">{ui.blog.none}</p>
      )}
    </>
  );
}
