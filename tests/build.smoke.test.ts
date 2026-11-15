import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Runs against the static export produced by `next build` (see the test:build script).
const OUT = join(process.cwd(), "out");
const html = (route: string) => readFileSync(join(OUT, route, "index.html"), "utf8");

describe("static export", () => {
  it.each([
    ["", "Riverside College"],
    ["about", "Our history"],
    ["blog", "Blog"],
    ["blog/enrollment-now-open", "Enrollment for the Next Semester Is Now Open"],
    ["events", "Upcoming events"],
    ["events/enrollment-orientation-2027", "Enrollment Orientation for New Students"],
    ["requirements", "New enrollees"],
    ["requirements/enrollees", "Documents to bring"],
    ["requirements/transferees", "Documents to bring"],
  ])("renders /%s with its expected content", (route, text) => {
    expect(existsSync(join(OUT, route, "index.html"))).toBe(true);
    expect(html(route)).toContain(text);
  });

  it("gives each page its own title", () => {
    expect(html("about")).toMatch(/<title>About \| Riverside College<\/title>/);
    expect(html("requirements/transferees")).toMatch(/<title>Requirements for Transferees \| Riverside College<\/title>/);
  });

  it("publishes a sitemap and robots.txt", () => {
    expect(readFileSync(join(OUT, "sitemap.xml"), "utf8")).toContain("/requirements/transferees/");
    expect(readFileSync(join(OUT, "robots.txt"), "utf8")).toContain("Sitemap:");
  });

  it("splits Home events using the build date, not stale content", () => {
    // Past events from the sample data must never appear in Home's upcoming list.
    expect(html("")).not.toContain("Foundation Day Celebration");
  });
});
