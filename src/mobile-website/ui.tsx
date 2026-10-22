"use client";

import { Reveal } from "@/shared/ui/Reveal";

/** Phone column: 16–20px gutters, capped so tablets don't get stretched cards. */
export const mContainer = "mx-auto w-full max-w-[36rem] px-[clamp(1rem,4.6vw,1.5rem)]";

export const mSectionY = "py-12";

export function MSectionHeading({ eyebrow, title, intro, id, center = false }: { eyebrow: string; title: string; intro?: string; id?: string; center?: boolean }) {
  return (
    <Reveal y={12} className={`mb-6 ${center ? "text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-[clamp(1.6rem,7.4vw,2rem)] leading-[1.15] text-ink">
        {title}
      </h2>
      {intro && <p className="mt-2 text-[0.925rem] leading-relaxed text-ink-soft">{intro}</p>}
    </Reveal>
  );
}
