import type { Metadata } from "next";
import { ArrowLink } from "@/components/ArrowLink";
import { Evolution } from "@/components/Evolution";
import { PageIntro } from "@/components/PageIntro";
import { Portrait } from "@/components/Portrait";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "About",
  description:
    "From D2C e-commerce analytics to owning a global consumer-care platform. How Manuel Fernández works between the business, the consumer, the data and the technology.",
  alternates: { canonical: "/about/" },
};

const today = [
  {
    area: "Direction",
    items: ["Product vision, strategy and roadmap", "Backlog, user stories and prioritization", "Agile delivery with engineering"],
  },
  {
    area: "Experience",
    items: ["Customer journeys and product discovery", "E-commerce and consumer-care experiences", "Content platforms"],
  },
  {
    area: "Platform",
    items: ["Platform integrations", "APIs and data flows", "Localization and market requirements", "Compliance requirements"],
  },
  {
    area: "Evidence & delivery",
    items: ["Defining and monitoring key metrics", "Diagnosing issues from data and logs", "Communicating impact to business teams", "Managing cross-team dependencies"],
  },
];

const partners = [
  "Engineering",
  "UX & Design",
  "Marketing",
  "Consumer Care",
  "Operations",
  "Service",
  "Legal & Compliance",
  "Data",
  "Local markets",
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        label="About"
        title="I work between the business, the consumer, the data and the technology."
        aside={<Portrait size={200} priority className="h-[120px]! w-[120px]! sm:h-[160px]! sm:w-[160px]! lg:h-[200px]! lg:w-[200px]!" />}
      >
        <p>
          Ten years across analytics, e-commerce, consumer insight, CRM and commercial strategy. Now product ownership of
          a global digital platform.
        </p>
      </PageIntro>

      <Section index="01" label="Short version">
        <div className="prose-body max-w-[62ch] text-[1.15rem]">
          <p>
            I started on the analysis side. Leading <strong>D2C e-commerce insights and analytics</strong>, I worked
            with behavioral and commercial data across millions of consumer sessions: funnels, search, campaigns, CRM
            and lifecycle.
          </p>
          <p>
            The question that kept coming back was not <em>what happened</em>, but{" "}
            <strong>what should we do differently because of it</strong>. Answering that meant getting closer to the
            decisions themselves: priorities, requirements, experiments. That pulled me into product.
          </p>
          <p>
            Today I am <strong>Product Owner for Home.ID at Versuni</strong>, a global consumer-care platform for
            Philips-branded domestic appliances. The analytics background did not go away. It is how I decide.
          </p>
        </div>
      </Section>

      <Section index="02" label="The thread" title="Each step built on the one before.">
        <Evolution />
      </Section>

      <Section
        index="03"
        label="Today"
        title="What I own as Product Owner."
        intro={<p>The full product lifecycle of a platform used by consumers in many countries.</p>}
      >
        <dl className="border-b border-rule">
          {today.map((row) => (
            <div
              key={row.area}
              className="grid grid-cols-1 gap-y-3 border-t border-rule py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-x-8"
            >
              <dt className="display text-[1.4rem] leading-tight">{row.area}</dt>
              <dd>
                <ul className="space-y-1.5 text-[1rem] text-muted">
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
        index="04"
        label="Who I work with"
        title="One platform, many perspectives."
        intro={
          <p>
            The platform is global, but consumers, regulation and content are local. Much of the job is balancing the two,
            with these teams:
          </p>
        }
      >
        <ul className="flex max-w-[60ch] flex-wrap gap-x-2 gap-y-2 text-[1.05rem] text-ink" aria-label="Partner teams">
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
        <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
          <ArrowLink href="/work/">Selected work</ArrowLink>
          <ArrowLink href="/experience/">Experience</ArrowLink>
        </div>
      </Section>
    </>
  );
}
