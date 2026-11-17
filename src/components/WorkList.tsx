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
            className="group grid grid-cols-[2.5rem_1fr_auto] gap-x-3 py-6 sm:grid-cols-[3rem_1fr_auto] sm:py-7"
          >
            <span className="pt-1.5 font-mono text-[0.75rem] text-faint transition-colors group-hover:text-accent">
              {c.index}
            </span>
            <div>
              <Heading className="display text-[1.3rem] leading-[1.15] transition-colors group-hover:text-accent sm:text-[1.55rem]">
                {c.title}
              </Heading>
              <p className="mt-1.5 max-w-[56ch] text-[0.95rem] leading-relaxed text-muted">{c.summary}</p>
              <Tags items={c.tags} className="mt-3" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
