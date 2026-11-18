import { priv, todo, type CaseStudy } from "./types";
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
    slug: "home-id",
    index: "01",
    title: "Home.ID: everything after the purchase",
    summary: "The post-purchase platform for Philips home appliances: register, get answers, fix a problem, find a repair. One platform, many countries.",
    tags: ["Product ownership", "Post-purchase", "Platform"],
    role: "Product Owner, Digital Experience (Home.ID), Versuni",
    period: "2025 \u2013 present",
    problem: {
      body: "After buying an appliance, people need answers fast: how to use it, how to fix it, what the warranty covers, who can repair it. Those answers sat across many systems and differed by country.",
    },
    context: {
      body: [
        "Home.ID is the post-purchase site and account for Philips home appliances, run by Versuni under the Philips brand licence.",
        "Every box and manual points to it: a QR code on the packaging opens the product's own page.",
        "57 countries and scaling, each with its own language, legal, content and service-partner needs.",
      ],
    },
    myRole: {
      body: "I own strategy, roadmap and backlog, and bring market, legal, content and engineering needs into one roadmap. I deliver with Engineering, UX, Consumer Care, Legal and local markets.",
    },
    approach: {
      draft: true,
      body: [
        "One account for every appliance, shared with the HomeID app. Register in two minutes to confirm the warranty.",
        "One page per model: answers, troubleshooting, spare parts, repair booking, warranty and contact (call or WhatsApp).",
        "One global platform with an explicit line between global and local: language, legal and service partners vary, the product doesn't.",
      ],
    },
    decision: {
      body: todo("One meaningful product decision: e.g. what to standardize versus localize, the options, the trade-off, and why"),
    },
    outcome: {
      body: todo("What changed for consumers or the business, e.g. self-service resolution, registrations, faster market launches. Public-safe or relative indicators only"),
    },
    figures: [
      { value: "57", label: "countries, and scaling" },
    ],
  },
  {
    slug: "search-product-discovery",
    index: "02",
    title: "Search that reads the label",
    summary: "Making Home.ID support search accept product codes the way people type them: straight from the label.",
    tags: ["Search", "Behavioural analysis", "Product discovery"],
    role: "Product Owner, Digital Experience (Home.ID), Versuni",
    period: "2026",
    problem: {
      body: "The support homepage is driven by search, but only about one in four searches ended in a click. Many people type the full product code from the label, like NA352/00, while search only understood the short form, NA352.",
    },
    context: {
      body: [
        "Home.ID support homepage, where people look up their appliance by name or product code and get a list of matching products.",
        "Example: typing \u201cBAR\u201d returns 20 products. The Baristina espresso machine (BAR300) comes fourth, behind steam irons whose names mention \u201c6 bar\u201d.",
        "Behavioural analysis of five months of search data, January to May 2026.",
        priv("217K searches started, 167K result views, 53K result clicks; 3,223 of 30,819 product searchers (~10%) typed a code with \u201c/\u201d"),
      ],
    },
    myRole: {
      draft: true,
      body: "I ran the behavioural analysis, wrote the requirements, set the KPIs, and took the change to back-end and front-end engineering.",
    },
    approach: {
      body: [
        "Measure search as a chain: search started, results shown, result clicked.",
        "Look at what people actually type, not what the system expects.",
        "Check tracking gaps before trusting the numbers: fewer result views than searches can mean missing events, not missing results.",
      ],
    },
    decision: {
      body: "Don\u2019t patch it with helper text. The quick fix was to tell people to type only the characters before the \u201c/\u201d, but that guidance would be outdated the day full codes work. We changed search to accept every format printed on the label, so users don\u2019t have to adapt to the back end.",
    },
    outcome: {
      body: [
        "Search change planned for Q2 2026, with targets set for Q3.",
        "Click rate after search has already reached its goal.",
        priv("Q3 targets: results shown per search 77% to 85%; click rate after results 32% to 35%"),
      ],
    },
    figures: [{ value: "~10%", label: "of product searchers type the full code with \u201c/\u201d" }],
  },
  {
    slug: "service-center-locator",
    index: "03",
    title: "Find a repair centre near you",
    summary: "A self-service repair map on Home.ID: fewer calls to consumer care, more appliances repaired.",
    tags: ["Consumer care", "Self-service", "Repair"],
    role: "Product Manager, Versuni",
    period: todo("Year it launched"),
    problem: {
      body: "When an appliance breaks, the first question is: who near me can fix it? The answer was a flat PDF list. Hard to search, so people called consumer care, or gave up and replaced it.",
    },
    context: {
      body: [
        "Part of Home.ID, the post-purchase site for Philips home appliances.",
        "Launched in Italy, with 108 authorised repair centres on one map, then rolled out to other countries.",
        todo("Optional: number of countries live"),
        "Every \u201cwhere can I get this repaired\u201d call is a cost, and a repair the network might not get.",
      ],
    },
    myRole: {
      body: [
        "Product Manager, from problem to rollout.",
        "Structured the repair-centre data: geocoded every address to latitude and longitude.",
        "Designed the whole capability together with front-end. The one thing I didn't do was write the code.",
      ],
    },
    approach: {
      body: [
        "Replace the PDF with a map: start from where the consumer is, with \u201cFind my location\u201d.",
        "One search box for name, address or phone.",
        "End every result in an action: call the centre, or get directions.",
      ],
    },
    decision: {
      draft: true,
      body: "Send people straight to the repairer instead of building a booking flow first. It shipped faster, kept centres in control of their own calendars, and cut a step between the consumer and the fix.",
    },
    outcome: {
      draft: true,
      body: [
        "Cost: a self-service answer to a question that used to need a call.",
        "Repair: a visible network sends more work to authorised centres, which makes repairing an easier choice than replacing.",
        "Engagement: traffic, interactions and time on page grew, lifting the engagement rate.",
      ],
    },
    figures: [{ value: "108", label: "repair centres on the map in Italy" }],
  },
  {
    slug: "app-user-states",
    index: "04",
    title: "Who actually uses the app",
    summary: "A user-state framework for the HomeID app: from churned to loyal, each group with its own action and metric.",
    tags: ["App analytics", "Retention", "Segmentation"],
    role: "Sr. Insights Squad Manager D2C, Versuni",
    period: "2024 \u2013 2025",
    problem: {
      body: "The HomeID app base kept growing, but most users had not opened it in the last 30 days. One \u201cusers\u201d number hid who was leaving, who was new and who was loyal, so every campaign went to everyone.",
    },
    context: {
      body: [
        "HomeID app for Philips kitchen appliances, with in-app shop launches in France and Germany in 2024.",
        "Built on first-party data from users who opted in to analytics.",
        priv("Base of 3.4M analytics opt-in users (Sep 2024), 85% with no session in the last 30 days"),
      ],
    },
    myRole: {
      body: [
        "The analysis was mine, end to end: from pulling the data to the final readout.",
        "I designed the measurement and the segmentation.",
        "I built the user-state framework for the app, and reported the monthly shifts to product, CRM and market teams.",
      ],
    },
    approach: {
      body: [
        "Six states by recency and frequency of use: churned, unengaged, new, re-engaged, engaged and loyal.",
        "Each state gets an objective, a set of actions and its own success metrics.",
        "Track how users move between states every month, by market and by product owned.",
      ],
    },
    decision: {
      draft: true,
      body: "Treat product registration and connectivity as engagement drivers, not admin. Owners of connected appliances were far more likely to be loyal, so we pushed registration and marketing opt-in instead of blanket campaigns, and sized win-back by the churned users we could still reach.",
    },
    outcome: {
      body: [
        "A shared language for the app base: product, CRM and markets plan against the same six states.",
        priv("Loyal share: 6% of all users vs 25% of connected-airfryer owners; churned 71% vs 44%"),
        "Year on year (Nov 2025 vs Nov 2024): loyal users +21%, engaged +11%, activated +14%.",
      ],
    },
    figures: [
      { value: "6", label: "user states, from churned to loyal" },
      { value: "4\u00d7", label: "more likely to be loyal: connected-appliance owners" },
    ],
  },
  {
    slug: "product-coverage-pim",
    index: "05",
    title: "Every product, ready to register",
    summary: "Connecting Home.ID to the company\u2019s product information system: four times the products covered, without thinning the documentation.",
    tags: ["Product data", "Compliance", "Platform"],
    role: "Product Owner, Digital Experience (Home.ID), Versuni",
    period: "2025 \u2013 2026",
    problem: {
      body: "People can only register a product or find its manual if Home.ID knows the product. Product data and documents were scattered and duplicated, so many products were missing: a legal and consumer-care risk.",
    },
    context: {
      body: [
        "Care and Legal require user documentation for every product sold or supported in the last 15 years.",
        "Home.ID and the HomeID app depend on the same product catalogue, across Europe, APAC, Latin America and the Middle East.",
      ],
    },
    myRole: {
      draft: true,
      body: "Product Owner: framed the problem as coverage, set the staged plan, defined how coverage is measured, and delivered it with engineering sprint by sprint.",
    },
    approach: {
      body: [
        "Extend the existing portal first, to meet the legal obligation quickly.",
        "Make the product information system (PIM) the single source of truth, with a scheduled data fetch.",
        "Measure coverage as breadth (products and locales) plus depth (documents per product), before and after release.",
      ],
    },
    decision: {
      body: "Park the quick fix and invest in the PIM connection. The portal extension already tripled coverage, but it kept product data duplicated and manual. One governed source scales to every region automatically.",
    },
    outcome: {
      body: [
        "Coverage grew in every region, while documents per product held steady.",
        "Foundation in place for compliance with the full product range, online and offline.",
        priv("Finished products covered: 1,319 to 5,275 in two weeks (09 to 23 Feb 2026). Latin America +357%, APAC +261%, Europe +211%. Depth 3.5 to 3.2 documents per product"),
      ],
    },
    figures: [{ value: "4\u00d7", label: "more products available for registration and support, within two weeks of release" }],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
