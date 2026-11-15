import type { Metadata } from "next";
import { EventsBrowser } from "../../components/EventsBrowser";
import { getContent } from "../../lib/content";
import { splitEvents } from "../../lib/events";
import { todayISO } from "../../lib/format";
import { ui } from "../../lib/strings";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past events, orientations and activities on campus.",
};

export default function EventsPage() {
  const { upcoming, past } = splitEvents(getContent().events, todayISO());
  return (
    <>
      <h1>{ui.events.title}</h1>
      <p className="lead">{ui.events.lead}</p>
      <EventsBrowser upcoming={upcoming} past={past} />
    </>
  );
}
