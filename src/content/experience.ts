import { todo, type Copy } from "./types";

export type Role = {
  period: Copy;
  title: Copy;
  org: Copy;
  line: Copy;
  focus: string[];
};

export type Chapter = {
  label: string;
  theme: string;
  roles: Role[];
};

/**
 * Grouped by chapter of the story rather than as a flat CV list.
 * Newest first.
 */
export const chapters: Chapter[] = [
  {
    label: "Product ownership",
    theme: "A global digital product, end to end.",
    roles: [
      {
        period: todo("Start year to present"),
        title: "Product Owner, Home.ID",
        org: "Versuni",
        line: "Global consumer-care platform for Philips appliances.",
        focus: ["Strategy & roadmap", "Platform integrations", "Localization", "Measurement"],
      },
    ],
  },
  {
    label: "E-commerce & analytics",
    theme: "Behavior into decisions.",
    roles: [
      {
        period: todo("Years"),
        title: todo("Exact title, e.g. Lead, D2C E-commerce Insights & Analytics"),
        org: todo("Organization"),
        line: "D2C e-commerce insights across millions of sessions.",
        focus: ["Funnel optimization", "Search analytics", "Experimentation", "Attribution"],
      },
    ],
  },
  {
    label: "Foundations",
    theme: "Consumer insight, CRM and commercial strategy.",
    roles: [
      {
        period: todo("Years"),
        title: todo("Role title(s)"),
        org: todo("Organization(s)"),
        line: todo("One line on scope, e.g. CRM and lifecycle marketing, segmentation, quantitative research"),
        focus: ["Consumer insights", "CRM & lifecycle", "Segmentation", "Commercial strategy"],
      },
    ],
  },
];

export const education: { period: Copy; title: Copy; org: Copy }[] = [
  {
    period: todo("Years"),
    title: todo("Degree or programme"),
    org: todo("Institution"),
  },
];
