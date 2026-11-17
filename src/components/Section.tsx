import type { ReactNode } from "react";
import { Container } from "./Container";

/**
 * Editorial section: a numbered label in a narrow left column,
 * heading and content in the wide right column. Stacks on mobile.
 */
export function Section({
  id,
  index,
  label,
  title,
  intro,
  children,
  className = "",
}: {
  id?: string;
  index?: string;
  label: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section id={id} aria-labelledby={title ? headingId : undefined} className={`border-t border-rule ${className}`}>
      <Container className="grid grid-cols-1 gap-y-5 py-12 sm:py-14 lg:grid-cols-12 lg:gap-x-12 lg:py-16">
        <div className="lg:col-span-3">
          <p className="eyebrow lg:sticky lg:top-24 lg:pt-2">
            {label}
          </p>
        </div>
        <div className="lg:col-span-9">
          {title && (
            <h2 id={headingId} className="display max-w-[24ch] text-[1.6rem] leading-[1.15] sm:text-[1.9rem] lg:text-[2.1rem]">
              {title}
            </h2>
          )}
          {intro && <div className="prose-body mt-4 max-w-[60ch]">{intro}</div>}
          {children && <div className={title || intro ? "mt-8" : ""}>{children}</div>}
        </div>
      </Container>
    </section>
  );
}
