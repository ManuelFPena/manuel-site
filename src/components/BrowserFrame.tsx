import Image, { type StaticImageData } from "next/image";

/** Shows the address without the protocol and "www.", like Safari's compact bar. */
function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "");
}

/**
 * A screenshot inside a simple macOS browser window: traffic lights and an
 * address bar. Pure markup, no images for the chrome.
 */
export function BrowserFrame({
  src,
  alt,
  url,
  priority = false,
  sizes = "(min-width: 1024px) 960px, 100vw",
}: {
  src: StaticImageData;
  alt: string;
  url: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-rule bg-white shadow-[0_1px_2px_rgba(39,38,67,0.06),0_18px_40px_-18px_rgba(39,38,67,0.35)]">
      <div className="flex items-center gap-3 border-b border-rule bg-surface px-3 py-2 sm:px-4">
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex min-w-0 max-w-[75%] flex-1 items-center justify-center gap-1.5 rounded-md bg-bg px-3 py-1 text-[0.72rem] text-muted">
          <svg aria-hidden="true" viewBox="0 0 12 12" className="h-2.5 w-2.5 shrink-0 fill-current opacity-70">
            <path d="M3.5 5V3.75a2.5 2.5 0 0 1 5 0V5h.25A1.25 1.25 0 0 1 10 6.25v3.5A1.25 1.25 0 0 1 8.75 11h-5.5A1.25 1.25 0 0 1 2 9.75v-3.5A1.25 1.25 0 0 1 3.25 5h.25Zm1.25 0h2.5V3.75a1.25 1.25 0 0 0-2.5 0V5Z" />
          </svg>
          <span className="truncate">{displayUrl(url)}</span>
        </div>
        <div className="w-[42px] shrink-0" aria-hidden="true" />
      </div>
      <Image src={src} alt={alt} placeholder="blur" priority={priority} sizes={sizes} className="block h-auto w-full" />
    </div>
  );
}

/** The same macOS window with a title instead of an address bar, for content built in HTML. */
export function AppWindow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-rule bg-bg shadow-[0_1px_2px_rgba(39,38,67,0.06),0_18px_40px_-18px_rgba(39,38,67,0.35)]">
      <div className="flex items-center gap-3 border-b border-rule bg-surface px-3 py-2 sm:px-4">
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <p className="mx-auto truncate text-[0.75rem] font-semibold text-muted">{title}</p>
        <div className="w-[42px] shrink-0" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}
