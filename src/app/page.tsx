import { ArrowLink } from "@/components/ArrowLink";
import { Container } from "@/components/Container";
import { Evolution } from "@/components/Evolution";
import { Fluency } from "@/components/Fluency";
import { Portrait } from "@/components/Portrait";
import { Principles } from "@/components/Principles";
import { Section } from "@/components/Section";
import { WorkList } from "@/components/WorkList";
import Link from "next/link";
import { interests, pointers, site, strengths } from "@/content/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Product Owner",
  worksFor: { "@type": "Organization", name: "Versuni" },
  address: { "@type": "PostalAddress", addressLocality: "Amsterdam", addressCountry: "NL" },
  url: site.url,
  knowsAbout: ["Product management", "E-commerce", "Digital analytics", "Consumer experience", "Experimentation"],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      {/* Hero */}
      <Container className="pb-20 pt-14 sm:pt-20 lg:pb-28 lg:pt-28">
        <div className="flex items-center gap-4">
          <Portrait size={56} priority />
          <p className="eyebrow">
            <span className="block text-ink">{site.name}</span>
            {site.role} <span aria-hidden="true">·</span> {site.location}
          </p>
        </div>

        <h1 className="display mt-8 max-w-[15ch] text-[2.75rem] leading-[1.02] sm:text-[4rem] lg:text-[5.4rem] xl:text-[6rem]">
          I build digital products using data, technology and{" "}
          <em className="italic text-accent">consumer insight.</em>
        </h1>

        <div className="mt-14 grid grid-cols-1 gap-y-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-6">
            <p className="text-[1.15rem] leading-relaxed text-muted sm:text-[1.25rem]">
              I work where the customer, the business, the data and the technology meet. I started in analytics and
              e-commerce insight. Today I own a global consumer-care platform for Philips-branded home appliances.
            </p>
            <p className="mt-5 text-[1.15rem] leading-relaxed text-ink sm:text-[1.25rem]">
              The work: take an unclear problem, understand the data and systems behind it, and turn it into something a
              team can ship and measure.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              <ArrowLink href="/work/">Selected work</ArrowLink>
              <ArrowLink href="/about/">How I got here</ArrowLink>
            </div>
          </div>

          {/* Signature: the intersection, set as a typographic stack */}
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="eyebrow mb-4">Where I work</p>
            <ul className="border-t border-rule" aria-label="Disciplines">
              {site.disciplines.map((d, i) => (
                <li
                  key={d}
                  className="flex items-baseline gap-4 border-b border-rule py-3 font-serif text-[1.3rem] leading-none"
                >
                  <span aria-hidden="true" className="w-4 font-mono text-[0.85rem] text-accent">
                    {i === 0 ? "" : "×"}
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Proof, method, point of view */}
      <section aria-label="Overview" className="border-t border-rule">
        <Container className="grid grid-cols-1 sm:grid-cols-3">
          {pointers.map((p, i) => (
            <Link
              key={p.label}
              href={p.href}
              className={`group block py-10 sm:px-8 lg:py-12 ${i === 0 ? "sm:pl-0" : "border-t border-rule sm:border-l sm:border-t-0"} ${i === pointers.length - 1 ? "sm:pr-0" : ""}`}
            >
              <p className="eyebrow text-accent">{p.label}</p>
              <h2 className="display mt-4 text-[1.45rem] leading-[1.15] transition-colors group-hover:text-accent">
                {p.title}
              </h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{p.text}</p>
              <span aria-hidden="true" className="mt-5 inline-block text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent">→</span>
            </Link>
          ))}
        </Container>
      </section>

      <Section
        id="thread"
        index="01"
        label="The thread"
        title="From reading the data to owning the decision."
        intro={
          <p>
            My career has followed one line: understand behavior, then use it to decide what to build. That order still
            shapes how I work.
          </p>
        }
      >
        <Evolution />
        <div className="mt-12">
          <ArrowLink href="/about/">More on the background</ArrowLink>
        </div>
      </Section>

      <Section
        id="value"
        index="02"
        label="Where I add value"
        title="The problems I am best at."
      >
        <ol className="grid grid-cols-1 border-t border-rule sm:grid-cols-2">
          {strengths.map((st, i) => (
            <li
              key={st.title}
              className={`border-b border-rule py-7 sm:pr-8 ${i % 2 === 1 ? "sm:border-l sm:pl-8 sm:pr-0" : ""} ${i === strengths.length - 1 && i % 2 === 0 ? "sm:col-span-2" : ""}`}
            >
              <p className="font-mono text-[0.75rem] text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="display mt-3 text-[1.5rem] leading-[1.15]">{st.title}</h3>
              <p className="mt-2 max-w-[44ch] text-[0.98rem] leading-relaxed text-muted">{st.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="work"
        index="03"
        label="Selected work"
        title="Problems I have worked on."
        intro={<p>Each case follows the same shape: problem, context, role, approach, decision, outcome.</p>}
      >
        <WorkList />
      </Section>

      <Section id="principles" index="04" label="How I work" title="Five working principles.">
        <Principles />
      </Section>

      <Section
        id="fluency"
        index="05"
        label="Technical fluency"
        title="Fluent enough to ask the right questions."
        intro={
          <p>
            I am not an engineer. I work comfortably with engineering and data teams: reading API specs, tracing data
            flows, querying data, and spotting where systems constrain product choices.
          </p>
        }
      >
        <p className="eyebrow mb-6">Environments I have worked in</p>
        <Fluency />
      </Section>

      <Section
        id="interests"
        index="06"
        label="Curious about"
        title="How data, AI and experimentation can make product decisions better."
      >
        <ul className="flex max-w-[60ch] flex-wrap gap-x-2 gap-y-2 text-[1.05rem] text-muted" aria-label="Interests">
          {interests.map((t, i) => (
            <li key={t}>
              {t}
              {i < interests.length - 1 && (
                <span aria-hidden="true" className="ml-2 text-accent">
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <ArrowLink href="/thinking/">Notes in progress</ArrowLink>
        </div>
      </Section>
    </>
  );
}
