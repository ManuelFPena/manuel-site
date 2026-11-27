import type { StaticImageData } from "next/image";
import fieldStudy from "../../public/projects/visual-instruments-field-study.jpg";
import sequencer from "../../public/projects/visual-instruments-sequencer.jpg";
import serviceCenters from "../../public/projects/service-center-locator.jpg";
import homeIdLanding from "../../public/projects/home-id-landing.jpg";
import appUserStates from "../../public/projects/app-user-states.jpg";
import productCoverage from "../../public/projects/product-coverage.jpg";
import searchLabel from "../../public/projects/search-label.jpg";
import satisfactionGuarantee from "../../public/projects/satisfaction-guarantee.jpg";
import mapalab from "../../public/projects/mapalab.jpg";
import mapalabCover from "../../public/projects/mapalab-cover.jpg";
import mapalabCommand from "../../public/projects/screens/mapalab-command-center.jpg";
import mapalabPositions from "../../public/projects/screens/mapalab-positions.jpg";
import mapalabFlow from "../../public/projects/screens/mapalab-team-flow.jpg";
import mapalabTeam from "../../public/projects/screens/mapalab-team.jpg";
import growthDrivers from "../../public/projects/growth-why-revenue-moved.jpg";
import growthMatrix from "../../public/projects/growth-where-to-look.jpg";
import airFilter from "../../public/projects/air-filter-1pln.jpg";
import checkoutAutoRegistration from "../../public/projects/checkout-auto-registration.jpg";
import { todo, type CaseSection, type Copy } from "./types";
import { caseStudies } from "./work";

/**
 * Everything shown in the Selected work grid.
 *
 * - "work": commercial case studies. Their full content lives in work.ts.
 * - "personal": personal / fun projects, defined below with a lighter page.
 *
 * Covers: a screenshot (`image`) or, until one exists, a generated cover (`tone`).
 */
export type ProjectKind = "work" | "personal";

export const kindLabel: Record<ProjectKind, string> = {
  work: "Work",
  personal: "Personal / fun project",
};

/** Colour pairs for generated covers. Kept muted so they sit next to real screenshots. */
export type CoverTone = "green" | "sand" | "clay" | "ink";

export type ProjectCard = {
  slug: string;
  kind: ProjectKind;
  title: string;
  summary: string;
  year?: Copy;
  image?: { src: StaticImageData; alt: string };
  tone?: CoverTone;
  /** Short word or two drawn large on a generated cover. */
  mark?: string;
  /** A live, animated cover instead of an image. */
  interactive?: "book-of-sauces" | "visual-instruments";
};

export type PersonalProject = ProjectCard & {
  kind: "personal";
  tags: string[];
  /** Short sections, in order. Same body rules as case studies: a sentence or a few bullets. */
  sections: { label: string; body: CaseSection["body"]; draft?: boolean }[];
  /** Extra screenshots shown under the sections. */
  /** `wide`: full width and uncropped, for screenshots with a lot of detail. */
  gallery?: { src: StaticImageData; alt: string; caption: string; wide?: boolean; /** Shows the image in a macOS app window with this title. */ window?: string }[];
  link?: { href: string; label: string };
  /** A working version of the project embedded on its page. */
  embed?: "book-of-sauces";
};

export const personalProjects: PersonalProject[] = [
  {
    slug: "visual-instruments",
    kind: "personal",
    title: "Visual instruments",
    summary: "Small browser instruments where sound and image move together. Knobs, steps and particles.",
    year: "2025",
    image: { src: fieldStudy, alt: "Field Study: a tape-deck panel with four knobs driving a generative particle field" },
    interactive: "visual-instruments",
    tags: ["Creative coding", "Audio", "Generative visuals"],
    sections: [
      {
        label: "What it is",
        body: "A set of instruments that run in the browser. You play them, and the visuals react to the sound.",
      },
      {
        label: "What I built",
        body: [
          "Field Study: a tape deck with speed, delay, high-pass and low-pass knobs. The audio drives a field of 3,000 particles.",
          "Step sequencer: 16-step drums and melody, a chord engine, 10 scales and a delay, reverb, pitch and chorus rack.",
        ],
      },
      {
        label: "Why",
        draft: true,
        body: "To learn by building, and to practise product thinking at a tiny scale: one file, no installs, play in seconds.",
      },
      { label: "Built with", body: "p5.js, Tone.js, Web Audio API, plain HTML and JavaScript." },
    ],
    gallery: [
      { src: fieldStudy, alt: "Field Study particle field with tape-deck controls", caption: "Field Study" },
      { src: sequencer, alt: "Step sequencer with drum, note and chord rows and an effects rack", caption: "Step sequencer" },
    ],
  },
  {
    slug: "book-of-sauces",
    kind: "personal",
    title: "The Book of Sauces",
    summary: "Sauces of the world, connected by the ingredients they share. An interactive map.",
    year: "2026",
    interactive: "book-of-sauces",
    embed: "book-of-sauces",
    tags: ["Data visualization", "Cooking", "Prototype"],
    sections: [
      {
        label: "What it is",
        body: "A book of 11 sauces from around the world, drawn as one map of the 30 ingredients they share.",
      },
      {
        label: "How it works",
        body: [
          "Each circle is an ingredient. Open a sauce to outline its ingredients.",
          "Select an ingredient to see every sauce that uses it, from pesto to harissa.",
          "Circles can be sized by market size, price or availability.",
        ],
      },
      {
        label: "What I built",
        body: [
          "A recipe database with a cited source for every sauce.",
          "An export step that turns the recipes into a network of shared ingredients.",
          "The interactive map above, rebuilt here from the prototype.",
        ],
      },
      {
        label: "Status",
        body: "Prototype. The size values are illustrative placeholders, not real data yet.",
      },
      { label: "Built with", body: "Python, SQLite and D3.js in the prototype; React and SVG on this page." },
    ],
  },
  {
    slug: "mapalab",
    kind: "personal",
    title: "MAPALAB",
    summary: "A personal systematic investing desk run by a team of AI agents, with one owner who decides: data, signals, risk and a daily brief.",
    year: "Ongoing",
    image: { src: mapalabCover, alt: "MAPALAB Team flow view: the Chief of Staff routes work to agent roles and decisions flow to the owner. Example tasks" },
    tags: ["AI agents", "Data engineering", "Systematic investing"],
    sections: [
      {
        label: "What it is",
        body: "A personal system that pulls market data from my broker, stores it, and runs signal, rebalancing and performance tracking for my own small portfolio. It runs on a Mac mini at home.",
      },
      {
        label: "How it's built",
        body: [
          "A team of AI agents, each with one role and its own rules: strategy, markets, research, risk, cash and engineering. A Chief of Staff routes the work and a Reviewer checks it before it reaches me.",
          "Every task sits on one board. Anything that needs a decision comes back to me: the agents propose, I decide.",
          "Separate modules for data, signals and execution, built with the same agents.",
          "Data layer: broker data ingestion, a SQLite store and backfill protocols, so gaps are filled the same way every time.",
          "Outputs: a P&L dashboard and a daily automated news brief on the holdings.",
        ],
      },
      {
        label: "Why",
        draft: true,
        body: "To learn systematic investing by building it, and to practise running AI agents on a real system with many parts.",
      },
      { label: "Status", body: "Personal learning project, in progress. Not investment advice." },
      { label: "Built with", body: "Python, SQLite, the Interactive Brokers API, Streamlit and Claude Code." },
    ],
    gallery: [
      { wide: true, src: mapalab, alt: "MAPALAB team diagram: owner, Chief of Staff, investing, money and build roles, and a Reviewer", caption: "The team: one owner, a Chief of Staff, specialist agents and a Reviewer." },
      { wide: true, src: mapalabFlow, alt: "MAPALAB Team flow view: the Chief of Staff routes work to agent roles, lines show where each role's tasks stand, and decisions flow to the owner", caption: "Team flow: who holds the work, where it stands, and what is waiting on me. Example tasks." },
      { wide: true, src: mapalabTeam, alt: "MAPALAB Team board: agent roles across the top, tasks in Needs you, Working, Queued and Done columns", caption: "Team board: every agent's work in one place. Example tasks." },
      { wide: true, src: mapalabCommand, alt: "MAPALAB Command Center: return and drawdown cards, NAV, return and drawdown charts, monthly results and a daily-returns heatmap", caption: "Command Center: NAV, return and drawdown on one page. Dummy data." },
      { wide: true, src: mapalabPositions, alt: "MAPALAB Positions page with stop-level warnings, a return chart, a holdings table and the AI assistant's portfolio summary", caption: "Positions, with stop-level warnings and the AI assistant's summary. Dummy data." },
    ],
  },
];

/** Commercial case studies as cards. Generated covers until real visuals are added. */
const tones: CoverTone[] = ["green", "sand", "ink", "clay"];
/** Real screenshots for work cards, by case-study slug. Others keep a generated cover. */
const workCovers: Record<string, ProjectCard["image"]> = {
  "checkout-auto-registration": {
    src: checkoutAutoRegistration,
    alt: "Philips webshop checkout in the Netherlands: the ticked box Registreer je product, and the result: +36% product registrations",
  },
  "growth-intelligence-revenue-drivers": {
    src: growthDrivers,
    alt: "Why revenue moved: monthly revenue change split into volume, price and mix bars with the actual change as a line. Dummy data",
  },
  "growth-intelligence-trading-matrix": {
    src: growthMatrix,
    alt: "Where to look next: a bubble matrix of categories by growth and revenue share, in Defend, Recover, Emerging and Review quadrants. Dummy data",
  },
  "air-filter-1pln": {
    src: airFilter,
    alt: "Home.ID campaign page in Polish: buy a Philips air purifier or humidifier and get a filter for 1 z\u0142, with buttons to create an account or log in",
  },
  "satisfaction-guarantee": {
    src: satisfactionGuarantee,
    alt: "Home.ID campaign page for the Philips satisfaction guarantee in Sweden, with buttons to create an account or log in",
  },
  "search-product-discovery": {
    src: searchLabel,
    alt: "Home.ID support search in Italian: the query BAR returns a list of products with name, image and product code",
  },
  "app-user-states": {
    src: appUserStates,
    alt: "The HomeID app user-state framework as a table: states from churned to loyal, with who they are, the objective and key actions",
  },
  "product-coverage-pim": {
    src: productCoverage,
    alt: "4\u00d7 products ready to register and support within two weeks of release: a short bar before the PIM connection, a bar four times longer after",
  },
  "home-id": {
    src: homeIdLanding,
    alt: "Home.ID landing page: \u201cMy account\u201d with buttons to create an account or log in",
  },
  "service-center-locator": {
    src: serviceCenters,
    alt: "Home.ID service-centre locator: a map of Italy with repair-centre pins beside a searchable list",
  },
};
const workCards: ProjectCard[] = caseStudies.map((c, i) => ({
  slug: c.slug,
  kind: "work",
  title: c.title,
  summary: c.summary,
  year: c.period,
  image: workCovers[c.slug],
  tone: tones[i % tones.length],
  mark: c.index,
}));

/** Grid order: work first, then personal projects. */
export const projects: ProjectCard[] = [...workCards, ...personalProjects];

export const getPersonalProject = (slug: string) => personalProjects.find((p) => p.slug === slug);
