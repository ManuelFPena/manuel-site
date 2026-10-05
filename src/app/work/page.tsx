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
        <p>
          Product and analytics work across consumer care and D2C e-commerce. Each case follows the same shape: problem,
          context, my role, approach, decision, outcome.
        </p>
      </PageIntro>
      <Container className="pb-24 lg:pb-32">
        <WorkList headingLevel="h2" />
        <p className="mt-8 max-w-[60ch] text-[0.9rem] leading-relaxed text-faint">
          Some details are left out on purpose. Confidential figures, internal systems and names stay internal.
        </p>
      </Container>
    </>
  );
}
