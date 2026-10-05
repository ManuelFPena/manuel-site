import type { ReactNode } from "react";
import { Container } from "./Container";

/** Opening block for inner pages. Optional `aside` sits to the right on large screens. */
export function PageIntro({
  label,
  title,
  children,
  aside,
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <Container className="grid grid-cols-1 gap-y-10 pb-16 pt-16 sm:pt-24 lg:grid-cols-12 lg:gap-x-12 lg:pb-24 lg:pt-32">
      <div className={aside ? "lg:col-span-9" : "lg:col-span-12"}>
        <p className="eyebrow">{label}</p>
        <h1 className="display mt-6 max-w-[18ch] text-[2.6rem] leading-[1.04] sm:text-[3.6rem] lg:text-[4.4rem]">
          {title}
        </h1>
        {children && <div className="prose-body mt-8 max-w-[58ch] text-[1.15rem]">{children}</div>}
      </div>
      {aside && <div className="order-first lg:order-none lg:col-span-3 lg:flex lg:justify-end lg:pt-12">{aside}</div>}
    </Container>
  );
}
