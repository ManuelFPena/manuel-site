import type { Copy } from "./types";

export type Role = {
  period: Copy;
  title: Copy;
  org: Copy;
  /** One-line summary, used when there are no bullets. */
  line?: Copy;
  /** Bullets, kept in step with the CV. */
  bullets?: Copy[];
  focus: string[];
};

export type Chapter = {
  label: string;
  theme: string;
  roles: Role[];
};

/**
 * Grouped by chapter of the story rather than as a flat CV list. Newest first.
 * Source: Manuel's CV (CV_Manuel_Fernandez.pdf, 18 Nov 2026). Keep titles, dates and bullets in step with the CV.
 */
export const chapters: Chapter[] = [
  {
    label: "Product ownership",
    theme: "Owning the post-purchase experience, end to end.",
    roles: [
      {
        period: "Jul 2025 – present",
        title: "Product Owner, Digital Experience (Home.ID)",
        org: "Versuni (formerly Philips Domestic Appliances) · Amsterdam",
        bullets: [
          "Product owner for Home.ID, the post-purchase platform for Philips home appliances in about 40 countries: registration, support, search and repair.",
          "Connected Home.ID to the central product catalog: 4× more products available for registration and support within two weeks of release.",
          "Replaced a PDF list of repair centers with a location-based map, designed to reduce care contacts and steer consumers to repair. Launched in Italy, then rolled out further.",
          "Found that about 10% of product searchers type the full code from the label, and defined the change for search to accept every format.",
          "Work with engineering, UX, Care, Legal and local markets, using behavioral data and experiments to guide product decisions.",
        ],
        focus: ["Post-purchase", "Product data", "Search", "Repair"],
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
        bullets: [
          "Ran a cross-functional analytics and data product squad supporting D2C growth across EU markets.",
          "Product Manager for internal data products: data models, KPIs and tooling for lifecycle, activation and monetization.",
          "Built the HomeID app user-state framework (churned to loyal) end to end. It showed connected-appliance owners were 4× more likely to be loyal, shifting focus to registration and opt-in; loyal users grew 21% year on year.",
          "Defined measurement frameworks and experiments to evaluate campaign and lifecycle performance across owned and paid channels.",
          "Quantified the business impact of data initiatives (conversion, opt-in growth, revenue) and aligned commercial, CRM and marketing stakeholders.",
          "Turned fragmented commercial, CRM and behavioral data into unified reporting used across marketing, product and business teams.",
        ],
        focus: ["Data products", "Measurement frameworks", "User states", "D2C growth"],
      },
      {
        period: "Mar 2022 – Apr 2023",
        title: "Senior Decision Scientist, Digital Analytics & Data Products",
        org: "adidas · Amsterdam",
        bullets: [
          "Turned behavioral and commercial data into marketing and product strategy for the Growth Revenue Development team.",
          "Built standard measurement for campaign and seasonal promotion performance across markets.",
          "Identified assortment and availability gaps in key categories that opened revenue growth.",
          "Defined performance KPIs and campaign dashboards with marketing, tech and business teams.",
        ],
        focus: ["Campaign measurement", "Assortment", "KPIs", "Dashboards"],
      },
      {
        period: "Mar 2021 – Feb 2022",
        title: "Manager Digital Analytics, Product Analytics",
        org: "adidas · Amsterdam",
        bullets: [
          "Led lifecycle and personalization analysis for the adidas app, designing segmentation to improve retention and reactivation.",
          "Designed and implemented user-state frameworks in the Customer Data Platform (CDP) for personalization and lifecycle tracking.",
          "Delivered funnel and conversion insights that shaped the in-app shopping experience.",
        ],
        focus: ["App analytics", "CDP", "User states", "Retention"],
      },
      {
        period: "Feb 2019 – Feb 2021",
        title: "Digital Analytics Sr. Analyst",
        org: "Under Armour · Amsterdam",
        bullets: [
          "Owned the analytics roadmap for the DTC digital revenue team.",
          "Delivered reporting and dashboards focused on ROI and optimization.",
        ],
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
        bullets: [
          "Led a small BI team delivering performance and segmentation analytics.",
          "Worked with external partners to scale BI infrastructure and insights.",
        ],
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
