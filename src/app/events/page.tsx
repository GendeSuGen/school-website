import type { Metadata } from "next";
import { EventsBrowser } from "../../components/EventsBrowser";
import { loadContent } from "../../lib/content";
import { splitEvents } from "../../lib/events";
import { todayISO } from "../../lib/format";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past events, orientations and activities on campus.",
};

export default function EventsPage() {
  const { upcoming, past } = splitEvents(loadContent().events, todayISO());
  return (
    <>
      <h1>Events</h1>
      <p className="lead">Orientations, activities and celebrations on campus.</p>
      <EventsBrowser upcoming={upcoming} past={past} />
    </>
  );
}
