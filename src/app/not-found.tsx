import { ArrowLink } from "@/components/ArrowLink";
import { PageIntro } from "@/components/PageIntro";

export default function NotFound() {
  return (
    <PageIntro label="404" title="This page does not exist.">
      <p>The link may be old, or the page has moved.</p>
      <div className="mt-8">
        <ArrowLink href="/">Back to home</ArrowLink>
      </div>
    </PageIntro>
  );
}
