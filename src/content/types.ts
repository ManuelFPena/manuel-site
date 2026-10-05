/**
 * A piece of copy that is either final text, or a marker for something
 * Manuel still needs to supply. Markers render as a visible "Input needed"
 * tag until filled in (hide them all with NEXT_PUBLIC_HIDE_TODOS=1).
 */
export type Todo = { todo: string };

/**
 * Copy that is visible only while working locally (`npm run dev`) and is
 * stripped from every production build. Use it for figures or details you are
 * still deciding whether to disclose. Promote to a plain string once cleared.
 */
export type Private = { private: string };

export type Copy = string | Todo | Private;

export const todo = (note: string): Todo => ({ todo: note });
export const priv = (text: string): Private => ({ private: text });
export const isTodo = (value: unknown): value is Todo =>
  typeof value === "object" && value !== null && "todo" in value;
export const isPrivate = (value: unknown): value is Private =>
  typeof value === "object" && value !== null && "private" in value;

/** A headline number for a case study, e.g. { value: "40+", label: "markets" }. */
export type Figure = {
  value: string;
  label: string;
  /** Not yet cleared for disclosure: shown locally, stripped from builds. */
  private?: boolean;
};

export type CaseSection = {
  /** Paragraph text, or a list of short points. */
  body: Copy | Copy[];
  /** True when the text is a first draft written for Manuel to confirm. */
  draft?: boolean;
};

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  /** One line used in lists and meta descriptions. */
  summary: string;
  tags: string[];
  role: Copy;
  period: Copy;
  problem: CaseSection;
  context: CaseSection;
  myRole: CaseSection;
  approach: CaseSection;
  decision: CaseSection;
  outcome: CaseSection;
  /** Optional headline numbers, shown above the Outcome section. */
  figures?: Figure[];
};
