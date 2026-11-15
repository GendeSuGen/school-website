import Link from "next/link";
import { EventCard, PostCard } from "../components/Cards";
import { getContent } from "../lib/content";
import { splitEvents } from "../lib/events";
import { todayISO } from "../lib/format";
import { ui } from "../lib/strings";

export default function HomePage() {
  const { site, posts, events } = getContent();
  const { upcoming } = splitEvents(events, todayISO());

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">{site.hero.headline}</h1>
        <p className="lead">{site.hero.subheadline}</p>
        <p className="actions">
          <Link className="btn" href="/requirements/enrollees/">{ui.home.newEnrollee}</Link>
          <Link className="btn btn-secondary" href="/requirements/transferees/">{ui.home.transferee}</Link>
        </p>
      </section>

      <section aria-labelledby="home-events">
        <div className="section-head">
          <h2 id="home-events">{ui.home.upcomingEvents}</h2>
          <Link href="/events/">{ui.home.allEvents}</Link>
        </div>
        {upcoming.length ? (
          <div className="grid">{upcoming.slice(0, 3).map((e) => <EventCard key={e.slug} event={e} />)}</div>
        ) : (
          <p className="empty">{ui.home.noUpcoming}</p>
        )}
      </section>

      <section aria-labelledby="home-blog">
        <div className="section-head">
          <h2 id="home-blog">{ui.home.latestPosts}</h2>
          <Link href="/blog/">{ui.home.allPosts}</Link>
        </div>
        <div className="grid">{posts.slice(0, 3).map((p) => <PostCard key={p.slug} post={p} />)}</div>
      </section>

      <section className="teaser" aria-labelledby="home-about">
        <h2 id="home-about">About {site.name}</h2>
        <p>{site.about.mission}</p>
        <p><Link href="/about/">{ui.home.readOurStory}</Link></p>
      </section>
    </>
  );
}
