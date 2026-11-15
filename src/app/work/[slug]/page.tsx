import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/ArrowLink";
import { Container } from "@/components/Container";
import { Tags } from "@/components/Tags";
import { isHidden, showPrivate, Text } from "@/components/Text";
import { isTodo, type CaseSection, type Figure } from "@/content/types";
import Image from "next/image";
import { ProjectCover } from "@/components/ProjectCover";
import { SauceMap } from "@/components/sauces/SauceMap";
import { getPersonalProject, kindLabel, personalProjects, projects, type PersonalProject } from "@/content/projects";
import { caseStudies, getCaseStudy } from "@/content/work";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return [...caseStudies, ...personalProjects].map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug) ?? getPersonalProject(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.summary,
    alternates: { canonical: `/work/${c.slug}/` },
    openGraph: { title: c.title, description: c.summary, type: "article" },
  };
}

const sections: { key: "problem" | "context" | "myRole" | "approach" | "decision" | "outcome"; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "context", label: "Context" },
  { key: "myRole", label: "My role" },
  { key: "approach", label: "Approach" },
  { key: "decision", label: "Decision" },
  { key: "outcome", label: "Outcome" },
];

function SectionBody({ section }: { section: CaseSection }) {
  if (Array.isArray(section.body)) {
    return (
      <ul className="space-y-2">
        {section.body.filter((item) => !isHidden(item)).map((item, i) => (
          <li key={i} className="flex gap-4">
            <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
            <span>
              <Text value={item} />
            </span>
          </li>
        ))}
      </ul>
    );
  }
  if (isHidden(section.body)) return null;
  return isTodo(section.body) ? <Text value={section.body} /> : <p><Text value={section.body} /></p>;
}

function Figures({ figures }: { figures: Figure[] }) {
  const visible = figures.filter((f) => !f.private || showPrivate);
  if (visible.length === 0) return null;
  return (
    <dl className="mb-6 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
      {visible.map((f) => (
        <div
          key={f.label}
          className={`border-t pt-4 ${f.private ? "border-dashed border-private" : "border-ink"}`}
        >
          <dt className="sr-only">{f.label}</dt>
          <dd className="display text-[2rem] leading-none text-ink">{f.value}</dd>
          <dd className="mt-2 text-[0.92rem] leading-snug text-muted">
            {f.label}
            {f.private && <span className="ml-2 font-mono text-[0.65rem] uppercase text-private">Private</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** The project after this one in the grid order, so "Next" walks the whole grid. */
const nextProject = (slug: string) => {
  const i = projects.findIndex((x) => x.slug === slug);
  return projects[(i + 1) % projects.length];
};

function NextLinks({ slug }: { slug: string }) {
  const next = nextProject(slug);
  return (
    <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <ArrowLink href="/work/">All work</ArrowLink>
      <Link href={`/work/${next.slug}/`} className="group sm:text-right">
        <span className="eyebrow block">Next project</span>
        <span className="display mt-1.5 block text-[1.25rem] leading-tight transition-colors group-hover:text-accent">
          {next.title} <span aria-hidden="true" className="text-accent">→</span>
        </span>
      </Link>
    </div>
  );
}

/** Lighter page for personal / fun projects: cover, a few short sections, screenshots. */
function PersonalProjectPage({ p }: { p: PersonalProject }) {
  return (
    <article>
      <Container className="pb-8 pt-10 sm:pb-10 sm:pt-14 lg:pt-20">
        <nav aria-label="Breadcrumb" className="eyebrow">
          <Link href="/work/" className="link-underline pb-0.5 hover:text-ink">
            Work
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-accent">{kindLabel[p.kind]}</span>
        </nav>
        <h1 className="display mt-4 max-w-[20ch] text-[2.1rem] leading-[1.08] sm:text-[2.6rem] lg:text-[3rem]">
          {p.title}
        </h1>
        <p className="mt-4 max-w-[52ch] text-[1.02rem] leading-relaxed text-muted sm:text-[1.1rem]">{p.summary}</p>

        <dl className="mt-8 grid max-w-[860px] grid-cols-1 border-t border-rule sm:grid-cols-3">
          <div className="border-b border-rule py-4 sm:border-b-0 sm:pr-6">
            <dt className="eyebrow">Type</dt>
            <dd className="mt-2 text-[0.98rem]">{kindLabel[p.kind]}</dd>
          </div>
          <div className="border-b border-rule py-4 sm:border-b-0 sm:px-6">
            <dt className="eyebrow">Year</dt>
            <dd className="mt-2 text-[0.98rem]">{p.year ? <Text value={p.year} /> : "Ongoing"}</dd>
          </div>
          <div className="py-4 sm:pl-6">
            <dt className="eyebrow">Focus</dt>
            <dd className="mt-2">
              <Tags items={p.tags} />
            </dd>
          </div>
        </dl>

        {/* A working embed comes first; with a gallery, the screenshots below do the job; otherwise the cover. */}
        {p.embed === "book-of-sauces" && (
          <div className="mt-8">
            <SauceMap />
          </div>
        )}
        {!p.embed && !p.gallery?.length && (
          <div className="mt-8 max-w-[860px] border border-rule bg-surface p-2.5 sm:p-3">
            <ProjectCover project={p} priority />
          </div>
        )}
      </Container>

      <Container className="pb-14 lg:pb-20">
        <ol className="border-b border-rule">
          {p.sections.map((section, n) => (
            <li
              key={section.label}
              className="grid grid-cols-1 gap-y-3 border-t border-rule py-6 lg:grid-cols-12 lg:gap-x-12 lg:py-8"
            >
              <div className="lg:col-span-3">
                <h2 className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.75rem] text-accent">{String(n + 1).padStart(2, "0")}</span>
                  <span className="display text-[1.25rem] leading-none">{section.label}</span>
                </h2>
                {section.draft && <p className="eyebrow mt-3 text-todo">Draft · confirm or rewrite</p>}
              </div>
              <div className="prose-body max-w-[60ch] lg:col-span-8">
                <SectionBody section={section} />
              </div>
            </li>
          ))}
        </ol>

        {p.gallery && p.gallery.length > 0 && (
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {p.gallery.map((g) => (
              <li key={g.caption}>
                <figure>
                  <div className="border border-rule bg-surface p-2.5 sm:p-3">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      placeholder="blur"
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="aspect-[4/3] h-auto w-full object-cover"
                    />
                  </div>
                  <figcaption className="eyebrow mt-3">{g.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}

        {p.link && (
          <div className="mt-8">
            <a href={p.link.href} target="_blank" rel="noopener noreferrer" className="link-underline pb-0.5 font-medium">
              {p.link.label} <span aria-hidden="true" className="text-accent">↗</span>
            </a>
          </div>
        )}

        <NextLinks slug={p.slug} />
      </Container>
    </article>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const personal = getPersonalProject(slug);
  if (personal) return <PersonalProjectPage p={personal} />;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  return (
    <article>
      <Container className="pb-8 pt-10 sm:pb-10 sm:pt-14 lg:pt-20">
        <nav aria-label="Breadcrumb" className="eyebrow">
          <Link href="/work/" className="link-underline pb-0.5 hover:text-ink">
            Work
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-accent">{c.index}</span>
        </nav>
        <h1 className="display mt-4 max-w-[20ch] text-[2.1rem] leading-[1.08] sm:text-[2.6rem] lg:text-[3rem]">
          {c.title}
        </h1>
        <p className="mt-4 max-w-[52ch] text-[1.02rem] leading-relaxed text-muted sm:text-[1.1rem]">{c.summary}</p>

        <dl className="mt-8 grid max-w-[860px] grid-cols-1 border-t border-rule sm:grid-cols-3">
          <div className="border-b border-rule py-4 sm:border-b-0 sm:pr-6">
            <dt className="eyebrow">Role</dt>
            <dd className="mt-2 text-[0.98rem]">
              <Text value={c.role} />
            </dd>
          </div>
          <div className="border-b border-rule py-4 sm:border-b-0 sm:px-6">
            <dt className="eyebrow">Period</dt>
            <dd className="mt-2 text-[0.98rem]">
              <Text value={c.period} />
            </dd>
          </div>
          <div className="py-4 sm:pl-6">
            <dt className="eyebrow">Focus</dt>
            <dd className="mt-2">
              <Tags items={c.tags} />
            </dd>
          </div>
        </dl>
      </Container>

      <Container className="pb-14 lg:pb-20">
        <ol className="border-b border-rule">
          {sections.map(({ key, label }, n) => {
            const section = c[key];
            return (
              <li
                key={key}
                className="grid grid-cols-1 gap-y-3 border-t border-rule py-6 lg:grid-cols-12 lg:gap-x-12 lg:py-8"
              >
                <div className="lg:col-span-3">
                  <h2 className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.75rem] text-accent">{String(n + 1).padStart(2, "0")}</span>
                    <span className="display text-[1.25rem] leading-none">{label}</span>
                  </h2>
                  {section.draft && (
                    <p className="eyebrow mt-3 text-todo">Draft · confirm or rewrite</p>
                  )}
                </div>
                <div className="prose-body max-w-[60ch] lg:col-span-8">
                  {key === "outcome" && c.figures && <Figures figures={c.figures} />}
                  <SectionBody section={section} />
                </div>
              </li>
            );
          })}
        </ol>

        <NextLinks slug={c.slug} />
      </Container>
    </article>
  );
}
