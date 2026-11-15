export type EventLike = { date: string; endDate?: string };

/**
 * Splits events into upcoming and past relative to `today` (YYYY-MM-DD).
 * An event stays upcoming through its last day (`endDate`, or `date` if single-day).
 * Upcoming is soonest first; past is newest first.
 */
export function splitEvents<T extends EventLike>(events: T[], today: string): { upcoming: T[]; past: T[] } {
  const lastDay = (e: T) => e.endDate ?? e.date;
  const upcoming = events.filter((e) => lastDay(e) >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = events.filter((e) => lastDay(e) < today).sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}
