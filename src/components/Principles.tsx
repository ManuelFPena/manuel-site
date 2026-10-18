import { principles } from "@/content/site";

export function Principles() {
  return (
    <ol className="border-b border-rule">
      {principles.map((p, i) => (
        <li
          key={p.title}
          className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-t border-rule py-4 sm:grid-cols-[3rem_1fr] md:grid-cols-[3rem_minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-x-8 md:py-5"
        >
          <span className="pt-1 font-mono text-[0.75rem] text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="display text-[1.2rem] leading-[1.2]">{p.title}</h3>
          <p className="col-start-2 mt-1 text-[0.95rem] leading-relaxed text-muted md:col-start-3 md:mt-0 md:pt-0.5">
            {p.text}
          </p>
        </li>
      ))}
    </ol>
  );
}
