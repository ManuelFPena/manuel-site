import { principles } from "@/content/site";

export function Principles() {
  return (
    <ol className="border-b border-rule">
      {principles.map((p, i) => (
        <li
          key={p.title}
          className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-rule py-7 sm:grid-cols-[3.5rem_1fr] md:grid-cols-[3.5rem_minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-x-8"
        >
          <span className="pt-1.5 font-mono text-[0.75rem] text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="display text-[1.5rem] leading-[1.15]">{p.title}</h3>
          <p className="col-start-2 mt-2 text-[0.98rem] leading-relaxed text-muted md:col-start-3 md:mt-0 md:pt-1">
            {p.text}
          </p>
        </li>
      ))}
    </ol>
  );
}
