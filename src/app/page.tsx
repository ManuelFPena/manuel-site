import { ArrowLink } from "@/components/ArrowLink";
import { Container } from "@/components/Container";
import { Evolution } from "@/components/Evolution";
import { Fluency } from "@/components/Fluency";
import { Portrait } from "@/components/Portrait";
import { Principles } from "@/components/Principles";
import { Section } from "@/components/Section";
import { WorkList } from "@/components/WorkList";
import { contact, site } from "@/content/site";
import { isTodo } from "@/content/types";

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
      <Container className="pb-14 pt-10 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-20">
        <div className="flex items-center gap-4">
          <Portrait size={64} priority />
          <p className="eyebrow">
            <span className="block text-ink">{site.name}</span>
            {site.role} <span aria-hidden="true">·</span> {site.location}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-y-10 lg:mt-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-8">
            <h1 className="display max-w-[18ch] text-[2.1rem] leading-[1.08] sm:text-[2.75rem] lg:text-[3.4rem]">
              I build digital products with data, technology and{" "}
              <em className="italic text-accent">consumer insight.</em>
            </h1>
            <p className="mt-6 max-w-[52ch] text-[1.02rem] leading-relaxed text-muted sm:text-[1.1rem]">
              Ten years in analytics and e-commerce. Now I own a global consumer-care platform. I turn unclear problems
              into products teams can ship and measure.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.78rem] uppercase tracking-[0.06em]" aria-label="Contact">
              {[
                { label: "Email", value: contact.email, href: (v: string) => `mailto:${v}` },
                { label: "LinkedIn", value: contact.linkedin, href: (v: string) => v },
                { label: "GitHub", value: contact.github, href: (v: string) => v },
              ].map(({ label, value, href }) =>
                isTodo(value) ? null : (
                  <li key={label}>
                    <a
                      href={href(value)}
                      {...(label === "Email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                      className="link-underline pb-0.5 text-accent hover:text-ink"
                    >
                      {label}
                    </a>
                  </li>
                ),
              )}
            </ul>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <ArrowLink href="/work/">Selected work</ArrowLink>
              <ArrowLink href="/about/">About me</ArrowLink>
            </div>
          </div>

          {/* Signature: the intersection, set as a typographic stack */}
          <div className="lg:col-span-4">
            <p className="eyebrow mb-3">Where I work</p>
            <ul
              className="flex flex-wrap gap-x-3 gap-y-1 font-serif text-[1.05rem] lg:block lg:border-t lg:border-rule lg:text-[1.1rem]"
              aria-label="Disciplines"
            >
              {site.disciplines.map((d, i) => (
                <li
                  key={d}
                  className="flex items-baseline gap-2 leading-tight lg:gap-3 lg:border-b lg:border-rule lg:py-2.5 lg:leading-none"
                >
                  <span aria-hidden="true" className={`font-mono text-[0.8rem] text-accent lg:w-3 ${i === 0 ? "hidden lg:inline" : ""}`}>
                    {i === 0 ? "" : "×"}
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <Section id="thread" index="01" label="The thread" title="From reading the data to owning the decision.">
        <Evolution />
      </Section>

      <Section id="work" index="02" label="Selected work" title="Problems I have worked on.">
        <WorkList />
      </Section>

      <Section id="principles" index="03" label="How I work" title="Five principles.">
        <Principles />
      </Section>

      <Section id="fluency" index="04" label="Technical fluency" title="Not an engineer. Fluent with engineers.">
        <Fluency />
      </Section>
    </>
  );
}
