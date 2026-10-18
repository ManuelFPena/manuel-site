import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { WorkList } from "@/components/WorkList";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected product and analytics work: a global consumer-care platform, D2C e-commerce optimization, search and discovery, and global market enablement.",
  alternates: { canonical: "/work/" },
};

export default function WorkPage() {
  return (
    <>
      <PageIntro label="Work" title="Selected work.">
        <p>Product and analytics work in consumer care and D2C e-commerce.</p>
      </PageIntro>
      <Container className="pb-14 lg:pb-20">
        <WorkList headingLevel="h2" />
        <p className="mt-6 max-w-[60ch] text-[0.82rem] leading-relaxed text-faint">
          Confidential figures, systems and names are left out on purpose.
        </p>
      </Container>
    </>
  );
}
