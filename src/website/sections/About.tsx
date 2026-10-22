"use client";

import { sectionIds } from "@/shared/data/kindergarten";
import { mediaRatio } from "@/shared/hooks/useGallery";
import { useLang } from "@/shared/i18n/LanguageProvider";
import type { Media } from "@/shared/lib/media";
import { ABOUT_SIZES } from "@/shared/lib/media-sizes";
import { Pearl, PetalFlower, Sparkle, Swirl } from "@/shared/ui/Decor";
import { accentTints, statIcons, tintSurface } from "@/shared/ui/Icons";
import { MediaView } from "@/shared/ui/MediaView";
import { Reveal } from "@/shared/ui/Reveal";
import { container, sectionY } from "../ui";

const shapes = ["shape-a", "shape-b", "shape-d", "shape-c"];
const frame = "rounded-[2.5rem_1rem_2.5rem_2.5rem]";

/**
 * Landscape photo (or none yet): text + photo on the left, four stats on the right.
 * Portrait photo: the photo stands on the left in a frame of its own proportions,
 * text and stats share the right — the picture is shown whole, not cut to a strip.
 */
export function About({ media }: { media: Media | null }) {
  const { t } = useLang();
  const a = t.about;
  const ratio = media ? mediaRatio(media) : null;
  const portrait = ratio !== null && ratio < 1.05;

  const intro = (
    <Reveal>
      <p className="eyebrow">{a.eyebrow}</p>
      <h2 id="about-title" className="mt-3 text-[clamp(2rem,2.9vw,2.75rem)] leading-[1.1] text-ink">
        {a.title}
      </h2>
      <p className={`mt-4 text-[clamp(0.975rem,1.05vw,1.05rem)] leading-[1.7] text-ink-soft ${portrait ? "max-w-[58ch]" : "max-w-[46ch]"}`}>{a.text}</p>
    </Reveal>
  );

  if (portrait) {
    return (
      <section id={sectionIds.about} data-section aria-labelledby="about-title" className={`relative ${sectionY}`}>
        <div className={`${container} grid grid-cols-[auto_1fr] items-center gap-[clamp(2.5rem,5vw,4.5rem)]`}>
          <Reveal delay={0.1} className="relative">
            <div className={`relative h-[clamp(22rem,68dvh,33rem)] overflow-hidden ${frame} shadow-float`} style={{ aspectRatio: Math.max(ratio, 0.72) }}>
              <MediaView media={media} alt={a.mediaAlt} sizes={ABOUT_SIZES} placeholder={t.hero.placeholder} />
            </div>
            <Swirl className="absolute -right-10 -bottom-6 w-24" color="#dcd1f4" />
            <Pearl tint="turquoise" className="absolute -top-3 -left-3 w-7" />
            <PetalFlower className="pointer-events-none absolute -bottom-8 -left-8 w-16 animate-float-slow" />
          </Reveal>
          <div className="relative">
            {intro}
            <div className="mt-[clamp(1.25rem,3.5dvh,2rem)]">
              <Stats compact />
            </div>
            <Sparkle className="absolute -top-4 right-6 w-4" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={sectionIds.about} data-section aria-labelledby="about-title" className={`relative ${sectionY}`}>
      <div className={`${container} grid grid-cols-[0.95fr_1.05fr] items-center gap-[clamp(2.5rem,5vw,5rem)]`}>
        <div>
          {intro}
          <Reveal delay={0.1} className="relative mt-[clamp(1.5rem,3.5vh,2.25rem)]">
            <div className={`relative aspect-[16/9] max-h-[min(34svh,290px)] w-full overflow-hidden ${frame} shadow-float`}>
              <MediaView media={media} alt={a.mediaAlt} sizes={ABOUT_SIZES} placeholder={t.hero.placeholder} />
            </div>
            <Swirl className="absolute -right-8 -bottom-7 w-24" color="#dcd1f4" />
            <Pearl tint="turquoise" className="absolute -top-3 -left-3 w-7" />
          </Reveal>
        </div>

        <div className="relative">
          <Stats />
          <PetalFlower className="pointer-events-none absolute -bottom-12 -left-9 w-16 animate-float-slow" />
          <Sparkle className="absolute -top-6 right-10 w-4" />
        </div>
      </div>
    </section>
  );
}

/** The four facts. `compact` = shorter cards for the portrait layout, where they sit under the text. */
function Stats({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  return (
    <ul className="grid grid-cols-2 gap-[clamp(0.9rem,1.6vw,1.25rem)]">
      {t.about.stats.map((stat, i) => {
        const Icon = statIcons[i];
        const tint = accentTints[i];
        return (
          <Reveal as="li" key={i} delay={0.06 * i} className={!compact && i % 2 === 1 ? "translate-y-6" : ""}>
            <article
              className={`nacre ${shapes[i]} group relative h-full overflow-hidden border border-white shadow-pearl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-float ${
                compact ? "flex items-center gap-4 p-[clamp(0.9rem,1.5vw,1.25rem)]" : "p-[clamp(1.1rem,1.8vw,1.6rem)]"
              }`}
            >
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-[1rem_0.6rem_1rem_0.6rem] ${tintSurface[tint]}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className={`${compact ? "" : "mt-[clamp(0.9rem,2vh,1.4rem)]"} text-[clamp(1.4rem,2vw,1.85rem)] leading-tight text-ink`}>{stat.value}</h3>
                <p className="mt-1 text-[0.9rem] leading-snug text-ink-soft">{stat.label}</p>
              </div>
              <Pearl tint={tint} className="absolute top-4 right-4 w-4 opacity-80 transition-transform duration-500 group-hover:scale-125" />
            </article>
          </Reveal>
        );
      })}
    </ul>
  );
}
