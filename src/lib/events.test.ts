import { describe, expect, it } from "vitest";
import { splitEvents } from "./events";

const ev = (slug: string, date: string, endDate?: string) => ({
  slug, title: slug, date, endDate, location: "Hall", category: "General", summary: "s",
});

describe("splitEvents", () => {
  it("puts future events in upcoming, soonest first, and past events in past, newest first", () => {
    const { upcoming, past } = splitEvents(
      [ev("c", "2026-12-10"), ev("a", "2026-01-05"), ev("b", "2026-11-20"), ev("d", "2026-03-01")],
      "2026-11-15",
    );
    expect(upcoming.map((e) => e.slug)).toEqual(["b", "c"]);
    expect(past.map((e) => e.slug)).toEqual(["d", "a"]);
  });

  it("treats an event happening today as upcoming", () => {
    const { upcoming, past } = splitEvents([ev("today", "2026-11-15")], "2026-11-15");
    expect(upcoming.map((e) => e.slug)).toEqual(["today"]);
    expect(past).toEqual([]);
  });

  it("keeps a multi-day event upcoming until its end date has passed", () => {
    const e = ev("fair", "2026-11-10", "2026-11-16");
    expect(splitEvents([e], "2026-11-15").upcoming).toHaveLength(1);
    expect(splitEvents([e], "2026-11-17").past).toHaveLength(1);
  });
});
