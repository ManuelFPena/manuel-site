import { todo, type Copy, type Todo } from "./types";

export const site = {
  name: "Manuel Fernández",
  role: "Product Owner, Digital Experience (Home.ID) at Versuni",
  location: "Amsterdam",
  /** Set NEXT_PUBLIC_SITE_URL in production so canonical and OG URLs are absolute. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  title: "Manuel Fernández · Product, e-commerce and analytics",
  description:
    "Product Owner, Digital Experience (Home.ID) at Versuni. Product Manager working where data, systems and growth meet. Before: data products at Versuni, digital analytics at adidas and Under Armour. Amsterdam.",
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
  github: string | Todo;
  cv: string | Todo;
} = {
  email: "ma.fernanp@gmail.com",
  linkedin: "https://www.linkedin.com/in/manuelfepe",
  github: "https://github.com/ManuelFPena",
  cv: todo("Optional: link to a PDF CV"),
};

/** The central narrative, used on Home and About. */
export const evolution = [
  { step: "01", label: "Business intelligence", text: "Performance and segmentation analytics at Banreservas." },
  { step: "02", label: "Digital analytics", text: "DTC revenue at Under Armour; app lifecycle and user states at adidas." },
  { step: "03", label: "Data products", text: "Product Manager for internal data products at Versuni: models, KPIs, tooling." },
  { step: "04", label: "Product ownership", text: "Product Owner for Home.ID, the post-purchase platform in about 40 countries." },
];

export const principles = [
  { title: "Start with the problem.", text: "Agree who is stuck and what it costs before choosing features." },
  { title: "Data should change the plan.", text: "If it doesn't move a priority, it's reporting." },
  { title: "Understand the system.", text: "APIs, data flows, market rules. Know how it really works." },
  { title: "Make complexity shippable.", text: "Break ambiguity into decisions, owners and increments." },
  { title: "Shipping is the midpoint.", text: "Every release needs a way to tell if it worked." },
];

export const fluency: { group: string; items: Copy[] }[] = [
  {
    group: "Methods",
    items: [
      "Funnels and conversion",
      "Segmentation and cohorts",
      "A/B tests, pre/post, diff-in-diff",
      "Data modeling and KPI frameworks",
      "Lifecycle segmentation and user states",
      "Attribution",
      "Transactional and geo analysis",
      "P&L and finance analysis",
    ],
  },
  {
    group: "Platforms",
    items: ["CDP and CRM", "REST APIs and OpenAPI", "AWS", "CMS and content platforms", "Data pipelines"],
  },
  {
    group: "Data & tools",
    items: ["SQL", "Python", "GA4", "Adobe Analytics", "Amplitude", "AppsFlyer", "BigQuery", "Databricks", "Athena and S3", "Power BI", "SAP Datasphere"],
  },
];
