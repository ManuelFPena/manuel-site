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
    <Container className="grid grid-cols-1 gap-y-6 pb-10 pt-10 sm:pb-12 sm:pt-14 lg:grid-cols-12 lg:gap-x-12 lg:pb-14 lg:pt-20">
      <div className={aside ? "lg:col-span-9" : "lg:col-span-12"}>
        <p className="eyebrow">{label}</p>
        <h1 className="display mt-4 max-w-[20ch] text-[2.1rem] leading-[1.08] sm:text-[2.6rem] lg:text-[3rem]">
          {title}
        </h1>
        {children && <div className="prose-body mt-5 max-w-[56ch] sm:text-[1.08rem]">{children}</div>}
      </div>
      {aside && <div className="order-first lg:order-none lg:col-span-3 lg:flex lg:justify-end lg:pt-8">{aside}</div>}
    </Container>
  );
}
