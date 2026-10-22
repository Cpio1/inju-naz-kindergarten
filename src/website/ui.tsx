"use client";

import { Reveal } from "@/shared/ui/Reveal";

/** Content width for every desktop section: compact on 1280–1366, roomy but capped on 1920. */
export const container = "mx-auto w-full max-w-[1180px] px-[clamp(1.5rem,4vw,3rem)]";

/** Vertical rhythm: scales with viewport height so a laptop sees whole sections. */
export const sectionY = "py-[clamp(3.5rem,9vh,6rem)]";

type HeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  id?: string;
  aside?: React.ReactNode;
};

export function SectionHeading({ eyebrow, title, intro, align = "left", id, aside }: HeadingProps) {
  if (align === "center") {
    return (
      <Reveal className="mx-auto mb-[clamp(1.75rem,4vh,2.75rem)] max-w-[40rem] text-center">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="mt-3 text-[clamp(2rem,2.9vw,2.75rem)] leading-[1.1] text-ink">
          {title}
        </h2>
        {intro && <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft">{intro}</p>}
      </Reveal>
    );
  }
  return (
    <Reveal className="mb-[clamp(1.75rem,4vh,2.75rem)] flex items-end justify-between gap-10">
      <div className="max-w-[34rem]">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="mt-3 text-[clamp(2rem,2.9vw,2.75rem)] leading-[1.1] text-ink">
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
