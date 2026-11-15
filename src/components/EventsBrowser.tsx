"use client";

import { useState } from "react";
import type { SchoolEvent } from "../lib/schemas";
import { EventCard } from "./Cards";

export function EventsBrowser({ upcoming, past }: { upcoming: SchoolEvent[]; past: SchoolEvent[] }) {
  const categories = ["All", ...Array.from(new Set([...upcoming, ...past].map((e) => e.category))).sort()];
  const [active, setActive] = useState("All");
  const inCategory = (list: SchoolEvent[]) => list.filter((e) => active === "All" || e.category === active);
  const visibleUpcoming = inCategory(upcoming);
  const visiblePast = inCategory(past);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter events by category">
        {categories.map((c) => (
          <button key={c} type="button" className="chip" aria-pressed={c === active} onClick={() => setActive(c)}>
            {c}
          </button>
        ))}
      </div>

      <section aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading">Upcoming events</h2>
        {visibleUpcoming.length ? (
          <div className="grid">{visibleUpcoming.map((e) => <EventCard key={e.slug} event={e} />)}</div>
        ) : (
          <p className="empty">No upcoming events in this category right now. Please check back soon.</p>
        )}
      </section>

      <section aria-labelledby="past-heading">
        <h2 id="past-heading">Past events</h2>
        {visiblePast.length ? (
          <div className="grid">{visiblePast.map((e) => <EventCard key={e.slug} event={e} />)}</div>
        ) : (
          <p className="empty">No past events in this category.</p>
        )}
      </section>
    </>
  );
}
