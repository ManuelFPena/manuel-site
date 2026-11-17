import Link from "next/link";
import type { ReactNode } from "react";

export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[0.92rem] font-medium text-ink ${className}`}
    >
      <span className="link-underline pb-0.5">{children}</span>
    </Link>
  );
}
