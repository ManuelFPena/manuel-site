import Image from "next/image";
import { site } from "@/content/site";
import portrait from "../../public/manuel.jpg";

/** Circular portrait. Size in px; the source image is 480×480. */
export function Portrait({ size = 64, priority = false, className = "" }: { size?: number; priority?: boolean; className?: string }) {
  return (
    <Image
      src={portrait}
      alt={`Portrait of ${site.name}`}
      width={size}
      height={size}
      priority={priority}
      placeholder="blur"
      className={`shrink-0 rounded-full object-cover ring-1 ring-rule ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
