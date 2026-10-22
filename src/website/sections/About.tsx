"use client";

import { sectionIds } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import type { Media } from "@/shared/lib/media";
import { ABOUT_SIZES } from "@/shared/lib/media-sizes";
import { Pearl, PetalFlower, Sparkle, Swirl } from "@/shared/ui/Decor";
import { accentTints, statIcons, tintSurface } from "@/shared/ui/Icons";
import { MediaView } from "@/shared/ui/MediaView";
import { Reveal } from "@/shared/ui/Reveal";
import { container, sectionY } from "../ui";

const shapes = ["shape-a", "shape-b", "shape-d", "shape-c"];

export function About({ media }: { media: Media | null }) {
  const { t } = useLang();
  const a = t.about;

  return (
    <section id={sectionIds.about} data-section aria-labelledby="about-title" className={`relative ${sectionY}`}>
      <div className={`${container} grid grid-cols-[0.95fr_1.05fr] items-center gap-[clamp(2.5rem,5vw,5rem)]`}>
        <div>
          <Reveal>
            <p className="eyebrow">{a.eyebrow}</p>
            <h2 id="about-title" className="mt-3 text-[clamp(2rem,2.9vw,2.75rem)] leading-[1.1] text-ink">
              {a.title}
            </h2>
            <p className="mt-4 max-w-[46ch] text-[clamp(0.975rem,1.05vw,1.05rem)] leading-[1.7] text-ink-soft">{a.text}</p>
          </Reveal>

          <Reveal delay={0.1} className="relative mt-[clamp(1.5rem,3.5vh,2.25rem)]">
            <div className="relative aspect-[16/9] max-h-[min(34svh,290px)] w-full overflow-hidden rounded-[2.5rem_1rem_2.5rem_2.5rem] shadow-float">
              <MediaView media={media} alt={a.mediaAlt} sizes={ABOUT_SIZES} placeholder={t.hero.placeholder} />
            </div>
            <Swirl className="absolute -right-8 -bottom-7 w-24" color="#dcd1f4" />
            <Pearl tint="turquoise" className="absolute -top-3 -left-3 w-7" />
          </Reveal>
        </div>

        <div className="relative">
          <ul className="grid grid-cols-2 gap-[clamp(0.9rem,1.6vw,1.25rem)]">
            {a.stats.map((stat, i) => {
              const Icon = statIcons[i];
              const tint = accentTints[i];
              return (
                <Reveal as="li" key={i} delay={0.06 * i} className={i % 2 === 1 ? "translate-y-6" : ""}>
                  <article
                    className={`nacre ${shapes[i]} group relative h-full overflow-hidden border border-white p-[clamp(1.1rem,1.8vw,1.6rem)] shadow-pearl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-float`}
                  >
                    <span className={`grid h-11 w-11 place-items-center rounded-[1rem_0.6rem_1rem_0.6rem] ${tintSurface[tint]}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-[clamp(0.9rem,2vh,1.4rem)] text-[clamp(1.5rem,2.1vw,1.95rem)] leading-tight text-ink">{stat.value}</h3>
                    <p className="mt-1.5 text-[0.9rem] leading-snug text-ink-soft">{stat.label}</p>
                    <Pearl tint={tint} className="absolute top-4 right-4 w-4 opacity-80 transition-transform duration-500 group-hover:scale-125" />
                  </article>
                </Reveal>
              );
            })}
          </ul>
          <PetalFlower className="pointer-events-none absolute -bottom-12 -left-9 w-16 animate-float-slow" />
          <Sparkle className="absolute -top-6 right-10 w-4" />
        </div>
      </div>
    </section>
  );
}
