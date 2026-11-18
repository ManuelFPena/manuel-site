/**
 * The HomeID app user-state framework as a table: who each state is, what we want
 * from them, what we do and how we measure it. Rebuilt from Manuel's framework
 * slide, without internal figures.
 */
type State = { name: string; group: "not" | "foundational" | "advancing"; tone: string };

const states: State[] = [
  { name: "Churned", group: "not", tone: "bg-[#f6dfe3] text-[#8a2a3d] dark:bg-[#4a2430] dark:text-[#ffc9d3]" },
  { name: "Unengaged", group: "not", tone: "bg-[#f6dfe3] text-[#8a2a3d] dark:bg-[#4a2430] dark:text-[#ffc9d3]" },
  { name: "New", group: "foundational", tone: "bg-[#e3f6f5] text-[#272643] dark:bg-[#2c4f5c] dark:text-[#e3f6f5]" },
  { name: "Re-engaged", group: "advancing", tone: "bg-[#bae8e8] text-[#272643] dark:bg-[#2c698d] dark:text-white" },
  { name: "Engaged", group: "advancing", tone: "bg-[#2c698d] text-white" },
  { name: "Loyal", group: "advancing", tone: "bg-[#272643] text-white dark:bg-[#e3f6f5] dark:text-[#272643]" },
];

type Row = { label: string; cells: (string | string[] | { span: number; value: string | string[] })[] };

const rows: Row[] = [
  {
    label: "Who",
    cells: [
      "No session in the last 90 days",
      "No session in the last 30 days",
      "First session in the last 30 days",
      "Back last month after 30 to 90 days away",
      "Active last month and the month before, using key features",
      "Active last month and steadily over the previous 30 to 90 days and more",
    ],
  },
  {
    label: "Objective",
    cells: ["Reactivate", "Re-engage and secure marketing consent", "Marketing opt-in", "Re-engage and secure marketing consent", "Secure marketing consent", "Retention and loyalty"],
  },
  {
    label: "Key actions",
    cells: [
      ["Exit surveys", "Analyze churn patterns"],
      ["Outreach on the value proposition", "Simpler sign-up"],
      ["Clear opt-in incentives", "Transparency on data use"],
      { span: 2, value: ["Targeted opt-in campaigns", "Double opt-in to verify"] },
      ["Personalized content", "Loyalty programs"],
    ],
  },
  {
    label: "Success metrics",
    cells: [
      ["Churn rate", "Survey completion"],
      ["Sign-ups", "Engagement rate"],
      ["Opt-in rate", "Education campaign effectiveness", "Email deliverability"],
      { span: 2, value: ["Verified opt-ins", "Campaign conversion"] },
      ["Repeat engagement rate"],
    ],
  },
];

function Cell({ value }: { value: string | string[] }) {
  if (Array.isArray(value))
    return (
      <ul className="list-disc space-y-0.5 pl-3.5 marker:text-accent">
        {value.map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>
    );
  return <>{value}</>;
}

export function UserStateFramework() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] border-collapse text-left text-[0.8rem] leading-snug">
        <caption className="sr-only">HomeID app user-state framework: six states from churned to loyal, with objective, key actions and success metrics</caption>
        <thead>
          <tr className="text-[0.72rem] font-semibold">
            <th className="w-[13%] p-2" />
            <th colSpan={2} className="border-b-2 border-[#d9a3ae] p-2 text-center text-[#8a2a3d] dark:text-[#ffc9d3]">Not activated</th>
            <th className="border-b-2 border-rule p-2 text-center text-accent">Activated · foundational</th>
            <th colSpan={3} className="border-b-2 border-accent p-2 text-center text-accent">Activated · advancing</th>
          </tr>
          <tr className="text-[0.72rem] text-muted">
            <th className="p-2 font-medium">Targeting</th>
            <td colSpan={2} className="p-2" />
            <td className="p-2 text-center">Single channel, single actions</td>
            <td colSpan={3} className="p-2 text-center">Cross-channel, multi-step campaigns, inferred preferences</td>
          </tr>
          <tr>
            <th className="p-2 text-[0.72rem] font-medium text-muted">State</th>
            {states.map((s) => (
              <th key={s.name} className="p-1">
                <span className={`block rounded-md px-2 py-1.5 text-center text-[0.8rem] font-semibold ${s.tone}`}>{s.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-rule align-top">
              <th scope="row" className="p-2 text-[0.75rem] font-semibold text-ink">{r.label}</th>
              {r.cells.map((c, i) =>
                typeof c === "object" && !Array.isArray(c) ? (
                  <td key={i} colSpan={c.span} className="p-2 text-muted">
                    <Cell value={c.value} />
                  </td>
                ) : (
                  <td key={i} className="p-2 text-muted">
                    <Cell value={c} />
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
