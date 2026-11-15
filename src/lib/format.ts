const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

/** "2026-12-12" -> "December 12, 2026". Parsed as UTC so it never shifts by timezone. */
export function formatDate(iso: string): string {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

export function formatDateRange(date: string, endDate?: string): string {
  return endDate && endDate !== date ? `${formatDate(date)} to ${formatDate(endDate)}` : formatDate(date);
}

/** Today's date (YYYY-MM-DD) in Philippine time, used at build time to split Upcoming and Past events. */
export function todayISO(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(now);
}

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
