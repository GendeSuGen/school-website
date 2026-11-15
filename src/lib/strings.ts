/**
 * Every fixed piece of interface text (buttons, headings, labels) lives here, in one place.
 *
 * To add another language later: copy this object to a new locale (for example `fil`), translate the values,
 * and choose which one to use. Editable content (site.json, events, posts, requirements) is separate and would
 * need a copy per language, for example `content/fil/`.
 */
export const LANGUAGE = "en";

export const ui = {
  all: "All",
  skipToContent: "Skip to content",
  nav: { home: "Home", about: "About", blog: "Blog", events: "Events", requirements: "Requirements" },
  footer: { contactUs: "Contact us", explore: "Explore", findOnMap: "Find us on the map" },
  home: {
    newEnrollee: "I'm a new enrollee",
    transferee: "I'm a transferee",
    upcomingEvents: "Upcoming events",
    allEvents: "All events",
    noUpcoming: "No upcoming events right now. Please check back soon.",
    latestPosts: "Latest from the blog",
    allPosts: "All posts",
    readOurStory: "Read our story",
  },
  events: {
    title: "Events",
    lead: "Orientations, activities and celebrations on campus.",
    filterLabel: "Filter events by category",
    upcoming: "Upcoming events",
    past: "Past events",
    noUpcomingInCategory: "No upcoming events in this category right now. Please check back soon.",
    noPastInCategory: "No past events in this category.",
    back: "All events",
  },
  blog: {
    title: "Blog",
    lead: "News, announcements and stories from our campus.",
    filterLabel: "Filter posts by category",
    none: "No posts in this category yet.",
    back: "All posts",
  },
  requirements: {
    title: "Requirements",
    back: "All requirements",
    print: "Print this checklist",
    downloadForm: "Download the form (PDF)",
    documents: "Documents to bring",
    steps: "Steps",
    deadlines: "Deadlines",
    fees: "Fees",
    questions: "Questions?",
  },
} as const;
