import type { Metadata } from "next";
import { ArrowLink } from "@/components/ArrowLink";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { Tags } from "@/components/Tags";
import { Text, TodoTag } from "@/components/Text";
import { contact, fluency, site } from "@/content/site";
import { chapters, education, languages } from "@/content/experience";
import { isTodo } from "@/content/types";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Career timeline of Manuel Fernández: business intelligence, digital analytics at Under Armour and adidas, data products and product ownership at Versuni.",
  alternates: { canonical: "/experience/" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageIntro label="Experience" title={site.headline}>
        <p>{site.profile}</p>
      </PageIntro>

      <Container className="pb-14 lg:pb-20">
        <ol className="border-b border-rule">
          {chapters.map((ch, ci) => (
            <li key={ch.label} className="grid grid-cols-1 gap-y-4 border-t border-rule py-8 lg:grid-cols-12 lg:gap-x-12 lg:py-10">
              <div className="lg:col-span-4">
                <p className="font-mono text-[0.75rem] text-accent">
                  Chapter {String(chapters.length - ci).padStart(2, "0")}
                </p>
                <h2 className="display mt-2 text-[1.5rem] leading-[1.1]">{ch.label}</h2>
                <p className="mt-1.5 max-w-[30ch] text-[0.92rem] leading-relaxed text-muted">{ch.theme}</p>
              </div>

              <div className="space-y-8 lg:col-span-8">
                {ch.roles.map((r, ri) => (
                  <div key={ri} className="grid grid-cols-1 gap-y-2 sm:grid-cols-[9rem_1fr] sm:gap-x-6">
                    <p className="eyebrow pt-1.5">
                      <Text value={r.period} />
                    </p>
                    <div>
                      <h3 className="text-[1.08rem] font-medium leading-snug tracking-[-0.01em]">
                        <Text value={r.title} />
                      </h3>
                      <p className="mt-0.5 text-[0.95rem] text-muted">
                        <Text value={r.org} />
                      </p>
                      {r.bullets ? (
                        <ul className="mt-2 max-w-[60ch] list-disc space-y-1.5 pl-4 text-[0.95rem] leading-relaxed text-muted marker:text-accent">
                          {r.bullets.map((b, bi) => (
                            <li key={bi}>
                              <Text value={b} />
                            </li>
                          ))}
                        </ul>
                      ) : r.line ? (
                        <p className="mt-2 max-w-[56ch] text-[0.95rem] leading-relaxed text-muted">
                          <Text value={r.line} />
                        </p>
                      ) : null}
                      <Tags items={r.focus} className="mt-3" />
                    </div>
                  </div>
                ))}
              </div>
            </li>
          ))}

          <li className="grid grid-cols-1 gap-y-4 border-t border-rule py-8 lg:grid-cols-12 lg:gap-x-12 lg:py-10">
            <div className="lg:col-span-4">
              <h2 className="display text-[1.5rem] leading-[1.1]">Education</h2>
            </div>
            <div className="space-y-6 lg:col-span-8">
              {education.map((e, i) => (
                <div key={i} className="grid grid-cols-1 gap-y-2 sm:grid-cols-[9rem_1fr] sm:gap-x-6">
                  <p className="eyebrow pt-1.5">
                    <Text value={e.period} />
                  </p>
                  <div>
                    <h3 className="text-[1.08rem] font-medium leading-snug">
                      <Text value={e.title} />
                    </h3>
                    <p className="mt-1 text-muted">
                      <Text value={e.org} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </li>

          <li className="grid grid-cols-1 gap-y-4 border-t border-rule py-8 lg:grid-cols-12 lg:gap-x-12 lg:py-10">
            <div className="lg:col-span-4">
              <h2 className="display text-[1.5rem] leading-[1.1]">Toolkit</h2>
            </div>
            <div className="space-y-4 lg:col-span-8">
              {fluency.map((g) => (
                <div key={g.group} className="grid grid-cols-1 gap-y-1 sm:grid-cols-[9rem_1fr] sm:gap-x-6">
                  <p className="eyebrow pt-1">{g.group}</p>
                  <ul className="flex flex-wrap gap-x-2 gap-y-1 text-[0.95rem] text-muted" aria-label={g.group}>
                    {g.items.map((item, i) => (
                      <li key={i}>
                        <Text value={item} />
                        {i < g.items.length - 1 && (
                          <span aria-hidden="true" className="ml-2 text-accent">
                            ·
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>

          <li className="grid grid-cols-1 gap-y-4 border-t border-rule py-8 lg:grid-cols-12 lg:gap-x-12 lg:py-10">
            <div className="lg:col-span-4">
              <h2 className="display text-[1.5rem] leading-[1.1]">Languages</h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="flex flex-wrap gap-x-2 gap-y-1.5 text-[0.98rem]" aria-label="Languages">
                {languages.map((l, i) => (
                  <li key={l}>
                    {l}
                    {i < languages.length - 1 && (
                      <span aria-hidden="true" className="ml-2 text-accent">
                        ·
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ol>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <ArrowLink href="/about/">The story behind it</ArrowLink>
          {isTodo(contact.cv) ? (
            <TodoTag note={contact.cv.todo} />
          ) : (
            <a href={contact.cv} className="link-underline pb-0.5 text-[0.95rem] font-medium">
              Download CV (PDF)
            </a>
          )}
        </div>
      </Container>
    </>
  );
}
