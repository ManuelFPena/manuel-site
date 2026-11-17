import Image from "next/image";
import type { CoverTone, ProjectCard } from "@/content/projects";
import { FieldStudyThumb } from "./instruments/FieldStudyThumb";
import { SauceMapThumb } from "./sauces/SauceMapThumb";

/** Muted colour pairs. Both themes use them as-is: covers read like printed tiles. */
const toneStyle: Record<CoverTone, { bg: string; ink: string; soft: string }> = {
  green: { bg: "#272643", ink: "#e3f6f5", soft: "#bae8e8" },
  sand: { bg: "#e3f6f5", ink: "#272643", soft: "#2c698d" },
  clay: { bg: "#bae8e8", ink: "#272643", soft: "#2c698d" },
  ink: { bg: "#2c698d", ink: "#ffffff", soft: "#bae8e8" },
};

/**
 * A project's cover at 4:3. A screenshot when there is one; otherwise a typographic
 * tile with the project's mark, a fine grid and a few circles.
 */
export function ProjectCover({ project, priority = false }: { project: ProjectCard; priority?: boolean }) {
  if (project.interactive === "book-of-sauces") return <SauceMapThumb />;
  if (project.interactive === "visual-instruments") return <FieldStudyThumb />;
  if (project.image) {
    return (
      <Image
        src={project.image.src}
        alt={project.image.alt}
        placeholder="blur"
        priority={priority}
        sizes="(min-width: 1024px) 520px, (min-width: 640px) 50vw, 100vw"
        className="aspect-[4/3] h-auto w-full object-cover"
      />
    );
  }

  const t = toneStyle[project.tone ?? "ink"];
  return (
    <div
      role="img"
      aria-label={`Cover for ${project.title}`}
      className="relative flex aspect-[4/3] w-full flex-col justify-between overflow-hidden p-5 sm:p-6"
      style={{ background: t.bg, color: t.ink }}
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="none">
        <defs>
          <pattern id={`g-${project.slug}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke={t.soft} strokeOpacity="0.18" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#g-${project.slug})`} />
        <circle cx="318" cy="92" r="46" fill="none" stroke={t.soft} strokeOpacity="0.55" />
        <circle cx="318" cy="92" r="22" fill={t.soft} fillOpacity="0.35" />
        <circle cx="262" cy="150" r="9" fill={t.soft} fillOpacity="0.6" />
      </svg>
      <span className="relative font-mono text-[0.8rem] opacity-70">
        {project.kind === "personal" ? "Personal" : "Work"}
      </span>
      <span className="display relative text-[2.4rem] leading-none sm:text-[2.8rem]">{project.mark ?? project.title}</span>
    </div>
  );
}
