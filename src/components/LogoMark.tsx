/**
 * A company logo drawn in the current text colour. The file is used as a mask,
 * so every logo reads as one set and follows light and dark mode.
 */
export function LogoMark({
  src,
  ratio,
  height,
  label,
  className = "",
}: {
  src: string;
  /** Width divided by height of the logo file. */
  ratio: number;
  height: number;
  label: string;
  className?: string;
}) {
  const mask = `url(${src}) left center / contain no-repeat`;
  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{ width: Math.round(height * ratio), height, WebkitMask: mask, mask }}
    />
  );
}
