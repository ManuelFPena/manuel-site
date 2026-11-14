import type { StaticImageData } from "next/image";
import fieldStudy from "../../public/projects/visual-instruments-field-study.jpg";
import sequencer from "../../public/projects/visual-instruments-sequencer.jpg";
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
};

export type PersonalProject = ProjectCard & {
  kind: "personal";
  tags: string[];
  /** Short sections, in order. Same body rules as case studies: a sentence or a few bullets. */
  sections: { label: string; body: CaseSection["body"]; draft?: boolean }[];
  /** Extra screenshots shown under the sections. */
  gallery?: { src: StaticImageData; alt: string; caption: string }[];
  link?: { href: string; label: string };
};

export const personalProjects: PersonalProject[] = [
  {
    slug: "visual-instruments",
    kind: "personal",
    title: "Visual instruments",
    summary: "Small browser instruments where sound and image move together. Knobs, steps and particles.",
    year: todo("Year(s)"),
    image: { src: fieldStudy, alt: "Field Study: a tape-deck panel with four knobs driving a generative particle field" },
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
    title: "Book of Sauces",
    summary: "A personal collection of sauces, written down so they can be repeated and improved.",
    year: todo("Year(s)"),
    tone: "clay",
    mark: "Sauces",
    tags: ["Cooking", "Writing"],
    sections: [
      {
        label: "What it is",
        body: todo("One or two lines: what the book is, how many sauces, what format (notebook, site, PDF)"),
      },
      {
        label: "Why",
        draft: true,
        body: "Cooking works like product iteration: constraints, small experiments, and notes on what changed.",
      },
      { label: "What's next", body: todo("Optional: photos, a favourite sauce, or a link") },
    ],
  },
];

/** Commercial case studies as cards. Generated covers until real visuals are added. */
const tones: CoverTone[] = ["green", "sand", "ink", "clay"];
const workCards: ProjectCard[] = caseStudies.map((c, i) => ({
  slug: c.slug,
  kind: "work",
  title: c.title,
  summary: c.summary,
  year: c.period,
  tone: tones[i % tones.length],
  mark: c.index,
}));

/** Grid order: work first, then personal projects. */
export const projects: ProjectCard[] = [...workCards, ...personalProjects];

export const getPersonalProject = (slug: string) => personalProjects.find((p) => p.slug === slug);
