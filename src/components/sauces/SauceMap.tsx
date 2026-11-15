"use client";

import { useState, type CSSProperties, type KeyboardEvent } from "react";
import {
  coreOf,
  EDGES,
  FORMAT,
  INGREDIENT_IDS,
  INGREDIENTS,
  ingredientsOf,
  isIllustrative,
  maxValue,
  METRICS,
  MISSING_R,
  outlineLabelAt,
  POS,
  radiusFor,
  radiusOf,
  SAUCE,
  SAUCES,
  SAUCES_OF,
  sauceOutline,
  valueOf,
  VIEWBOX,
  type MetricKey,
} from "@/content/bookOfSauces";

/** The book's own palette: blue ink on paper. Same in light and dark mode, like a printed page. */
export const bookPalette = {
  "--sm-paper": "#f5f0e4",
  "--sm-paper-2": "#efe8d8",
  "--sm-ink": "#1f3d8f",
  "--sm-ink-soft": "#5a6fae",
  "--sm-ink-faint": "#b9c1da",
  "--sm-fill": "#d7def0",
  "--sm-accent": "#c4472c",
  "--sm-text": "#22283a",
  "--sm-muted": "#6b6f7c",
  "--sm-rule": "#d9d0bb",
} as CSSProperties;

/** Faint ruled lines, like a notebook page. */
export const ruled: CSSProperties = {
  backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 31px, rgba(31,61,143,.06) 31px 32px)",
};

const METRIC_KEYS: MetricKey[] = ["market", "price", "availability"];

const CHECKED: Record<string, string> = {
  page_opened: "ingredient list checked on the page",
  search_result_full_list: "ingredient list checked in search results",
  secondary_report: "ingredients from a secondary report",
  not_checked: "ingredients not checked",
};

const onEnter = (fn: () => void) => (e: KeyboardEvent) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fn();
  }
};

/**
 * The Book of Sauces map, rebuilt from the prototype.
 * Each circle is an ingredient; open a sauce to outline its ingredients;
 * select an ingredient to see every sauce that uses it. The layout never moves.
 */
export function SauceMap() {
  const [sauce, setSauce] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);
  const [ing, setIng] = useState<string | null>(null);
  const [metric, setMetric] = useState<MetricKey>("market");
  const [done, setDone] = useState({ pesto: false, garlic: false, chimi: false, metric: false });

  const openSauce = (id: string) => {
    if (sauce !== id) {
      setPrev(sauce);
      setSauce(id);
    }
    setDone((d) => ({
      ...d,
      pesto: d.pesto || id === "pesto",
      chimi: d.chimi || (id === "chimichurri" && d.garlic && ing === "garlic"),
    }));
  };
  const selectIng = (id: string) => {
    const next = ing === id ? null : id;
    setIng(next);
    if (next === "garlic" && sauce === "pesto") setDone((d) => ({ ...d, garlic: true }));
  };
  const chooseMetric = (m: MetricKey) => {
    setMetric(m);
    setDone((d) => ({ ...d, metric: d.metric || d.chimi }));
  };

  const cur = sauce ? SAUCE[sauce] : null;
  const prv = prev && prev !== sauce ? SAUCE[prev] : null;
  const curSet = new Set(cur ? ingredientsOf(cur) : []);
  const prevSet = new Set(prv ? ingredientsOf(prv) : []);
  const nearSet = new Set<string>();
  if (ing) SAUCES_OF[ing].forEach((s) => ingredientsOf(SAUCE[s]).forEach((i) => nearSet.add(i)));
  const anyFocus = Boolean(cur || ing);

  const nodeOpacity = (id: string) => {
    if (!anyFocus || ing === id || curSet.has(id)) return 1;
    if (nearSet.has(id)) return 0.72;
    if (prevSet.has(id)) return 0.55;
    return 0.25;
  };

  const order = ["pesto", "garlic", "chimi", "metric"] as const;
  const now = order.find((k) => !done[k]);
  const stepClass = (k: (typeof order)[number]) =>
    done[k] ? "text-[var(--sm-muted)] line-through" : k === now ? "font-semibold" : "";

  const M = METRICS[metric];
  const legendSamples = [0.1, 0.5, 1].map((f) => {
    const v = maxValue(metric) * f;
    return metric === "price" ? +v.toFixed(1) : Math.round(v);
  });

  return (
    <div style={bookPalette} className="overflow-hidden border border-rule bg-[var(--sm-paper)] text-[var(--sm-text)]">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Map */}
        <div className="min-w-0" style={ruled}>
          <div className="flex flex-wrap items-center gap-1.5 px-4 pt-4 sm:px-5" role="group" aria-label="Contents">
            <span className="mr-1 font-serif text-[1rem] italic text-[var(--sm-ink-soft)]">Contents</span>
            {SAUCES.map((s) => {
              const on = s.id === sauce;
              const wasPrev = s.id === prev && !on;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => openSauce(s.id)}
                  className={`rounded-full border px-2.5 py-0.5 font-serif text-[0.88rem] transition-colors ${
                    on
                      ? "border-[var(--sm-ink)] bg-[var(--sm-ink)] text-[var(--sm-paper)]"
                      : `border-[var(--sm-ink-faint)] text-[var(--sm-ink)] hover:border-[var(--sm-ink)] ${wasPrev ? "border-dashed !border-[var(--sm-ink)]" : ""}`
                  }`}
                >
                  {s.name}
                </button>
              );
            })}
          </div>

          <svg
            viewBox={VIEWBOX.join(" ")}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Map of ingredients shared between sauces"
            className="block h-auto w-full"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIng(null);
            }}
          >
            {/* Sauce outlines */}
            {prv && (
              <path
                d={sauceOutline(ingredientsOf(prv), metric)}
                fill="none"
                stroke="var(--sm-ink-soft)"
                strokeWidth={1.2}
                strokeDasharray="6 5"
              />
            )}
            {cur && (
              <path d={sauceOutline(ingredientsOf(cur), metric)} fill="rgba(31,61,143,.07)" stroke="var(--sm-ink)" strokeWidth={1.2} />
            )}

            {/* Edges */}
            {EDGES.map(([a, b]) => {
              const inCur = curSet.has(a) && curSet.has(b);
              const touchesIng = Boolean(ing && (a === ing || b === ing));
              return (
                <line
                  key={a + b}
                  x1={POS[a][0]}
                  y1={POS[a][1]}
                  x2={POS[b][0]}
                  y2={POS[b][1]}
                  stroke={touchesIng && !inCur ? "var(--sm-accent)" : "var(--sm-ink)"}
                  strokeWidth={inCur ? 1.6 : 1}
                  strokeOpacity={inCur ? 0.75 : touchesIng ? 0.45 : anyFocus ? 0.05 : 0.16}
                  style={{ transition: "stroke-opacity .45s, stroke .45s" }}
                />
              );
            })}

            {/* Ingredients */}
            {INGREDIENT_IDS.map((id) => {
              const [x, y] = POS[id];
              const r = radiusOf(id, metric);
              const sel = ing === id;
              const missing = valueOf(id, metric) == null;
              const n = SAUCES_OF[id].length;
              return (
                <g
                  key={id}
                  transform={`translate(${x},${y})`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={sel}
                  aria-label={`${INGREDIENTS[id].name}, in ${n} sauce${n > 1 ? "s" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectIng(id);
                  }}
                  onKeyDown={onEnter(() => selectIng(id))}
                  className="cursor-pointer outline-none [&:focus-visible>circle]:stroke-[3]"
                  style={{ opacity: nodeOpacity(id), transition: "opacity .45s" }}
                >
                  <circle
                    r={r}
                    fill={sel ? "var(--sm-accent)" : missing ? "var(--sm-paper-2)" : curSet.has(id) ? "var(--sm-fill)" : "var(--sm-paper)"}
                    stroke={sel ? "var(--sm-accent)" : "var(--sm-ink)"}
                    strokeWidth={1.6}
                    strokeDasharray={missing ? "3 3" : undefined}
                    style={{ transition: "r .45s, fill .3s" }}
                  />
                  <text
                    y={r + 17}
                    textAnchor="middle"
                    className="pointer-events-none font-serif italic"
                    fontSize={19}
                    fontWeight={sel || curSet.has(id) ? 600 : 400}
                    fill={sel ? "var(--sm-accent)" : "var(--sm-ink)"}
                    stroke="var(--sm-paper)"
                    strokeWidth={4}
                    paintOrder="stroke"
                  >
                    {INGREDIENTS[id].name.toLowerCase()}
                  </text>
                </g>
              );
            })}

            {/* Outline labels on top */}
            {prv &&
              (() => {
                const [lx, ly] = outlineLabelAt(ingredientsOf(prv), metric, true);
                return (
                  <text x={lx} y={ly} textAnchor="middle" className="font-serif italic" fontSize={24} fill="var(--sm-ink-soft)">
                    {prv.name.toLowerCase()}
                  </text>
                );
              })()}
            {cur &&
              (() => {
                const [lx, ly] = outlineLabelAt(ingredientsOf(cur), metric);
                return (
                  <text x={lx} y={ly} textAnchor="middle" className="font-serif italic" fontSize={26} fontWeight={600} fill="var(--sm-ink)">
                    {cur.name.toLowerCase()}
                  </text>
                );
              })()}
          </svg>

          {/* Size view + legend */}
          <div className="mx-4 mb-4 grid grid-cols-1 gap-3 rounded-md border border-[var(--sm-rule)] bg-[var(--sm-paper)]/90 p-3 text-[0.82rem] sm:mx-5 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-x-5">
            <div
              role="group"
              aria-label="Size circles by"
              className="inline-flex w-fit overflow-hidden rounded-full border border-[var(--sm-ink)]"
            >
              {METRIC_KEYS.map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={metric === k}
                  onClick={() => chooseMetric(k)}
                  className={`px-3 py-1 font-serif text-[0.85rem] ${
                    metric === k ? "bg-[var(--sm-ink)] text-[var(--sm-paper)]" : "text-[var(--sm-ink)]"
                  }`}
                >
                  {METRICS[k].label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <p className="max-w-[34ch] leading-snug">
                A larger circle means: <b>{M.biggerMeans.toLowerCase()}</b>.
                {isIllustrative(metric) && (
                  <span className="mt-1 block text-[0.72rem] italic text-[var(--sm-muted)]">
                    <span className="mr-1 rounded-sm bg-[#f3d9c9] px-1.5 py-px font-mono not-italic text-[#8a2f1b]">ILLUSTRATIVE</span>
                    placeholder numbers, not real data yet
                  </span>
                )}
              </p>
              <svg width="262" height="62" aria-hidden="true" className="shrink-0">
                {(() => {
                  let x = 24;
                  const out = legendSamples.map((v) => {
                    const r = radiusFor(v, metric);
                    const cx = x + r;
                    x += r * 2 + 16;
                    return (
                      <g key={v}>
                        <circle cx={cx} cy={46 - r} r={r} fill="none" stroke="var(--sm-ink)" strokeWidth={1.2} />
                        <text x={cx} y={60} textAnchor="middle" fontSize={10} fill="var(--sm-muted)">
                          {FORMAT[metric](v)}
                        </text>
                      </g>
                    );
                  });
                  out.push(
                    <g key="none">
                      <circle cx={x + MISSING_R} cy={46 - MISSING_R} r={MISSING_R} fill="var(--sm-paper-2)" stroke="var(--sm-ink)" strokeDasharray="3 3" />
                      <text x={x + MISSING_R} y={60} textAnchor="middle" fontSize={10} fill="var(--sm-muted)">
                        no data
                      </text>
                    </g>,
                  );
                  return out;
                })()}
              </svg>
            </div>
          </div>
        </div>

        {/* Reading pane */}
        <aside
          aria-live="polite"
          className="border-t border-[var(--sm-rule)] bg-[var(--sm-paper-2)] p-4 sm:p-5 lg:max-h-[46rem] lg:overflow-auto lg:border-l lg:border-t-0"
        >
          <div className="mb-5 rounded-md border border-[var(--sm-rule)] bg-[var(--sm-paper)] p-3">
            <h3 className="font-serif text-[1.05rem] italic text-[var(--sm-ink)]">Try the path</h3>
            <ol className="mt-1 list-decimal space-y-0.5 pl-5 text-[0.86rem] leading-snug">
              <li className={stepClass("pesto")}>Open <b>Pesto</b> from the contents.</li>
              <li className={stepClass("garlic")}>Select <b>garlic</b>, the ingredient pesto shares most widely.</li>
              <li className={stepClass("chimi")}>Follow garlic to <b>Chimichurri</b> in its entry below.</li>
              <li className={stepClass("metric")}>Switch the size view and see what a bigger circle means.</li>
            </ol>
          </div>

          {!cur && !ing && (
            <div>
              <h3 className="font-serif text-[1.35rem] italic text-[var(--sm-ink)]">How to read this book</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed">
                Each circle is an <b>ingredient</b>. Each sauce is a group of ingredients from one recipe. Lines join
                ingredients that appear in the same sauce.
              </p>
              <p className="mt-2 text-[0.92rem] leading-relaxed">
                Open a sauce to outline it. Select an ingredient to see every sauce that uses it. The map never moves, so a
                shared ingredient stays in place as you go.
              </p>
              <button
                type="button"
                onClick={() => openSauce("pesto")}
                className="mt-3 rounded-full bg-[var(--sm-ink)] px-4 py-1.5 font-serif text-[0.92rem] text-[var(--sm-paper)]"
              >
                Start with pesto
              </button>
            </div>
          )}

          {cur && (
            <div>
              <p className="font-serif text-[0.95rem] italic text-[var(--sm-ink-soft)]">Sauce</p>
              <h3 className="font-serif text-[1.6rem] font-semibold leading-tight">{cur.full}</h3>
              <p className="text-[0.86rem] italic text-[var(--sm-muted)]">{cur.origin}</p>
              {cur.notes && <p className="mt-2 text-[0.9rem] leading-relaxed">{cur.notes}.</p>}
              {prv &&
                (() => {
                  const shared = coreOf(cur).filter((i) => coreOf(prv).includes(i));
                  return shared.length > 0 ? (
                    <p className="my-3 border-l-[3px] border-[var(--sm-accent)] bg-[var(--sm-paper)] px-2.5 py-2 text-[0.88rem]">
                      Shares <b>{shared.map((i) => INGREDIENTS[i].name.toLowerCase()).join(", ")}</b> with {prv.name}.
                      Everything else is its own.
                    </p>
                  ) : null;
                })()}
              <p className="mt-3 font-serif text-[0.95rem] italic text-[var(--sm-ink-soft)]">
                Ingredients ({cur.ingredients.length})
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {cur.ingredients.map((i) => (
                  <button
                    key={i.node}
                    type="button"
                    onClick={() => selectIng(i.node)}
                    className={`rounded border px-2 py-0.5 text-[0.85rem] ${
                      i.node === ing
                        ? "border-[var(--sm-accent)] bg-[var(--sm-accent)] text-white"
                        : "border-[var(--sm-ink-faint)] bg-[var(--sm-paper)] text-[var(--sm-ink)] hover:border-[var(--sm-ink)]"
                    }`}
                  >
                    {INGREDIENTS[i.node].name}
                    {i.optional && <i> (optional)</i>}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[0.78rem] italic leading-snug text-[var(--sm-muted)]">
                {cur.source ? (
                  <>
                    Recipe source:{" "}
                    <a href={cur.source.url} target="_blank" rel="noopener noreferrer" className="underline">
                      {cur.source.publisher}
                    </a>
                    , &ldquo;{cur.source.title}&rdquo;. {CHECKED[cur.source.checkedBy] ?? ""}
                    {cur.status === "partial" ? " · source to be replaced" : ""}
                  </>
                ) : (
                  "Recipe source: not yet documented."
                )}
              </p>
            </div>
          )}

          {ing &&
            (() => {
              const I = INGREDIENTS[ing];
              const others = SAUCES_OF[ing];
              return (
                <div className={cur ? "mt-5 border-t border-[var(--sm-rule)] pt-4" : ""}>
                  <p className="font-serif text-[0.95rem] italic text-[var(--sm-ink-soft)]">Ingredient</p>
                  <h3 className="font-serif text-[1.6rem] font-semibold leading-tight text-[var(--sm-accent)]">{I.name}</h3>
                  <p className="text-[0.84rem] italic text-[var(--sm-muted)]">
                    {I.products.length > 0 && <>Covers {I.products.join(", ")} · </>}
                    {I.aliases.length > 0 ? <>Also listed as {I.aliases.join(", ")}</> : "One name across all recipes"} · form:{" "}
                    {I.form}
                  </p>
                  <p className="mt-3 font-serif text-[0.95rem] italic text-[var(--sm-ink-soft)]">
                    Appears in {others.length} sauce{others.length > 1 ? "s" : ""}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {others.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => openSauce(s)}
                        className={`rounded border px-2 py-0.5 text-[0.85rem] ${
                          s === sauce
                            ? "border-[var(--sm-ink)] bg-[var(--sm-ink)] text-[var(--sm-paper)]"
                            : "border-[var(--sm-ink-faint)] bg-[var(--sm-paper)] text-[var(--sm-ink)] hover:border-[var(--sm-ink)]"
                        }`}
                      >
                        {SAUCE[s].name}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 font-serif text-[0.95rem] italic text-[var(--sm-ink-soft)]">Data behind the circle size</p>
                  <table className="mt-1 w-full border-collapse text-[0.8rem]">
                    <thead>
                      <tr className="text-left text-[0.68rem] uppercase tracking-[0.04em] text-[var(--sm-muted)]">
                        <th className="border-b border-[var(--sm-rule)] py-1 pr-2 font-semibold">View</th>
                        <th className="border-b border-[var(--sm-rule)] py-1 pr-2 font-semibold">Value</th>
                        <th className="border-b border-[var(--sm-rule)] py-1 font-semibold">Basis</th>
                      </tr>
                    </thead>
                    <tbody>
                      {METRIC_KEYS.map((k) => {
                        const z = I.sizing[k];
                        return (
                          <tr key={k} className={k === metric ? "bg-[rgba(31,61,143,.07)]" : ""}>
                            <td className="border-b border-[var(--sm-rule)] py-1 pr-2 align-top">{METRICS[k].label}</td>
                            <td className="border-b border-[var(--sm-rule)] py-1 pr-2 align-top">
                              {z ? FORMAT[k](z.value) : <i>no data</i>}
                            </td>
                            <td className="border-b border-[var(--sm-rule)] py-1 align-top italic text-[var(--sm-muted)]">
                              {z?.basis || "not collected yet"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })()}
        </aside>
      </div>
    </div>
  );
}
