"use client";

import { useEffect, useState } from "react";
import {
  EDGES,
  INGREDIENT_IDS,
  ingredientsOf,
  outlineLabelAt,
  POS,
  radiusOf,
  SAUCES,
  sauceOutline,
  VIEWBOX,
} from "@/content/bookOfSauces";
import { bookPalette, ruled } from "./SauceMap";

/** Tour order for the thumbnail: starts with the prototype's suggested path. */
const TOUR = ["pesto", "chimichurri", "harissa", "pico", "tzatziki", "romesco", "mojo", "aioli", "chermoula", "gremolata", "salsa-verde"].filter(
  (id) => SAUCES.some((s) => s.id === id),
);

/**
 * A live miniature of the map for the project card: it walks through the sauces,
 * outlining each one's ingredients. Holds still for visitors who prefer reduced motion.
 */
export function SauceMapThumb() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % TOUR.length), 1900);
    return () => window.clearInterval(t);
  }, []);

  const sauce = SAUCES.find((s) => s.id === TOUR[i])!;
  const ids = ingredientsOf(sauce);
  const set = new Set(ids);
  const [lx, ly] = outlineLabelAt(ids, "market");

  return (
    <div
      role="img"
      aria-label="The Book of Sauces: a map of sauces connected by their shared ingredients"
      style={{ ...bookPalette, ...ruled }}
      className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--sm-paper)]"
    >
      <span className="absolute left-4 top-3 z-10 font-serif text-[1rem] italic text-[var(--sm-ink)] sm:left-5 sm:top-4 sm:text-[1.1rem]">
        The Book of Sauces
      </span>
      <span className="absolute right-3 top-3 z-10 rounded-full border border-[var(--sm-ink)] px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-[var(--sm-ink)] sm:right-4 sm:top-4">
        Interactive
      </span>
      <svg viewBox={VIEWBOX.join(" ")} preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="absolute inset-0 h-full w-full pt-8">
        <path
          d={sauceOutline(ids, "market")}
          fill="rgba(31,61,143,.08)"
          stroke="var(--sm-ink)"
          strokeWidth={2}
          style={{ transition: "d .6s ease" }}
        />
        {EDGES.map(([a, b]) => {
          const inside = set.has(a) && set.has(b);
          return (
            <line
              key={a + b}
              x1={POS[a][0]}
              y1={POS[a][1]}
              x2={POS[b][0]}
              y2={POS[b][1]}
              stroke="var(--sm-ink)"
              strokeWidth={inside ? 2 : 1.2}
              strokeOpacity={inside ? 0.7 : 0.1}
              style={{ transition: "stroke-opacity .6s" }}
            />
          );
        })}
        {INGREDIENT_IDS.map((id) => {
          const on = set.has(id);
          return (
            <circle
              key={id}
              cx={POS[id][0]}
              cy={POS[id][1]}
              r={radiusOf(id, "market")}
              fill={on ? "var(--sm-fill)" : "var(--sm-paper)"}
              stroke="var(--sm-ink)"
              strokeWidth={2}
              opacity={on ? 1 : 0.35}
              style={{ transition: "opacity .6s, fill .6s" }}
            />
          );
        })}
        <text
          x={lx}
          y={ly}
          textAnchor="middle"
          className="font-serif italic"
          fontSize={40}
          fontWeight={600}
          fill="var(--sm-accent)"
          stroke="var(--sm-paper)"
          strokeWidth={6}
          paintOrder="stroke"
        >
          {sauce.name.toLowerCase()}
        </text>
      </svg>
    </div>
  );
}
