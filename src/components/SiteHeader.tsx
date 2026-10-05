"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Container } from "./Container";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => href.startsWith("/") && pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-rule/60 bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/75">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="group flex items-baseline gap-3" aria-label={`${site.name}, home`}>
          <span className="font-serif text-[1.2rem] tracking-[-0.01em]">{site.name}</span>
          <span className="eyebrow hidden md:inline">{site.location}</span>
        </Link>

        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="flex items-center gap-7 text-[0.92rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`link-underline pb-0.5 transition-colors ${
                    isActive(item.href) ? "text-ink [background-size:100%_1px]" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="eyebrow -mr-2 p-2 text-ink sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 bg-bg sm:hidden"
      >
        <Container>
          <nav aria-label="Mobile">
            <ul className="divide-y divide-rule border-t border-rule">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex items-baseline justify-between py-5"
                  >
                    <span className="display text-[2rem] leading-none">{item.label}</span>
                    <span className="eyebrow">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </header>
  );
}
