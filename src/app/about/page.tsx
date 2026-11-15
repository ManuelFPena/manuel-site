import type { Metadata } from "next";
import { ArrowLink } from "@/components/ArrowLink";
import { PageIntro } from "@/components/PageIntro";
import { Portrait } from "@/components/Portrait";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "About",
  description:
    "From business intelligence and digital analytics to owning e-commerce martech and measurement at Versuni.",
  alternates: { canonical: "/about/" },
};

const today = [
  {
    area: "Domain",
    items: ["Own-commerce martech", "Onboarding and retention", "Long-term customer value"],
  },
  {
    area: "Data",
    items: ["App, CRM and e-commerce signals", "One customer view", "Channel attribution"],
  },
  {
    area: "Delivery",
    items: ["With engineering, UX and data engineering", "Pre- and post-purchase journeys", "Lifecycle journeys"],
  },
  {
    area: "Evidence",
    items: ["Experiments", "Behavioral data", "Product decisions"],
  },
];

const partners = [
  "Engineering",
  "UX & Design",
  "Data engineering",
  "CRM",
  "Marketing",
  "Commercial",
  "Consumer Care",
  "EU markets",
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        label="About"
        title="Between the business, the consumer, the data and the technology."
        aside={<Portrait size={160} priority className="h-[88px]! w-[88px]! sm:h-[120px]! sm:w-[120px]! lg:h-[160px]! lg:w-[160px]!" />}
      >
        <p>Ten years in analytics and e-commerce. Now a Product Manager working where data, systems and growth meet.</p>
      </PageIntro>

      <Section index="01" label="Short version">
        <div className="prose-body max-w-[60ch] sm:text-[1.05rem]">
          <p>
            I started in <strong>business intelligence</strong>, then moved into <strong>digital analytics</strong> at Under
            Armour and adidas: DTC revenue, app lifecycle, segmentation and user states. The question kept shifting from{" "}
            <em>what happened</em> to <strong>what should we do about it</strong>.
          </p>
          <p>
            At Versuni I first led an insights squad and acted as Product Manager for internal data products. Today I am{" "}
            <strong>Global Product Owner for E-Commerce Martech Measurement</strong>. I turn fragmented data and unclear
            problems into capabilities teams can build on.
          </p>
        </div>
      </Section>

      <Section
        index="02"
        label="Today"
        title="What I own."
      >
        <dl className="border-b border-rule">
          {today.map((row) => (
            <div
              key={row.area}
              className="grid grid-cols-1 gap-y-2 border-t border-rule py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-x-8"
            >
              <dt className="display text-[1.15rem] leading-tight">{row.area}</dt>
              <dd>
                <ul className="space-y-1 text-[0.95rem] text-muted">
                  {row.items.map((i) => (
                    <li key={i} className="flex gap-3">
                      <span aria-hidden="true" className="text-accent">
                        –
                      </span>
                      {i}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        index="03"
        label="Who I work with"
        title="One platform, many teams."
      >
        <ul className="flex max-w-[60ch] flex-wrap gap-x-2 gap-y-1.5 text-[0.98rem] text-ink" aria-label="Partner teams">
          {partners.map((p, i) => (
            <li key={p}>
              {p}
              {i < partners.length - 1 && (
                <span aria-hidden="true" className="ml-2 text-accent">
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <ArrowLink href="/work/">Selected work</ArrowLink>
          <ArrowLink href="/experience/">Experience</ArrowLink>
        </div>
      </Section>
    </>
  );
}
