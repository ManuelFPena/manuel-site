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
      className={`group inline-flex items-center gap-2 text-[0.95rem] font-medium text-ink ${className}`}
    >
      <span className="link-underline pb-0.5">{children}</span>
      <span
        aria-hidden="true"
        className="text-accent transition-transform duration-300 ease-out group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
