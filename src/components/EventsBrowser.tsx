"use client";

import { useState } from "react";
import type { SchoolEvent } from "../lib/schemas";
import { ui } from "../lib/strings";
import { EventCard } from "./Cards";
import { CategoryFilter, uniqueCategories } from "./CategoryFilter";

export function EventsBrowser({ upcoming, past }: { upcoming: SchoolEvent[]; past: SchoolEvent[] }) {
  const [active, setActive] = useState<string>(ui.all);
  const inCategory = (list: SchoolEvent[]) => list.filter((e) => active === ui.all || e.category === active);
  const visibleUpcoming = inCategory(upcoming);
  const visiblePast = inCategory(past);

  return (
    <>
      <CategoryFilter
        categories={uniqueCategories([...upcoming, ...past])}
        active={active}
        onChange={setActive}
        label={ui.events.filterLabel}
      />

      <section aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading">{ui.events.upcoming}</h2>
        {visibleUpcoming.length ? (
          <div className="grid">{visibleUpcoming.map((e) => <EventCard key={e.slug} event={e} />)}</div>
        ) : (
          <p className="empty">{ui.events.noUpcomingInCategory}</p>
        )}
      </section>

      <section aria-labelledby="past-heading">
        <h2 id="past-heading">{ui.events.past}</h2>
        {visiblePast.length ? (
          <div className="grid">{visiblePast.map((e) => <EventCard key={e.slug} event={e} />)}</div>
        ) : (
          <p className="empty">{ui.events.noPastInCategory}</p>
        )}
      </section>
    </>
  );
}
