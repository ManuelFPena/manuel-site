import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected product and analytics work, plus personal projects: visual instruments and a book of sauces.",
  alternates: { canonical: "/work/" },
};

export default function WorkPage() {
  return (
    <>
      <PageIntro label="Work" title="Selected work.">
        <p>Product and analytics work in consumer care and D2C e-commerce, plus things I build for fun.</p>
      </PageIntro>
      <Container className="pb-14 lg:pb-20">
        <ProjectGrid projects={projects} showFilter headingLevel="h2" />
        <p className="mt-10 max-w-[60ch] text-[0.82rem] leading-relaxed text-faint">
          Confidential figures, systems and names are left out on purpose.
        </p>
      </Container>
    </>
  );
}
