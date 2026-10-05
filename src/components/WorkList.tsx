import Link from "next/link";
import { caseStudies } from "@/content/work";
import { Tags } from "./Tags";

/** Editorial list of case studies. Rows, not cards. */
export function WorkList({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="border-b border-rule">
      {caseStudies.map((c) => (
        <li key={c.slug} className="border-t border-rule">
          <Link
            href={`/work/${c.slug}/`}
            className="group grid grid-cols-[2.5rem_1fr_auto] gap-x-4 py-8 sm:grid-cols-[3.5rem_1fr_auto] sm:py-10"
          >
            <span className="pt-2 font-mono text-[0.75rem] text-faint transition-colors group-hover:text-accent">
              {c.index}
            </span>
            <div>
              <Heading className="display text-[1.6rem] leading-[1.12] transition-colors group-hover:text-accent sm:text-[2.1rem]">
                {c.title}
              </Heading>
              <p className="mt-3 max-w-[56ch] text-[1rem] leading-relaxed text-muted">{c.summary}</p>
              <Tags items={c.tags} className="mt-5" />
            </div>
            <span
              aria-hidden="true"
              className="pt-2 text-[1.25rem] text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
