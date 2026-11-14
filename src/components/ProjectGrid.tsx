"use client";

import Link from "next/link";
import { useState } from "react";
import { kindLabel, type ProjectCard, type ProjectKind } from "@/content/projects";
import { ProjectCover } from "./ProjectCover";

type Filter = "all" | ProjectKind;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
];

/**
 * Selected work as a grid of framed covers: two columns on desktop, one on phones.
 * Each card: cover, kind label and year, title, one line, "View project".
 */
export function ProjectGrid({
  projects,
  showFilter = false,
  headingLevel = "h3",
}: {
  projects: ProjectCard[];
  showFilter?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.kind === filter);
  const Heading = headingLevel;

  return (
    <div>
      {showFilter && (
        <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => {
            const count = f.value === "all" ? projects.length : projects.filter((p) => p.kind === f.value).length;
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.value)}
                className={`rounded-sm border px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.06em] transition-colors ${
                  active ? "border-ink bg-ink text-bg" : "border-rule text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {f.label} <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      )}

      <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
        {visible.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}/`} className="group block">
              <div className="border border-rule bg-surface p-2.5 transition-colors group-hover:border-ink sm:p-3">
                <div className="overflow-hidden">
                  <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                    <ProjectCover project={p} priority={i < 2} />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <span className={`eyebrow ${p.kind === "personal" ? "text-accent" : ""}`}>{kindLabel[p.kind]}</span>
                {/* Years show on cards only once filled in; "Input needed" stays on the project page. */}
                {typeof p.year === "string" && <span className="eyebrow shrink-0">{p.year}</span>}
              </div>
              <Heading className="display mt-2 text-[1.3rem] leading-[1.15] transition-colors group-hover:text-accent sm:text-[1.45rem]">
                {p.title}
              </Heading>
              <p className="mt-1.5 max-w-[48ch] text-[0.95rem] leading-relaxed text-muted">{p.summary}</p>
              <span className="mt-3 inline-flex items-center gap-2 text-[0.88rem] font-medium text-ink">
                <span className="link-underline pb-0.5">View project</span>
                <span aria-hidden="true" className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
