import { todo, type Copy, type Todo } from "./types";

export const site = {
  name: "Manuel Fernández",
  role: "Product Owner, Home.ID at Versuni",
  location: "Amsterdam",
  /** Set NEXT_PUBLIC_SITE_URL in production so canonical and OG URLs are absolute. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  title: "Manuel Fernández · Product, customer experience and analytics",
  description:
    "Manuel Fernández builds digital customer experiences using data, technology and consumer insight: product discovery, e-commerce and global platforms. Product Owner for Home.ID at Versuni, with a background in D2C e-commerce analytics. Based in Amsterdam.",
  /**
   * Stealth mode (default). Tells search engines not to index the site and blocks
   * all crawlers in robots.txt. Set NEXT_PUBLIC_PUBLIC=1 only when ready to go public.
   */
  private: process.env.NEXT_PUBLIC_PUBLIC !== "1",
  disciplines: ["Product", "E-commerce", "Analytics", "Consumer experience", "Technology"],
};

export const nav = [
  { href: "/work/", label: "Work" },
  { href: "/about/", label: "About" },
  { href: "/experience/", label: "Experience" },
  { href: "/thinking/", label: "Thinking" },
  { href: "#contact", label: "Contact" },
];

export const contact: {
  email: string | Todo;
  linkedin: string | Todo;
  cv: string | Todo;
} = {
  email: todo("Public contact email"),
  linkedin: todo("LinkedIn profile URL"),
  cv: todo("Optional: link to a PDF CV"),
};

/** The central narrative, used on Home and About. */
export const evolution = [
  {
    step: "01",
    label: "Analytics & insight",
    text: "Measurement and analysis behind D2C e-commerce. Funnels, search, campaigns, CRM, across millions of consumer sessions.",
  },
  {
    step: "02",
    label: "Consumer & commercial behavior",
    text: "From what happened to why. Where people drop off, what they look for, what they fail to find, and what it costs.",
  },
  {
    step: "03",
    label: "Product decisions",
    text: "Using that evidence to set priorities, write requirements and design experiments. Not more dashboards.",
  },
  {
    step: "04",
    label: "Global product ownership",
    text: "Accountable for a global platform end to end: strategy, roadmap, integrations, markets and measurement.",
  },
];

export const principles = [
  {
    title: "Start with the problem.",
    text: "Features are answers. First agree on the question: who is stuck, where, and what it costs them and the business.",
  },
  {
    title: "Data should change the plan.",
    text: "If an analysis does not move a priority, it is reporting. I look for the finding that changes what we build next.",
  },
  {
    title: "Understand the system.",
    text: "APIs, data flows, content models, market rules, operational limits. Good product calls depend on knowing how the thing actually works.",
  },
  {
    title: "Make complexity executable.",
    text: "Ambiguity is normal. The job is to break it into decisions, owners and increments a team can deliver.",
  },
  {
    title: "Shipping is the midpoint.",
    text: "Release is when the evidence starts. Every change needs a way to tell whether it worked.",
  },
];

export const fluency: { group: string; items: Copy[] }[] = [
  {
    group: "Analysis & methods",
    items: [
      "Funnel and conversion analysis",
      "Segmentation and cohorts",
      "Experimentation and A/B testing",
      "Attribution and marketing measurement",
      "Large behavioral datasets (millions of sessions)",
      todo("Confirm what you can claim hands-on: SQL, Python, pre/post or diff-in-diff analysis"),
    ],
  },
  {
    group: "Platforms & integration",
    items: ["REST APIs and OpenAPI specs", "Backend services", "AWS", "CMS and content platforms", "Data pipelines and integrations"],
  },
  {
    group: "Data & tooling",
    items: ["GA4", "BigQuery", "Databricks", "Athena and S3", "Power BI", "SAP Datasphere and SAC", "CDPs and CRM platforms"],
  },
];

export const interests = [
  "AI-enabled products",
  "Personalization",
  "Decision intelligence",
  "Experimentation",
  "Pricing",
  "Marketing measurement",
  "Fintech and digital assets",
  "Data-driven investing",
  "Large-scale digital platforms",
];

/** Three pointers under the hero: proof, method, point of view. */
export const pointers = [
  {
    label: "Operating proof",
    title: "Home.ID at Versuni",
    text: "Product Owner for a global consumer-care platform for Philips-branded home appliances.",
    href: "/work/global-consumer-care-platform/",
  },
  {
    label: "Method",
    title: "Problem, data, system, decision, measure.",
    text: "Five working principles for turning ambiguity into work a team can ship.",
    href: "/#principles",
  },
  {
    label: "Point of view",
    title: "Reporting is not insight.",
    text: "If an analysis does not change a decision, it is a cost, not an asset.",
    href: "/thinking/",
  },
];

/**
 * The problems Manuel is strongest at. Phrased in the language product and
 * retail-innovation roles use, but only claims his background supports.
 */
export const strengths = [
  {
    title: "Product discovery",
    text: "How customers find, learn about and choose a product. Search, navigation, content and the moments where they give up.",
  },
  {
    title: "Insight into features",
    text: "Turning customer and behavioral evidence into requirements, user stories and shipped changes, not slide decks.",
  },
  {
    title: "Metrics that change course",
    text: "Defining the few metrics that matter, monitoring them, and using them to adjust the roadmap when reality disagrees.",
  },
  {
    title: "Customer experience across markets",
    text: "One experience, many countries: localization, regulation, content and operations without forking the product.",
  },
  {
    title: "Working across the business",
    text: "Engineering, UX, legal, operations, marketing and local markets. Building consensus around evidence and communicating impact.",
  },
];
