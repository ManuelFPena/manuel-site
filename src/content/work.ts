import { priv, todo, type CaseStudy } from "./types";
// Also available: priv("text") for copy shown locally only, and `figures` with `private: true`.

/**
 * Case studies, written as STAR.
 * Sections: Situation (problem) → Context → Task (myRole) → Action (approach) → Key decision → Result (outcome).
 *
 * Rules for this file:
 * - No confidential numbers, internal architecture, stakeholder names or internal URLs.
 * - Sections marked `draft: true` are first drafts for Manuel to confirm or rewrite.
 * - `todo(...)` marks information only Manuel can provide.
 * - Lead with the win. Active voice, "I" for what Manuel owned, numbers where cleared.
 * - Keep it short: one or two sentences, or three bullets, per section.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "home-id",
    index: "01",
    title: "Home.ID: everything after the purchase",
    summary: "The post-purchase home for Philips home appliances, live in 57 countries: one account for warranty, manuals, support, repairs and spare parts, and the content source for our care chatbots.",
    tags: ["Product ownership", "Post-purchase", "Platform", "AI-ready data"],
    role: "Product Owner, Digital Experience (Home.ID), Versuni",
    period: "2025 – present",
    problem: {
      body: "After checkout, the relationship with the owner went dark. Manuals sat in PDFs, warranty proof on paper receipts, and support meant a phone call. Answers differed by country, and we often didn’t know who owned what, so every care contact started from zero.",
    },
    context: {
      body: [
        "Home.ID is the post-purchase site and account for Philips home appliances, run by Versuni under the Philips brand licence. A QR code on every box opens the product’s own page.",
        "57 countries and scaling, each with its own language, legal, content and service-partner needs.",
        "The same product content serves three channels: the website, the HomeID app and our customer care chatbots.",
      ],
    },
    myRole: {
      body: "Own the platform end to end: strategy, roadmap and backlog. Turn behavioural data into product decisions, then measure the result. Deliver with Engineering, UX, Consumer Care, Legal and local markets.",
    },
    approach: {
      body: [
        "For owners: one account for every appliance, shared with the HomeID app. Register in two minutes to confirm the warranty, then get manuals, troubleshooting, FAQs, warranty coverage, repair centres and spare parts on one page per model.",
        "For the business: verified owner data and marketing opt-in, fewer care contacts through self-service, spare-part revenue, and local campaigns that markets run themselves.",
        "For AI: product content and data are structured per model and market, so care chatbots answer from the same source owners see. No separate knowledge base to maintain.",
      ],
    },
    decision: {
      draft: true,
      body: "Build one structured source per product, not one page per channel. Website, app and chatbots all read from the same product data, so a fix or a new market goes live everywhere at once, and the content is ready for AI assistants without a rewrite.",
    },
    outcome: {
      body: [
        "Registrations +36% after adding registration to checkout on Philips webshops in 19 countries; 8 in 10 buyers opt in.",
        "4× more products ready to register and support within two weeks of connecting the central product catalogue.",
        "Search fixed for the ~10% of product searchers who type the full code from the label; a repair-centre map replaced a PDF list; money-back guarantee campaigns live in Poland and the Nordics.",
      ],
    },
    figures: [
      { value: "57", label: "countries, and scaling" },
      { value: "+36%", label: "product registrations from checkout" },
      { value: "4×", label: "more products ready to register" },
    ],
  },
  {
    slug: "product-coverage-pim",
    index: "02",
    title: "Every product, ready to register",
    summary: "4× more products ready to register and support in two weeks, by making the company’s product information system the single source for Home.ID.",
    tags: ["Product data", "Compliance", "Platform"],
    role: "Product Owner, Digital Experience (Home.ID), Versuni",
    period: "2025 – 2026",
    problem: {
      body: "Owners can only register a product or find its manual if Home.ID knows the product. Product data and documents were scattered and duplicated, so many products were missing. That was a legal risk and a consumer-care cost.",
    },
    context: {
      body: [
        "Care and Legal require user documentation for every product sold or supported in the last 15 years.",
        "Home.ID and the HomeID app depend on the same product catalogue, across Europe, APAC, Latin America and the Middle East.",
      ],
    },
    myRole: {
      draft: true,
      body: "Close the coverage gap without thinning the documentation. I framed the problem as coverage, set a staged plan, defined how coverage is measured, and delivered it with engineering sprint by sprint.",
    },
    approach: {
      body: [
        "Extended the existing portal first, to meet the legal obligation quickly.",
        "Made the product information system (PIM) the single source of truth, with a scheduled data fetch.",
        "Measured coverage as breadth (products and locales) plus depth (documents per product), before and after release.",
      ],
    },
    decision: {
      body: "Park the quick fix and invest in the PIM connection. The portal extension already tripled coverage, but it kept product data duplicated and manual. One governed source scales to every region automatically.",
    },
    outcome: {
      body: [
        "4× more products available for registration and support within two weeks of release.",
        "Coverage grew in every region, while documents per product held steady.",
        "Foundation in place to comply across the full product range, online and offline.",
        priv("Finished products covered: 1,319 to 5,275 in two weeks (09 to 23 Feb 2026). Latin America +357%, APAC +261%, Europe +211%. Depth 3.5 to 3.2 documents per product"),
      ],
    },
    figures: [{ value: "4×", label: "more products available for registration and support, within two weeks of release" }],
  },
  {
    slug: "growth-intelligence-revenue-drivers",
    index: "03",
    title: "Growth intelligence: why revenue moved",
    summary: "A price, volume and mix model that explains 100% of each month’s D2C revenue change, by business unit, with the story written out.",
    tags: ["Growth intelligence", "Price-volume-mix", "Revenue analytics"],
    role: "Product Owner, Versuni",
    period: "2026",
    problem: {
      body: "Revenue reports showed how much revenue moved, not why. A weak month can mean fewer orders, deeper discounts or a cheaper mix of products, and each needs a different response. Without the why, reviews debated numbers instead of acting.",
    },
    context: {
      body: [
        "Philips direct-to-consumer webshops across Europe and the US, five business units from coffee to garment care.",
        "Order-level sales data joined to the product master, month by month and week by week.",
        "Part of a growth intelligence notebook I built in Databricks, together with the trading performance matrix.",
      ],
    },
    myRole: {
      body: [
        "Give the trading review one trusted answer to “why did revenue move?”",
        "Built it end to end on my own: data pipelines from the order and product master tables, the model, the charts and the narrative rules, in Python and SQL on Databricks.",
      ],
    },
    approach: {
      body: [
        "Split every month’s revenue change into volume (units sold), price (revenue per unit) and mix (which categories sold), category by category.",
        "Reconciled the three drivers to the actual change, so the numbers hold up in a review.",
        "Wrote a plain-language reading for each driver and combination, so the review starts from the story, not the spreadsheet.",
      ],
    },
    decision: {
      body: "Name one main driver per month instead of showing three numbers. When no driver is at least 25% bigger than the next, call the month balanced and drill down to category or product before drawing conclusions.",
    },
    outcome: {
      body: [
        "100% of each month’s revenue change explained by three drivers.",
        "In a peak sales month it showed the full picture: growth came from volume, discounts took part of it back through price, and a shift to premium products added it back through mix.",
        todo("Who used it and what changed: e.g. monthly trading review, promotion follow-up. Relative indicators only"),
      ],
    },
    figures: [
      { value: "100%", label: "of each month’s revenue change explained" },
      { value: "3", label: "drivers: volume, price and mix" },
    ],
  },
  {
    slug: "growth-intelligence-trading-matrix",
    index: "04",
    title: "Growth intelligence: where to look next",
    summary: "A bubble matrix that points the trading review at the biggest risk, not the biggest swing: growth against revenue share, from country down to product.",
    tags: ["Growth intelligence", "Category growth", "Data visualization"],
    role: "Product Owner, Versuni",
    period: "2026",
    problem: {
      body: "Monthly trading tables listed every country, category and product with a growth rate. Big and small lines looked the same, so attention went to the biggest swing, not the biggest risk.",
    },
    context: {
      body: [
        "Same D2C sales data as the revenue driver model, across countries, business units, categories and products.",
        "Built for the monthly trading review: which markets and products need attention first.",
      ],
    },
    myRole: {
      body: "Help the team decide where to act first. Built it end to end on my own, from the data pipelines to the matrix and the reading guide for the business.",
    },
    approach: {
      body: [
        "Plotted growth against share of revenue, with bubble size for revenue and colour for direction.",
        "Four quadrants, each with its own question: Defend (large, growing), Recover (large, declining), Emerging (small, growing), Review (small, declining).",
        "The same matrix at four levels, from country to business unit, category and product, to move from where to why.",
      ],
    },
    decision: {
      body: "Compare complete months only. A month in progress always looks like a decline and sends the team after problems that aren’t there, so the matrix waits for the month to close.",
    },
    outcome: {
      body: [
        "One view that ranks every line by size and direction, from country down to product.",
        todo("Who uses it and what it changed: e.g. which quadrant or market got action first. Relative indicators only"),
      ],
    },
    figures: [
      { value: "4", label: "quadrants, each with its own action" },
      { value: "4", label: "levels, from country down to product" },
    ],
  },
  {
    slug: "satisfaction-guarantee",
    index: "05",
    title: "A 60-day money-back guarantee, built on registration",
    summary: "The Philips satisfaction guarantee, run through Home.ID: register, check eligibility and claim in one flow. Live in Poland and the Nordics, 97 eligible models.",
    tags: ["Campaigns", "Post-purchase", "Market personalization"],
    role: "Product Owner, Digital Experience (Home.ID), Versuni",
    period: "2026",
    problem: {
      body: "A money-back guarantee only works if claiming is simple and eligibility can be trusted. Handled by email and paper receipts, it was slow for consumers and hard to verify for the business.",
    },
    context: {
      body: [
        "Philips satisfaction guarantee: try an eligible product at home for up to 60 days, return it for a refund if not satisfied.",
        "Live in Poland and the Nordics since September 2026, with 97 eligible models across coffee, garment care, kitchen, air, floor and pet care (Sweden).",
        "Part of market personalization on Home.ID: one platform, offers that differ per market, like extended warranties in Asia.",
      ],
    },
    myRole: {
      draft: true,
      body: "Launch the guarantee in each market on Home.ID. I deployed the campaign landing page, the eligibility rule at product registration, and the claim form.",
    },
    approach: {
      body: [
        "One landing page per market, three steps: log in or create a Home.ID account, register the product, fill in the form.",
        "Eligibility set at registration: when a registered model is on the campaign list, the product is marked eligible and the claim form opens from it.",
        "One form for contact details, store, proof of purchase and marketing consent.",
      ],
    },
    decision: {
      draft: true,
      body: "Make product registration the way into the guarantee, instead of a standalone claim form. Eligibility is checked automatically, the business gets a verified owner and purchase date, and every claim also grows registrations and marketing opt-in.",
    },
    outcome: {
      body: [
        "Live in Poland and the Nordics since September 2026, on the same platform as every other market.",
        "Every claim starts with a registration, so each one adds a verified owner and purchase date.",
        todo("What the campaign drove: claims, registrations or opt-ins. Relative numbers only"),
      ],
    },
    figures: [
      { value: "60", label: "days to try the product at home" },
      { value: "97", label: "eligible models (Sweden)" },
    ],
  },
  {
    slug: "air-filter-1pln",
    index: "06",
    title: "Register the purifier, unlock the filter",
    summary: "A purchase incentive on Home.ID in Poland: buy a Philips air purifier or humidifier, register it, and unlock a nearly free replacement filter. 65 eligible models.",
    tags: ["Campaigns", "Post-purchase", "Market personalization"],
    role: "Product Owner, Digital Experience (Home.ID), Versuni",
    period: "2025",
    problem: {
      body: "Air purifiers and humidifiers only work well with a fresh filter, and many owners never come back to buy one. Once the product leaves the store, the brand also loses the link to its owner.",
    },
    context: {
      body: [
        "Poland, 2025 edition: buy an eligible Philips air purifier or humidifier and claim a voucher for a nearly free replacement filter.",
        "65 eligible air models, mostly purifiers and humidifiers.",
        "Runs on the same Home.ID campaign set-up as the money-back guarantee: one platform, offers that differ per market.",
      ],
    },
    myRole: {
      draft: true,
      body: "Launch the offer in Poland on Home.ID. I deployed the campaign landing page, the eligibility rule at product registration, and the claim form.",
    },
    approach: {
      body: [
        "One landing page, five steps: buy, log in or create a Home.ID account, register the product, fill in the form, get the result by email.",
        "Eligibility set at registration: model and purchase date checked against the campaign list and the purchase window.",
        "Every claim verified within 21 days. A valid claim gets the filter voucher by email.",
      ],
    },
    decision: {
      draft: true,
      body: "Reuse the money-back guarantee pattern instead of building a separate promotion flow. Registration stays the way in, so the business gets a verified owner and purchase date, and the reward brings the owner back for the first filter change.",
    },
    outcome: {
      body: [
        "A second campaign launched on the same pattern, with no new flow to build.",
        "Every claim adds a verified owner and brings them back for the first filter change.",
        todo("What the campaign drove: claims, registrations, opt-ins or filter sales. Relative numbers only"),
      ],
    },
    figures: [
      { value: "65", label: "eligible air purifier and humidifier models" },
      { value: "21", label: "days to verify a claim" },
    ],
  },
  {
    slug: "checkout-auto-registration",
    index: "07",
    title: "Registered at checkout",
    summary: "One tick at checkout registers the product for warranty on Home.ID. Live on Philips webshops in 19 countries: registrations +36%, 8 in 10 buyers opt in.",
    tags: ["Registration", "E-commerce", "Post-purchase"],
    role: "Product Owner, Digital Experience (Home.ID), Versuni",
    period: todo("Year it went live"),
    problem: {
      body: "Registration is how we know who owns which product, and it unlocks warranty and support. But asking people to register later, in a separate step, lost most of them.",
    },
    context: {
      body: [
        "Philips home-appliance webshops in 19 countries: 17 in Europe, plus Singapore and the United States.",
        "Registering on Home.ID confirms the warranty and gives the owner manuals, tips and support for their product.",
      ],
    },
    myRole: {
      draft: true,
      body: "Grow registrations by catching buyers at the moment of purchase. I defined the flow and the hand-off from checkout to Home.ID, and delivered it with the e-commerce and engineering teams.",
    },
    approach: {
      body: [
        "Asked at the moment of purchase: one checkbox at checkout to register the product for warranty.",
        "A ticked box sends the purchased product to Home.ID, which registers it to the buyer.",
        "The buyer finds the product in Home.ID with the warranty already confirmed. No form, no model number to look up.",
      ],
    },
    decision: {
      draft: true,
      body: "An opt-in checkbox, not silent registration of every order. Explicit consent keeps it compliant and trusted, and 8 in 10 buyers still choose it.",
    },
    outcome: {
      body: [
        "Product registrations +36%.",
        "8 in 10 buyers tick the box at checkout.",
        "Live on webshops in 19 countries, from Europe to Singapore and the US.",
      ],
    },
    figures: [
      { value: "+36%", label: "product registrations" },
      { value: "8 in 10", label: "buyers tick the box at checkout" },
      { value: "19", label: "webshops, Europe to Singapore and the US" },
    ],
  },
  {
    slug: "search-product-discovery",
    index: "08",
    title: "Search that reads the label",
    summary: "I found that ~10% of product searchers type the full code from the label, which search couldn’t read. Fixed it at the root instead of with helper text.",
    tags: ["Search", "Behavioural analysis", "Product discovery"],
    role: "Product Owner, Digital Experience (Home.ID), Versuni",
    period: "2026",
    problem: {
      body: "The support homepage is driven by search, but only about one in four searches ended in a click. Many people type the full product code from the label, like NA352/00, while search only understood the short form, NA352.",
    },
    context: {
      body: [
        "Home.ID support homepage, where people look up their appliance by name or product code and get a list of matching products.",
        "Example: typing “BAR” returns 20 products. The Baristina espresso machine (BAR300) comes fourth, behind steam irons whose names mention “6 bar”.",
        "Behavioural analysis of five months of search data, January to May 2026.",
        priv("217K searches started, 167K result views, 53K result clicks; 3,223 of 30,819 product searchers (~10%) typed a code with “/”"),
      ],
    },
    myRole: {
      draft: true,
      body: "Find out why search wasn’t converting, and fix it. I ran the behavioural analysis, wrote the requirements, set the KPIs, and took the change to back-end and front-end engineering.",
    },
    approach: {
      body: [
        "Measured search as a chain: search started, results shown, result clicked.",
        "Looked at what people actually type, not what the system expects.",
        "Checked tracking gaps before trusting the numbers: fewer result views than searches can mean missing events, not missing results.",
      ],
    },
    decision: {
      body: "Don’t patch it with helper text. The quick fix was to tell people to type only the characters before the “/”, but that guidance would be outdated the day full codes work. We changed search to accept every format printed on the label, so users don’t have to adapt to the back end.",
    },
    outcome: {
      body: [
        "Click rate after search has already reached its goal.",
        "Search change planned for Q2 2026, with targets set for Q3.",
        priv("Q3 targets: results shown per search 77% to 85%; click rate after results 32% to 35%"),
      ],
    },
    figures: [{ value: "~10%", label: "of product searchers type the full code with “/”" }],
  },
  {
    slug: "service-center-locator",
    index: "09",
    title: "Find a repair centre near you",
    summary: "A self-service repair map on Home.ID that replaced a PDF list: 108 centres in Italy, then more countries. Fewer calls to consumer care, more appliances repaired.",
    tags: ["Consumer care", "Self-service", "Repair"],
    role: "Product Manager, Versuni",
    period: "2026",
    problem: {
      body: "When an appliance breaks, the first question is: who near me can fix it? The answer was a flat PDF list. Hard to search, so people called consumer care, or gave up and replaced the appliance.",
    },
    context: {
      body: [
        "Part of Home.ID, the post-purchase site for Philips home appliances.",
        "Launched in Italy, with 108 authorised repair centres on one map, then rolled out to other countries.",
        "Every “where can I get this repaired” call is a cost, and a repair the network might not get.",
      ],
    },
    myRole: {
      body: [
        "Turn the PDF into a self-service answer, from problem to rollout.",
        "Structured the repair-centre data: geocoded every address to latitude and longitude.",
        "Designed the whole capability together with front-end. The one thing I didn’t do was write the code.",
      ],
    },
    approach: {
      body: [
        "Replaced the PDF with a map that starts from where the consumer is, with “Find my location”.",
        "One search box for name, address or phone.",
        "Every result ends in an action: call the centre, or get directions.",
      ],
    },
    decision: {
      draft: true,
      body: "Send people straight to the repairer instead of building a booking flow first. It shipped faster, kept centres in control of their own calendars, and cut a step between the consumer and the fix.",
    },
    outcome: {
      draft: true,
      body: [
        "Engagement up: traffic, interactions and time on page grew, lifting the engagement rate.",
        "Cost: a self-service answer to a question that used to need a call.",
        "Repair: a visible network sends more work to authorised centres, which makes repairing an easier choice than replacing.",
      ],
    },
    figures: [{ value: "108", label: "repair centres on the map in Italy" }],
  },
  {
    slug: "app-user-states",
    index: "10",
    title: "Who actually uses the app",
    summary: "A six-state framework for the HomeID app that showed connected-appliance owners are 4× more likely to be loyal. Loyal users +21% year on year.",
    tags: ["App analytics", "Retention", "Segmentation"],
    role: "Sr. Insights Squad Manager D2C, Versuni",
    period: "2024 – 2025",
    problem: {
      body: "The HomeID app base kept growing, but most users had not opened it in the last 30 days. One “users” number hid who was leaving, who was new and who was loyal, so every campaign went to everyone.",
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
        "Show who really uses the app, and give each group a clear action.",
        "The analysis was mine end to end: data, measurement design, segmentation and the final readout.",
        "I built the user-state framework and reported the monthly shifts to product, CRM and market teams.",
      ],
    },
    approach: {
      body: [
        "Six states by recency and frequency of use: churned, unengaged, new, re-engaged, engaged and loyal.",
        "Each state gets an objective, a set of actions and its own success metrics.",
        "Tracked how users move between states every month, by market and by product owned.",
      ],
    },
    decision: {
      draft: true,
      body: "Treat product registration and connectivity as engagement drivers, not admin. Owners of connected appliances were far more likely to be loyal, so we pushed registration and marketing opt-in instead of blanket campaigns, and sized win-back by the churned users we could still reach.",
    },
    outcome: {
      body: [
        "Year on year (Nov 2025 vs Nov 2024): loyal users +21%, engaged +11%, activated +14%.",
        "Connected-appliance owners 4× more likely to be loyal.",
        "A shared language for the app base: product, CRM and markets plan against the same six states.",
        priv("Loyal share: 6% of all users vs 25% of connected-airfryer owners; churned 71% vs 44%"),
      ],
    },
    figures: [
      { value: "+21%", label: "loyal users, year on year" },
      { value: "4×", label: "more likely to be loyal: connected-appliance owners" },
      { value: "6", label: "user states, from churned to loyal" },
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
