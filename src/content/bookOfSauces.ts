/**
 * The Book of Sauces: sauces of the world, connected by the ingredients they share.
 *
 * Data comes from Manuel's prototype (data/book_of_sauces.db → scripts/export_graph.py),
 * trimmed to what the map needs. Node positions are precomputed once with d3-force using
 * the prototype's settings, so the site draws the map with plain SVG and no extra library.
 * To refresh: re-export the prototype data and rerun the layout script.
 */
import raw from "./data/book-of-sauces.json";

export type MetricKey = "market" | "price" | "availability";

type SizingCell = { value: number; status: string; basis: string } | null;

export type Ingredient = {
  id: string;
  name: string;
  form: string;
  aliases: string[];
  products: string[];
  sizing: Record<MetricKey, SizingCell>;
};

export type Sauce = {
  id: string;
  name: string;
  full: string;
  origin: string;
  notes: string | null;
  status: string;
  ingredients: { node: string; asWritten: string; optional: boolean }[];
  source: { title: string; publisher: string; url: string; checkedBy: string } | null;
};

const data = raw as unknown as {
  metrics: Record<MetricKey, { label: string; biggerMeans: string; unit: string; scope: string }>;
  sauces: Sauce[];
  nodes: Ingredient[];
  edges: [string, string][];
  layout: { viewBox: [number, number, number, number]; pos: Record<string, [number, number]> };
};

export const SAUCES = data.sauces;
export const SAUCE: Record<string, Sauce> = Object.fromEntries(SAUCES.map((s) => [s.id, s]));
export const INGREDIENTS: Record<string, Ingredient> = Object.fromEntries(data.nodes.map((n) => [n.id, n]));
export const INGREDIENT_IDS = data.nodes.map((n) => n.id);
export const EDGES = data.edges;
export const METRICS = data.metrics;
export const VIEWBOX = data.layout.viewBox;
export const POS = data.layout.pos;

export const ingredientsOf = (s: Sauce) => s.ingredients.map((i) => i.node);
export const coreOf = (s: Sauce) => s.ingredients.filter((i) => !i.optional).map((i) => i.node);

/** Which sauces use each ingredient. */
export const SAUCES_OF: Record<string, string[]> = Object.fromEntries(INGREDIENT_IDS.map((id) => [id, []]));
SAUCES.forEach((s) => s.ingredients.forEach((i) => SAUCES_OF[i.node].push(s.id)));

export const valueOf = (id: string, m: MetricKey) => INGREDIENTS[id].sizing[m]?.value ?? null;

/** True when every value for a metric is a placeholder (the prototype's current state). */
export const isIllustrative = (m: MetricKey) =>
  INGREDIENT_IDS.map((id) => INGREDIENTS[id].sizing[m]).every((z) => !z || z.status === "placeholder");

export const FORMAT: Record<MetricKey, (v: number) => string> = {
  market: (v) => `€${Math.round(v)}M`,
  price: (v) => `€${v.toFixed(2)}/kg`,
  availability: (v) => `${Math.round(v)}%`,
};

/* ---------------- Geometry ---------------- */

export const MISSING_R = 8;
const R_MIN = 4;
const R_MAX = 28;

const maxOf: Record<MetricKey, number> = {
  market: Math.max(...INGREDIENT_IDS.map((id) => valueOf(id, "market") ?? 0)),
  price: Math.max(...INGREDIENT_IDS.map((id) => valueOf(id, "price") ?? 0)),
  availability: Math.max(...INGREDIENT_IDS.map((id) => valueOf(id, "availability") ?? 0)),
};

/** Square-root scale, so circle area tracks the value. */
export const radiusFor = (v: number, m: MetricKey) => R_MIN + (R_MAX - R_MIN) * Math.sqrt(v / maxOf[m]);
export const maxValue = (m: MetricKey) => maxOf[m];
export const radiusOf = (id: string, m: MetricKey) => {
  const v = valueOf(id, m);
  return v == null ? MISSING_R : radiusFor(v, m);
};

type Pt = [number, number];

/** Convex hull (monotone chain). */
function hull(points: Pt[]): Pt[] {
  const p = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: Pt, a: Pt, b: Pt) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: Pt[] = [];
  for (const pt of p) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], pt) <= 0) lower.pop();
    lower.push(pt);
  }
  const upper: Pt[] = [];
  for (const pt of p.reverse()) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], pt) <= 0) upper.pop();
    upper.push(pt);
  }
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}

/** Closed Catmull-Rom curve through the points, as an SVG path. */
function smoothClosed(pts: Pt[]): string {
  const n = pts.length;
  if (n < 3) return "";
  const at = (i: number) => pts[(i + n) % n];
  let d = `M${at(0)[0].toFixed(1)},${at(0)[1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + "Z";
}

/** Soft outline around a sauce's ingredients, padded by each node's radius. */
export function sauceOutline(ids: string[], m: MetricKey, pad = 16): string {
  const pts: Pt[] = [];
  ids.forEach((id) => {
    const [x, y] = POS[id];
    const r = radiusOf(id, m) + pad;
    for (let a = 0; a < 12; a++) {
      const t = (a / 12) * Math.PI * 2;
      pts.push([x + Math.cos(t) * r, y + Math.sin(t) * r]);
    }
  });
  return smoothClosed(hull(pts));
}

/** Where to put a sauce's label: above its top node, or below its lowest one. */
export function outlineLabelAt(ids: string[], m: MetricKey, below = false): Pt {
  let best: Pt | null = null;
  ids.forEach((id) => {
    const [x, y] = POS[id];
    const r = radiusOf(id, m) + 16;
    const edge = below ? y + r : y - r;
    if (!best || (below ? edge > best[1] : edge < best[1])) best = [x, edge];
  });
  const b = best as unknown as Pt;
  return [b[0], below ? b[1] + 34 : b[1] - 12];
}
