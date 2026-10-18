import { fluency } from "@/content/site";
import { Text } from "./Text";

export function Fluency() {
  return (
    <div className="grid grid-cols-1 gap-y-7 sm:grid-cols-3 sm:gap-x-8">
      {fluency.map((g) => (
        <div key={g.group}>
          <h3 className="eyebrow border-b border-rule pb-3 text-ink">{g.group}</h3>
          <ul className="mt-3 space-y-1.5 text-[0.95rem] text-muted">
            {g.items.map((item, i) => (
              <li key={i}>
                <Text value={item} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
