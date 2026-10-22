"use client";

import { Reveal } from "@/shared/ui/Reveal";

/** Content width for every desktop section: compact on 1280–1366, roomy but capped on 1920. */
export const container = "mx-auto w-full max-w-[1180px] px-[clamp(1.5rem,4vw,3rem)]";

/** Vertical rhythm: scales with viewport height so a laptop sees whole sections. */
export const sectionY = "py-[clamp(3.5rem,9vh,6rem)]";

/**
 * Tighter rhythm for sections that must fit one laptop screen below the 64px header
 * (Топтар, Галерея). `dvh` = the visible browser area, not the monitor resolution:
 * a 1366×768 laptop leaves only ≈ 630–650px for the page at 100% zoom.
 */
export const sectionYCompact = "py-[clamp(1.75rem,5.5dvh,3.5rem)]";

type HeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  id?: string;
  aside?: React.ReactNode;
  /** smaller title and spacing, for the sections that must fit one laptop screen */
  compact?: boolean;
};

export function SectionHeading({ eyebrow, title, intro, align = "left", id, aside, compact = false }: HeadingProps) {
  const titleSize = compact ? "text-[clamp(1.75rem,min(2.5vw,4.6dvh),2.5rem)]" : "text-[clamp(2rem,2.9vw,2.75rem)]";
  const gapBelow = compact ? "mb-[clamp(1rem,3dvh,1.75rem)]" : "mb-[clamp(1.75rem,4vh,2.75rem)]";
  if (align === "center") {
    return (
      <Reveal className={`mx-auto ${gapBelow} max-w-[40rem] text-center`}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className={`${compact ? "mt-2" : "mt-3"} ${titleSize} leading-[1.1] text-ink`}>
          {title}
        </h2>
        {intro && <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft">{intro}</p>}
      </Reveal>
    );
  }
  return (
    <Reveal className={`${gapBelow} flex items-end justify-between gap-10`}>
      <div className="max-w-[34rem]">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className={`${compact ? "mt-2" : "mt-3"} ${titleSize} leading-[1.1] text-ink`}>
          {title}
        </h2>
      </div>
      {(intro || aside) && (
        <div className="max-w-[24rem] pb-1 text-right">
          {intro && <p className="text-[0.975rem] leading-relaxed text-ink-soft">{intro}</p>}
          {aside}
        </div>
      )}
    </Reveal>
  );
}
