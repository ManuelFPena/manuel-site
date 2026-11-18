import type { StaticImageData } from "next/image";
import guaranteeHero from "../../public/projects/screens/guarantee-hero.jpg";
import guaranteeSteps from "../../public/projects/screens/guarantee-steps.jpg";
import guaranteeModels from "../../public/projects/screens/guarantee-models.jpg";
import serviceMap from "../../public/projects/screens/service-centers-map.jpg";
import productPage from "../../public/projects/screens/home-id-product-page.jpg";
import supportSearch from "../../public/projects/screens/support-search.jpg";
import homeIdLanding from "../../public/projects/home-id-landing.jpg";

/**
 * Screenshots and live links for case studies, by slug.
 * Only public pages. Never link to a URL that carries a personal or registration ID.
 */
export type Screen = { src: StaticImageData; alt: string; caption: string; url: string };
export type CaseMedia = { screens: Screen[]; links?: { href: string; label: string }[] };

export const caseMedia: Record<string, CaseMedia> = {
  "home-id": {
    screens: [
      {
        src: productPage,
        alt: "Home.ID product page for the Philips Airfryer 5000 Series, with a button to register the product",
        caption: "One page per model: register it, then find answers, parts and repair.",
        url: "https://www.home.id/en-GB/NA552",
      },
      {
        src: homeIdLanding,
        alt: "Home.ID landing page: My account, with buttons to create an account or log in",
        caption: "One account for every appliance, shared with the HomeID app.",
        url: "https://www.home.id/en-GB",
      },
    ],
    links: [{ href: "https://www.home.id/en-GB", label: "Visit Home.ID" }],
  },
  "search-product-discovery": {
    screens: [
      {
        src: supportSearch,
        alt: "Home.ID support search in Italian: the query BAR returns steam irons before the Baristina espresso machine",
        caption: "Searching “BAR”: the Baristina espresso machine comes fourth, behind irons that mention “6 bar”.",
        url: "https://www.home.id/it-IT/support",
      },
    ],
    links: [{ href: "https://www.home.id/it-IT/support", label: "Try the support search" }],
  },
  "service-center-locator": {
    screens: [
      {
        src: serviceMap,
        alt: "Home.ID service-centre locator for Italy: a searchable list beside a map with repair-centre pins",
        caption: "Search by name, address or phone, or start from your location. Every result ends in a call or directions.",
        url: "https://www.home.id/it-IT/service-centers",
      },
    ],
    links: [{ href: "https://www.home.id/it-IT/service-centers", label: "Open the live map (Italy)" }],
  },
  "satisfaction-guarantee": {
    screens: [
      {
        src: guaranteeHero,
        alt: "Philips satisfaction guarantee campaign page in Swedish, with buttons to create an account or log in",
        caption: "Campaign page per market. Sweden shown.",
        url: "https://www.home.id/sv-SE/campaign/philips-tilfredshedsgaranti",
      },
      {
        src: guaranteeSteps,
        alt: "Three steps to claim: log in or create a HomeID account, register the product, fill in the form",
        caption: "Three steps: account, product registration, claim form.",
        url: "https://www.home.id/sv-SE/campaign/philips-tilfredshedsgaranti",
      },
      {
        src: guaranteeModels,
        alt: "Grid of eligible model numbers, filterable by category",
        caption: "Eligible models, filterable by category. Registering one of them marks the product eligible.",
        url: "https://www.home.id/sv-SE/campaign/philips-tilfredshedsgaranti",
      },
    ],
    links: [{ href: "https://www.home.id/sv-SE/campaign/philips-tilfredshedsgaranti", label: "See the campaign page (Sweden)" }],
  },
};
