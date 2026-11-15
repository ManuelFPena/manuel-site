import type { Copy } from "./types";

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
 * Grouped by chapter of the story rather than as a flat CV list. Newest first.
 * Source: Manuel's CV (CV_MFP.pdf, Nov 2026). Keep titles and dates exactly as on the CV.
 */
export const chapters: Chapter[] = [
  {
    label: "Product ownership",
    theme: "Owning a commerce product domain, end to end.",
    roles: [
      {
        period: "Jul 2025 – present",
        title: "Global Product Owner, E-Commerce Martech Measurement",
        org: "Versuni (formerly Philips Domestic Appliances) · Amsterdam",
        line: "Own the own-commerce martech domain: onboarding, retention and long-term customer value. Connect app, CRM and e-commerce signals into one customer view and channel attribution.",
        focus: ["Martech", "Attribution", "Lifecycle", "Experimentation"],
      },
    ],
  },
  {
    label: "Data products & analytics",
    theme: "Turning behavior into decisions, then into products.",
    roles: [
      {
        period: "May 2023 – Jun 2025",
        title: "Sr. Insights Squad Manager D2C",
        org: "Versuni (formerly Philips Domestic Appliances) · Amsterdam",
        line: "Led a cross-functional analytics and data product squad for D2C growth across EU markets. Product Manager for internal data products: data models, KPIs and tooling.",
        focus: ["Data products", "Measurement frameworks", "Lifecycle segmentation", "D2C growth"],
      },
      {
        period: "Mar 2022 – Apr 2023",
        title: "Senior Decision Scientist, Digital Analytics & Data Products",
        org: "adidas · Amsterdam",
        line: "Turned behavioral and commercial data into marketing and product strategy for the Growth Revenue Development team. Built standard measurement for campaigns and promotions across markets.",
        focus: ["Campaign measurement", "Assortment", "KPIs", "Dashboards"],
      },
      {
        period: "Mar 2021 – Feb 2022",
        title: "Manager Digital Analytics, Product Analytics",
        org: "adidas · Amsterdam",
        line: "Led lifecycle and personalization analysis for the adidas app. Designed user segmentation and user-state frameworks in the CDP.",
        focus: ["App analytics", "CDP", "User states", "Retention"],
      },
      {
        period: "Feb 2019 – Feb 2021",
        title: "Digital Analytics Sr. Analyst",
        org: "Under Armour · Amsterdam",
        line: "Owned the analytics roadmap for the DTC digital revenue team.",
        focus: ["DTC", "Analytics roadmap", "ROI"],
      },
    ],
  },
  {
    label: "Foundations",
    theme: "Business intelligence, performance and segmentation.",
    roles: [
      {
        period: "Jun 2015 – Jul 2018",
        title: "Lead Business Intelligence Analyst",
        org: "Banreservas · Santo Domingo",
        line: "Led a small BI team delivering performance and segmentation analytics, and scaled BI infrastructure with external partners.",
        focus: ["Business intelligence", "Segmentation", "Team lead"],
      },
    ],
  },
];

export const education: { period: Copy; title: Copy; org: Copy }[] = [
  {
    period: "2010 – 2012",
    title: "MBA, Information Systems & Economics",
    org: "EAE Business School · Madrid",
  },
  {
    period: "2004 – 2009",
    title: "Double Bachelor of Science, Business Administration & Marketing",
    org: "Rochester Institute of Technology · Rochester, NY",
  },
];

export const languages = ["Spanish (native)", "English (native)", "Italian (C1)", "Dutch (B1)"];
