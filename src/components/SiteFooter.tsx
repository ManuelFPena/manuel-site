import { contact, site } from "@/content/site";
import { isTodo } from "@/content/types";
import { Container } from "./Container";
import { TodoTag } from "./Text";

const links: { label: string; value: (typeof contact)["email"]; kind: "email" | "url" }[] = [
  { label: "Email", value: contact.email, kind: "email" },
  { label: "LinkedIn", value: contact.linkedin, kind: "url" },
  { label: "GitHub", value: contact.github, kind: "url" },
];

const display = (v: string, kind: "email" | "url") =>
  kind === "email" ? v : v.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" aria-labelledby="contact-heading" className="border-t border-rule bg-surface">
      <Container className="grid grid-cols-1 gap-y-5 py-12 sm:py-14 lg:grid-cols-12 lg:gap-x-12 lg:py-16">
        <div className="lg:col-span-3">
          <p className="eyebrow lg:pt-2">Contact</p>
        </div>
        <div className="lg:col-span-9">
          <h2 id="contact-heading" className="display max-w-[24ch] text-[1.6rem] leading-[1.15] sm:text-[1.9rem]">
            Working on a hard product problem? Let&rsquo;s talk.
          </h2>
          <dl className="mt-8 grid grid-cols-1 gap-y-5 border-t border-rule pt-6 sm:grid-cols-3 sm:gap-x-8">
            {links.map(({ label, value, kind }) => (
              <div key={label} className="min-w-0">
                <dt className="eyebrow">{label}</dt>
                <dd className="mt-1.5">
                  {isTodo(value) ? (
                    <TodoTag note={value.todo} />
                  ) : (
                    <a
                      href={kind === "email" ? `mailto:${value}` : value}
                      {...(kind === "url" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="link-underline break-words pb-0.5 text-[0.98rem] text-ink hover:text-accent"
                    >
                      {display(value, kind)}
                    </a>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
      <div className="border-t border-rule">
        <Container className="flex items-center justify-between gap-4 py-5 text-[0.8rem] text-faint">
          <p>
            © {year} {site.name}
          </p>
          <p>{site.location}</p>
        </Container>
      </div>
    </footer>
  );
}
