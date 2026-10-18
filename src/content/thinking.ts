export type Post = {
  slug: string;
  title: string;
  date: string; // ISO, e.g. "2026-11-02"
  summary: string;
  topic: string;
};

/** Published notes. Empty until the first piece goes live. */
export const posts: Post[] = [];

/**
 * Suggested working titles, shown as "in progress" until published.
 * Rename, remove or replace freely.
 */
export const workingTitles = [
  {
    topic: "Analytics",
    title: "Reporting is not insight",
    line: "A dashboard that changes no decision is a cost.",
  },
  {
    topic: "E-commerce",
    title: "Search fails quietly",
    line: "Treat on-site search as a product with its own funnel.",
  },
  {
    topic: "Platforms",
    title: "Global platform, local truths",
    line: "What to standardize, what to let markets own.",
  },
  {
    topic: "AI",
    title: "What AI changes about product decisions",
    line: "And what it doesn't: judgment and accountability.",
  },
  {
    topic: "Experimentation",
    title: "Shipping is the midpoint",
    line: "Design measurement before the build.",
  },
];
