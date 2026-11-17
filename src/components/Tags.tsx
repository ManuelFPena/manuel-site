export function Tags({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-3 gap-y-1 ${className}`} aria-label="Topics">
      {items.map((t, i) => (
        <li key={t} className="font-mono text-[0.8rem] text-faint">
          {t}
          {i < items.length - 1 && <span aria-hidden="true" className="ml-3 text-rule">/</span>}
        </li>
      ))}
    </ul>
  );
}
