import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { posts, workingTitles } from "@/content/thinking";

export const metadata: Metadata = {
  title: "Thinking",
  description:
    "Short notes on product, e-commerce, analytics, AI, experimentation and digital platforms by Manuel Fernández.",
  alternates: { canonical: "/thinking/" },
};

const dateFmt = new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "short", day: "numeric" });

export default function ThinkingPage() {
  return (
    <>
      <PageIntro label="Thinking" title="Notes on product, data and decisions.">
        <p>
          Short pieces on product, e-commerce, analytics, AI, experimentation and digital platforms. Practical, not
          theoretical.
        </p>
      </PageIntro>

      <Container className="pb-24 lg:pb-32">
        {posts.length > 0 && (
          <section aria-labelledby="published" className="mb-20">
            <h2 id="published" className="eyebrow mb-6">
              Published
            </h2>
            <ul className="border-b border-rule">
              {posts.map((p) => (
                <li key={p.slug} className="grid grid-cols-1 gap-2 border-t border-rule py-8 sm:grid-cols-[10rem_1fr]">
                  <time dateTime={p.date} className="eyebrow pt-1.5">
                    {dateFmt.format(new Date(p.date))}
                  </time>
                  <div>
                    <h3 className="display text-[1.7rem] leading-tight">{p.title}</h3>
                    <p className="mt-2 text-muted">{p.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="in-progress">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 id="in-progress" className="eyebrow">
              In progress
            </h2>
            <p className="eyebrow">Working titles</p>
          </div>
          <ul className="border-b border-rule">
            {workingTitles.map((w) => (
              <li
                key={w.title}
                className="grid grid-cols-1 gap-y-2 border-t border-rule py-8 sm:grid-cols-[10rem_1fr] sm:gap-x-8"
              >
                <p className="eyebrow pt-2 text-accent">{w.topic}</p>
                <div>
                  <h3 className="display text-[1.7rem] leading-tight text-ink/80">{w.title}</h3>
                  <p className="mt-2 max-w-[56ch] text-muted">{w.line}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
