import { contact, site } from "@/content/site";
import { isTodo } from "@/content/types";
import { Container } from "./Container";
import { TodoTag } from "./Text";

function ContactLink({ label, value, kind }: { label: string; value: (typeof contact)["email"]; kind: "email" | "url" }) {
  return (
    <div className="flex flex-col gap-2 border-t border-rule py-5 sm:flex-row sm:items-baseline sm:justify-between">
      <span className="eyebrow">{label}</span>
      {isTodo(value) ? (
        <TodoTag note={value.todo} />
      ) : (
        <a
          href={kind === "email" ? `mailto:${value}` : value}
          {...(kind === "url" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="link-underline display pb-0.5 text-[1.5rem] leading-tight sm:text-[1.75rem]"
        >
          {kind === "email" ? value : value.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
        </a>
      )}
    </div>
  );
}

export function SiteFooter() {
  const built = new Date();
  const year = built.getFullYear();
  const updated = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(built);
  return (
    <footer id="contact" aria-labelledby="contact-heading" className="border-t border-rule bg-surface">
      <Container className="grid grid-cols-1 gap-y-10 py-20 lg:grid-cols-12 lg:gap-x-12 lg:py-28">
        <div className="lg:col-span-3">
          <p className="eyebrow">Contact</p>
        </div>
        <div className="lg:col-span-9">
          <h2 id="contact-heading" className="display max-w-[20ch] text-[2.2rem] leading-[1.08] sm:text-[3rem]">
            Working on a hard product problem? <span className="italic text-accent">Let&rsquo;s talk.</span>
          </h2>
          <p className="prose-body mt-5 max-w-[52ch]">
            Product, e-commerce, analytics or consumer experience. I am happy to compare notes.
          </p>
          <div className="mt-12 max-w-[760px] border-b border-rule">
            <ContactLink label="Email" value={contact.email} kind="email" />
            <ContactLink label="LinkedIn" value={contact.linkedin} kind="url" />
          </div>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-rule py-8 text-[0.85rem] text-faint sm:flex-row sm:justify-between">
        <p>
          © {year} {site.name}
        </p>
        <p>
          {site.location} <span aria-hidden="true">·</span> Last updated {updated}
        </p>
      </Container>
    </footer>
  );
}
