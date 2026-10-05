import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { caseStudies } from "@/content/work";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about/", "/work/", "/experience/", "/thinking/"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p || "/"}`, changeFrequency: "monthly" as const })),
    ...caseStudies.map((c) => ({ url: `${site.url}/work/${c.slug}/`, changeFrequency: "yearly" as const })),
  ];
}
