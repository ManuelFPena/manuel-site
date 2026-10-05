import { isPrivate, isTodo, type Copy } from "@/content/types";

const hideTodos = process.env.NEXT_PUBLIC_HIDE_TODOS === "1";

/**
 * Private copy is shown while developing locally (or with NEXT_PUBLIC_SHOW_PRIVATE=1)
 * and removed from production builds.
 */
export const showPrivate =
  process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_SHOW_PRIVATE === "1";

/** Visible marker for content Manuel still needs to supply. */
export function TodoTag({ note }: { note: string }) {
  if (hideTodos) return null;
  return (
    <span
      className="inline-flex items-baseline gap-1.5 rounded-sm bg-todo-bg px-1.5 py-0.5 font-mono text-[0.72rem] leading-snug tracking-normal text-todo normal-case"
      title="Placeholder: replace in src/content"
    >
      <span aria-hidden="true" className="font-semibold">Input needed</span>
      <span className="sr-only">Input needed:</span>
      <span>{note}</span>
    </span>
  );
}

/** Local-only marker around copy not yet cleared for disclosure. */
export function PrivateMark({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm bg-private-bg px-1 text-ink outline-1 outline-dashed outline-private" title="Private: local only, not in builds">
      {children}
      <span className="ml-1.5 font-mono text-[0.65rem] uppercase tracking-[0.06em] text-private">Private</span>
    </span>
  );
}

/** Renders final copy, a TodoTag for placeholders, or private copy (local only). */
export function Text({ value }: { value: Copy }) {
  if (isTodo(value)) return <TodoTag note={value.todo} />;
  if (isPrivate(value)) return showPrivate ? <PrivateMark>{value.private}</PrivateMark> : null;
  return <>{value}</>;
}

/** True when a value renders nothing in the current build. */
export const isHidden = (value: Copy) => (hideTodos && isTodo(value)) || (!showPrivate && isPrivate(value));
