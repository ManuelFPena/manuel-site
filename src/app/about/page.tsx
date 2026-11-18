import type { Metadata } from "next";
import { LogoMark } from "@/components/LogoMark";
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

/** Employers so far. Logos are drawn in the text colour (LogoMark). Details live on Experience. */
type Logo = { src: string; ratio: number; label: string };
const employers: { name: string; sector: string; logo?: Logo; brands?: { logos: Logo[]; note: string } }[] = [
  {
    name: "Versuni",
    sector: "Home appliances",
    brands: {
      logos: [
        { src: "/logos/philips.svg", ratio: 350.6 / 64, label: "Philips" },
        { src: "/logos/saeco.png", ratio: 206 / 41, label: "Saeco" },
        { src: "/logos/senseo.png", ratio: 462 / 401, label: "Senseo" },
      ],
      note: "Philips (licensed), Saeco, Senseo",
    },
  },
  { name: "adidas", sector: "Sportswear", logo: { src: "/logos/adidas.svg", ratio: 74.4 / 44, label: "adidas" } },
  { name: "Under Armour", sector: "Sportswear", logo: { src: "/logos/under-armour.png", ratio: 800 / 455, label: "Under Armour" } },
  { name: "Banreservas", sector: "Banking", logo: { src: "/logos/banreservas.png", ratio: 564 / 525, label: "Banreservas" } },
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
            I have done this in-house, for a bank, two sportswear brands and a home-appliance company. I work for my
            employer the way I would for a client: they bring the problem, I bring the way of working.
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

      <Section index="03" label="Where I have worked">
        <ul className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-[2.3fr_1fr_1fr_1fr]" aria-label="Where I have worked">
          {employers.map((c) => (
            <li key={c.name} className="flex flex-col">
              <div className="flex h-9 items-center text-ink">
                {c.logo ? (
                  <LogoMark src={c.logo.src} ratio={c.logo.ratio} height={c.logo.ratio < 1.3 ? 36 : 30} label={c.logo.label} />
                ) : (
                  <p className="display text-[1.35rem] leading-none">{c.name}</p>
                )}
              </div>
              <p className="eyebrow mt-2">
                {c.logo ? `${c.name} · ` : ""}
                {c.sector}
              </p>
              {c.brands && (
                <div className="mt-3">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-ink">
                    {c.brands.logos.map((l) => (
                      <LogoMark key={l.label} src={l.src} ratio={l.ratio} height={l.ratio < 2 ? 32 : 16} label={l.label} />
                    ))}
                  </div>
                  <p className="mt-2 text-[0.8rem] text-faint">Brands: {c.brands.note}</p>
                </div>
              )}
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
