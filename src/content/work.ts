import { todo, type CaseStudy } from "./types";
// Also available: priv("text") for copy shown locally only, and `figures` with `private: true`.

/**
 * Case studies. Structure: Problem → Context → My role → Approach → Decision → Outcome.
 *
 * Rules for this file:
 * - No confidential numbers, internal architecture, stakeholder names or internal URLs.
 * - Sections marked `draft: true` are first drafts for Manuel to confirm or rewrite.
 * - `todo(...)` marks information only Manuel can provide.
 * - Keep it short: one or two sentences, or three bullets, per section.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "global-consumer-care-platform",
    index: "01",
    title: "A global consumer-care platform",
    summary: "Owning Home.ID: post-purchase support for Philips appliances, across many markets.",
    tags: ["Product ownership", "Consumer care", "Platform"],
    role: "Product Owner",
    period: todo("Years, e.g. 2023 to present"),
    problem: {
      body: "After buying an appliance, people need answers fast. The answers sit across many systems and differ by country.",
    },
    context: {
      body: [
        "One platform, many markets and product categories.",
        "Manuals, FAQs, troubleshooting, contact, warranty and registration.",
        todo("Optional: public-safe scale, e.g. number of markets or languages"),
      ],
    },
    myRole: {
      body: "I own strategy, roadmap and backlog, and deliver with Engineering, UX, Consumer Care, Legal and local markets.",
    },
    approach: {
      draft: true,
      body: [
        "Map the journey by what the consumer is trying to do.",
        "Treat content and integrations as product, not plumbing.",
        "Agree how success is measured before building.",
      ],
    },
    decision: {
      body: todo("One meaningful product decision: the options, the trade-off, and why you chose what you did"),
    },
    outcome: {
      body: todo("What changed for consumers or the business. Use public-safe or relative indicators only"),
    },
    // Example only: shows how figures render. Private ones appear locally and never in a build.
    figures: [{ value: "00", label: "Example figure: replace or delete", private: true }],
  },
  {
    slug: "search-product-discovery",
    index: "02",
    title: "Product discovery & search",
    summary: "Finding where on-site search quietly fails, and what to fix.",
    tags: ["Product discovery", "Search analytics", "Customer insight"],
    role: todo("Your role on this work"),
    period: todo("Years"),
    problem: {
      body: "Search is where intent is clearest. When it fails, people don't complain. They leave.",
    },
    context: {
      body: todo("Where this happened: which site or journey, at what scale (public-safe)"),
    },
    myRole: {
      body: todo("What you owned: the analysis, the measurement design, the recommendations"),
    },
    approach: {
      body: [
        "Treat search as a chain: query, results, next click.",
        "Check results actually render and are relevant.",
        "Find where the chain breaks, and for whom.",
      ],
    },
    decision: {
      body: todo("What you recommended or changed based on the findings"),
    },
    outcome: {
      body: todo("Effect on discovery or conversion. Public-safe or relative indicators only"),
    },
  },
  {
    slug: "ecommerce-analytics-optimization",
    index: "03",
    title: "E-commerce analytics & optimization",
    summary: "Finding the friction that matters in large D2C journeys.",
    tags: ["D2C e-commerce", "Funnel analysis", "Experimentation"],
    role: todo("Confirm exact title, e.g. Lead, D2C E-commerce Insights & Analytics"),
    period: todo("Years"),
    problem: {
      body: "Large D2C journeys produce lots of data and few clear answers. The hard part is knowing which friction matters.",
    },
    context: {
      body: "D2C e-commerce across millions of sessions: funnels, campaigns, CRM and commercial performance.",
    },
    myRole: {
      body: "I led D2C insights and analytics, connecting behavioral and commercial data to the teams who could act.",
    },
    approach: {
      body: [
        "Funnel analysis to find where journeys break.",
        "Segmentation to see who behaves differently.",
        "Experiments to test changes instead of debating them.",
      ],
    },
    decision: {
      body: todo("An example where the analysis changed a priority or a plan"),
    },
    outcome: {
      body: todo("What changed as a result. Public-safe or relative indicators only"),
    },
  },
  {
    slug: "global-platform-market-enablement",
    index: "04",
    title: "Global platform, local markets",
    summary: "One platform, many markets: what to standardize and what to localize.",
    tags: ["Platform strategy", "Localization", "Compliance"],
    role: "Product Owner",
    period: todo("Years"),
    problem: {
      body: "Fork the platform per market and you lose scale. Ignore local differences and you lose the market.",
    },
    context: {
      body: "A consumer-care platform rolled out across countries with different legal, content and infrastructure needs.",
    },
    myRole: {
      body: "Bring market, legal, content and engineering needs into one roadmap.",
    },
    approach: {
      draft: true,
      body: [
        "Make the global versus local line explicit.",
        "Capture market requirements in one comparable format.",
        "Bring compliance and localization in at requirements, not launch.",
      ],
    },
    decision: {
      body: todo("A decision about what to standardize versus localize, and the reasoning"),
    },
    outcome: {
      body: todo("What this enabled, e.g. faster market launches. Public-safe indicators only"),
    },
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
