import type { Metadata } from "next";
import { ArrowLink } from "@/components/ArrowLink";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { Tags } from "@/components/Tags";
import { Text, TodoTag } from "@/components/Text";
import { contact } from "@/content/site";
import { chapters, education } from "@/content/experience";
import { isTodo } from "@/content/types";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Career timeline of Manuel Fernández: consumer insight and CRM, D2C e-commerce analytics, and product ownership of a global consumer-care platform.",
  alternates: { canonical: "/experience/" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageIntro label="Experience" title="Three chapters, one direction.">
        <p>From understanding consumers, to analysing how they buy, to owning the product they use. Newest first.</p>
      </PageIntro>

      <Container className="pb-20 lg:pb-28">
        <ol className="border-b border-rule">
          {chapters.map((ch, ci) => (
            <li key={ch.label} className="grid grid-cols-1 gap-y-6 border-t border-rule py-12 lg:grid-cols-12 lg:gap-x-12 lg:py-16">
              <div className="lg:col-span-4">
                <p className="font-mono text-[0.75rem] text-accent">
                  Chapter {String(chapters.length - ci).padStart(2, "0")}
                </p>
                <h2 className="display mt-3 text-[2rem] leading-[1.08]">{ch.label}</h2>
                <p className="mt-3 max-w-[30ch] text-[0.98rem] leading-relaxed text-muted">{ch.theme}</p>
              </div>

              <div className="lg:col-span-8">
                {ch.roles.map((r, ri) => (
                  <div key={ri} className="grid grid-cols-1 gap-y-3 sm:grid-cols-[10rem_1fr] sm:gap-x-8">
                    <p className="eyebrow pt-1.5">
                      <Text value={r.period} />
                    </p>
                    <div>
                      <h3 className="text-[1.25rem] font-medium leading-snug tracking-[-0.01em]">
                        <Text value={r.title} />
                      </h3>
                      <p className="mt-1 text-[1rem] text-muted">
                        <Text value={r.org} />
                      </p>
                      <p className="mt-4 max-w-[56ch] text-[1rem] leading-relaxed text-muted">
                        <Text value={r.line} />
                      </p>
                      <Tags items={r.focus} className="mt-5" />
                    </div>
                  </div>
                ))}
              </div>
            </li>
          ))}

          <li className="grid grid-cols-1 gap-y-6 border-t border-rule py-12 lg:grid-cols-12 lg:gap-x-12 lg:py-16">
            <div className="lg:col-span-4">
              <h2 className="display text-[2rem] leading-[1.08]">Education</h2>
            </div>
            <div className="lg:col-span-8">
              {education.map((e, i) => (
                <div key={i} className="grid grid-cols-1 gap-y-3 sm:grid-cols-[10rem_1fr] sm:gap-x-8">
                  <p className="eyebrow pt-1.5">
                    <Text value={e.period} />
                  </p>
                  <div>
                    <h3 className="text-[1.25rem] font-medium leading-snug">
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
        </ol>

        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
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
