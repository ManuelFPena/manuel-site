import type { Metadata } from "next";
import { ArrowLink } from "@/components/ArrowLink";
import { PageIntro } from "@/components/PageIntro";
import { Portrait } from "@/components/Portrait";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Manuel Fernández works: making unclear problems clear, connecting scattered data, and measuring what gets built.",
  alternates: { canonical: "/about/" },
};

/** What a team gets, phrased as outcomes rather than job duties. */
const bring = [
  { area: "Clarity", text: "A vague goal turned into a defined problem, a decision and a plan." },
  { area: "Connected data", text: "Scattered sources joined into one view that teams trust and use." },
  { area: "Measurement", text: "Success agreed before anything is built, so results can be read." },
  { area: "Delivery", text: "Work with engineering, design and data to ship in small steps." },
];

/** Companies framed as clients: who I have done this work for. Details live on Experience. */
const clients = [
  { name: "Versuni", sector: "Home appliances" },
  { name: "adidas", sector: "Sportswear" },
  { name: "Under Armour", sector: "Sportswear" },
  { name: "Banreservas", sector: "Banking" },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        label="About"
        title="I make unclear problems clear enough to build and measure."
        aside={<Portrait size={160} priority className="h-[88px]! w-[88px]! sm:h-[120px]! sm:w-[120px]! lg:h-[160px]! lg:w-[160px]!" />}
      >
        <p>Product Manager in Amsterdam, working where data, systems and growth meet.</p>
      </PageIntro>

      <Section index="01" label="How I work">
        <div className="prose-body max-w-[60ch] sm:text-[1.05rem]">
          <p>
            Most problems I take on start messy. The data sits in different tools, the question is vague, and nobody owns
            the answer yet. My job is to make the problem clear, decide what is worth building, and set up a way to know if
            it worked.
          </p>
          <p>
            I have done this for a bank, two sportswear brands and a home-appliance company. I see each as a client: they
            bring the problem, I bring the way of working.
          </p>
        </div>
      </Section>

      <Section index="02" label="What I bring">
        <dl className="border-b border-rule">
          {bring.map((row) => (
            <div
              key={row.area}
              className="grid grid-cols-1 gap-y-1 border-t border-rule py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-x-8"
            >
              <dt className="display text-[1.15rem] leading-tight">{row.area}</dt>
              <dd className="text-[0.95rem] leading-relaxed text-muted">{row.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section index="03" label="Clients so far">
        <ul className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4" aria-label="Clients so far">
          {clients.map((c) => (
            <li key={c.name}>
              <p className="display text-[1.2rem] leading-tight">{c.name}</p>
              <p className="eyebrow mt-1">{c.sector}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <ArrowLink href="/work/">Selected work</ArrowLink>
          <ArrowLink href="/experience/">Roles and dates</ArrowLink>
        </div>
      </Section>
    </>
  );
}
