import { todo, type CaseStudy } from "./types";
// Also available: priv("text") for copy shown locally only, and `figures` with `private: true`.

/**
 * Case studies. Structure: Problem → Context → My role → Approach → Decision → Outcome.
 *
 * Rules for this file:
 * - No confidential numbers, internal architecture, stakeholder names or internal URLs.
 * - Sections marked `draft: true` are first drafts for Manuel to confirm or rewrite.
 * - `todo(...)` marks information only Manuel can provide.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "global-consumer-care-platform",
    index: "01",
    title: "A global consumer-care platform",
    summary:
      "Product ownership of Home.ID, the post-purchase support experience for Philips-branded domestic appliances.",
    tags: ["Product ownership", "Consumer care", "Platform", "Localization"],
    role: "Product Owner",
    period: todo("Years, e.g. 2023 to present"),
    problem: {
      body: "After buying an appliance, people need answers fast: how to use it, fix it, register it, claim warranty or reach a person. The information they need sits across many systems and differs by country.",
    },
    context: {
      body: [
        "One platform serving many markets and product categories.",
        "Covers product documentation, FAQs, troubleshooting, contact channels, warranty and registration.",
        "Depends on integrations with content, product data and service systems.",
        todo("Optional: public-safe scale indicators, e.g. number of markets or languages"),
      ],
    },
    myRole: {
      body: "I own strategy, roadmap and backlog. I turn consumer, care and market needs into requirements, and work with Engineering, UX, Consumer Care, Service, Legal and local markets to deliver them.",
    },
    approach: {
      draft: true,
      body: [
        "Map the post-purchase journey from what the consumer is trying to do, not from how the organization is structured.",
        "Treat content, integrations and data flows as product surface, not plumbing.",
        "Agree how success is measured before building, so releases can be evaluated.",
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
    summary:
      "Understanding how consumers search, what they see, what they click, and where discovery quietly fails.",
    tags: ["Product discovery", "Search analytics", "Customer insight"],
    role: todo("Your role on this work"),
    period: todo("Years"),
    problem: {
      body: "Search is where intent is most explicit. When it fails, it fails quietly. The consumer does not complain, they leave.",
    },
    context: {
      body: todo("Where this happened: which site or journey, at what scale (public-safe)"),
    },
    myRole: {
      body: todo("What you owned: the analysis, the measurement design, the recommendations"),
    },
    approach: {
      body: [
        "Treat search as a chain, not a single metric.",
        "What do consumers search for?",
        "Do results actually render, and are they relevant?",
        "What do consumers interact with next?",
        "Where does the chain break, and for whom?",
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
    summary:
      "Using behavioral, funnel, search and commercial data to find friction and opportunity across large-scale D2C journeys.",
    tags: ["D2C e-commerce", "Funnel analysis", "Experimentation", "Customer insight"],
    role: todo("Confirm exact title, e.g. Lead, D2C E-commerce Insights & Analytics"),
    period: todo("Years"),
    problem: {
      body: "Large D2C journeys produce plenty of data and few clear answers. The hard part is knowing which friction matters, and what to change because of it.",
    },
    context: {
      body: "D2C e-commerce across millions of consumer sessions, spanning funnels, campaigns, CRM and commercial performance.",
    },
    myRole: {
      body: "I led D2C e-commerce insights and analytics, connecting behavioral and commercial data to the teams who could act on it.",
    },
    approach: {
      body: [
        "Funnel and drop-off analysis to locate where journeys break.",
        "Segmentation to see which consumers behave differently, and why.",
        "Experimentation to test changes instead of debating them.",
        "Attribution and marketing-effectiveness work to understand what actually drives results.",
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
    summary:
      "Balancing one common platform with market-specific content, localization, regulation, infrastructure and consumer needs.",
    tags: ["Platform strategy", "Localization", "Compliance", "Market enablement"],
    role: "Product Owner",
    period: todo("Years"),
    problem: {
      body: "Every market has its own language, content, regulation and expectations. Fork the platform for each one and you lose scale. Ignore the differences and you lose the market.",
    },
    context: {
      body: "A global consumer-care platform rolled out across countries with different legal, content and infrastructure requirements.",
    },
    myRole: {
      body: "Bring market, legal, content and engineering needs into one set of requirements and one roadmap.",
    },
    approach: {
      draft: true,
      body: [
        "Separate what must be global from what must be local, and make that line explicit.",
        "Capture market requirements in a comparable format, so trade-offs are visible.",
        "Bring compliance and localization in at the requirements stage, not at launch.",
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
