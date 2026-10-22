"use client";

import { sectionIds } from "@/shared/data/kindergarten";
import { mediaRatio } from "@/shared/hooks/useGallery";
import { useLang } from "@/shared/i18n/LanguageProvider";
import type { Media } from "@/shared/lib/media";
import { ABOUT_SIZES } from "@/shared/lib/media-sizes";
import { Pearl, Swirl } from "@/shared/ui/Decor";
import { accentTints, statIcons, tintSurface } from "@/shared/ui/Icons";
import { MediaView } from "@/shared/ui/MediaView";
import { Reveal } from "@/shared/ui/Reveal";
import { MSectionHeading, mContainer, mSectionY } from "../ui";

const shapes = [
  "rounded-[1.5rem_0.75rem_0.75rem_0.75rem]",
  "rounded-[0.75rem_1.5rem_0.75rem_0.75rem]",
  "rounded-[0.75rem_0.75rem_0.75rem_1.5rem]",
  "rounded-[0.75rem_0.75rem_1.5rem_0.75rem]",
];

export function MobileAbout({ media }: { media: Media | null }) {
  const { t } = useLang();
  const a = t.about;
  const ratio = media ? Math.min(Math.max(mediaRatio(media), 0.8), 1.78) : 16 / 10;
  return (
    <section id={sectionIds.about} data-section aria-labelledby="m-about-title" className={mSectionY}>
      <div className={mContainer}>
        <MSectionHeading id="m-about-title" eyebrow={a.eyebrow} title={a.title} />
        <Reveal y={12}>
          <p className="text-[0.95rem] leading-[1.7] text-ink-soft">{a.text}</p>
        </Reveal>

        {/* four stats meet in the middle like petals */}
        <ul className="mt-6 grid grid-cols-2 gap-2.5">
          {a.stats.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <Reveal as="li" y={10} key={i} delay={0.05 * i}>
                <article className={`nacre relative h-full border border-white p-3.5 shadow-pearl ${shapes[i]}`}>
                  <span className={`grid h-9 w-9 place-items-center rounded-[0.8rem_0.5rem_0.8rem_0.5rem] ${tintSurface[accentTints[i]]}`}>
                    <Icon className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
                  </span>
                  <h3 className="mt-2.5 text-[clamp(1.15rem,5.4vw,1.35rem)] leading-tight text-ink">{stat.value}</h3>
                  <p className="mt-1 text-[0.8rem] leading-snug text-ink-soft">{stat.label}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <Reveal y={12} className="relative mt-6">
          <div className="relative w-full overflow-hidden rounded-[2rem_0.9rem_2rem_0.9rem] shadow-float" style={{ aspectRatio: ratio }}>
            <MediaView media={media} alt={a.mediaAlt} sizes={ABOUT_SIZES} placeholder={t.hero.placeholder} />
          </div>
          <Pearl tint="lavender" className="absolute -top-2.5 -right-1.5 w-6" />
          <Swirl className="absolute -bottom-5 left-4 w-16" color="#dcd1f4" />
        </Reveal>
      </div>
    </section>
  );
}
