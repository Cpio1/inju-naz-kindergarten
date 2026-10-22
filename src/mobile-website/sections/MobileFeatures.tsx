"use client";

import { sectionIds } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { PearlDots, Sparkle } from "@/shared/ui/Decor";
import { accentTints, featureIcons, tintSurface } from "@/shared/ui/Icons";
import { Reveal } from "@/shared/ui/Reveal";
import { MSectionHeading, mContainer } from "../ui";

/** A rounded pastel band; features as a calm vertical list with icon pearls. */
export function MobileFeatures() {
  const { t } = useLang();
  return (
    <section id={sectionIds.features} data-section aria-labelledby="m-features-title" className="px-2">
      <div className="relative overflow-hidden rounded-[2.25rem_1rem_2.25rem_1rem] bg-gradient-to-b from-[#e4f2f0] via-[#ebe8f7] to-[#f3eaf3] py-9">
        <PearlDots className="absolute inset-0" opacity={0.7} />
        <Sparkle className="absolute top-6 right-6 w-4" />
        <div className={`${mContainer} relative`}>
          <MSectionHeading id="m-features-title" eyebrow={t.features.eyebrow} title={t.features.title} />
          <ul className="space-y-2.5">
            {t.features.items.map((item, i) => {
              const Icon = featureIcons[i];
              return (
                <Reveal as="li" y={10} key={i} delay={0.04 * i}>
                  <article className="nacre flex gap-3.5 rounded-[1.25rem_0.75rem_1.25rem_0.75rem] border border-white p-3.5 shadow-pearl">
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-[46%_54%_42%_58%] ${tintSurface[accentTints[i]]}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[1.02rem] leading-snug text-ink">{item.title}</h3>
                      <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-soft">{item.text}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
