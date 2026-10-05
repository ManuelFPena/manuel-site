import { evolution } from "@/content/site";

/**
 * The central narrative as a four-step sequence.
 * Each step's top rule darkens progressively; the last one is the accent ("now").
 */
export function Evolution() {
  return (
    <ol className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-6">
      {evolution.map((s, i) => {
        const last = i === evolution.length - 1;
        return (
          <li key={s.step} className="relative">
            <div
              aria-hidden="true"
              className={`h-[2px] w-full ${last ? "bg-accent" : "bg-ink"}`}
              style={last ? undefined : { opacity: 0.15 + i * 0.2 }}
            />
            <div className="mt-5 flex items-baseline justify-between">
              <span className="font-mono text-[0.75rem] text-accent">{s.step}</span>
              {last && <span className="eyebrow text-accent">Now</span>}
            </div>
            <h3 className="display mt-3 text-[1.45rem] leading-[1.15]">{s.label}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{s.text}</p>
          </li>
        );
      })}
    </ol>
  );
}
