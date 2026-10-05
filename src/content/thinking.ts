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
    line: "A dashboard that changes no decision is a cost, not an asset.",
  },
  {
    topic: "E-commerce",
    title: "Search fails quietly",
    line: "Why on-site search deserves to be treated as a product, with its own funnel.",
  },
  {
    topic: "Platforms",
    title: "Global platform, local truths",
    line: "Deciding what to standardize and what to let markets own.",
  },
  {
    topic: "AI",
    title: "What AI changes about product decisions",
    line: "And what it does not: judgment, context and accountability.",
  },
  {
    topic: "Experimentation",
    title: "Shipping is the midpoint",
    line: "Designing measurement before the build, not after the launch.",
  },
];
