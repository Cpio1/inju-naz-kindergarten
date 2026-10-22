"use client";

import { sectionIds } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { Pearl, Sparkle, Swirl, type PearlTint } from "@/shared/ui/Decor";
import { ClockArt, MealArt } from "@/shared/ui/Illustrations";
import { Reveal } from "@/shared/ui/Reveal";
import { SectionHeading, container, sectionY } from "../ui";

const mealPearls: PearlTint[] = ["turquoise", "lavender", "powder", "gold"];

export function Schedule() {
  const { t } = useLang();
  const s = t.schedule;
  return (
    <section id={sectionIds.schedule} data-section aria-labelledby="schedule-title" className={`relative ${sectionY}`}>
      <div className={container}>
        <SectionHeading id="schedule-title" eyebrow={s.eyebrow} title={s.title} align="center" />

        <div className="grid grid-cols-2 gap-[clamp(1rem,2vw,1.5rem)]">
          <Reveal>
            <article className="group relative flex h-full items-center gap-[clamp(1.25rem,2.5vw,2.25rem)] overflow-hidden rounded-[3rem_1.25rem_3rem_1.25rem] bg-gradient-to-br from-turquoise-soft to-[#eaf6f4] p-[clamp(1.5rem,2.6vw,2.25rem)] shadow-pearl">
              <ClockArt className="w-[clamp(7.5rem,11vw,9.5rem)] shrink-0 transition-transform duration-700 group-hover:rotate-[8deg]" />
              <div>
                <h3 className="text-[1.05rem] font-medium text-turquoise-deep">{s.hoursTitle}</h3>
                <p className="mt-1 font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none font-semibold whitespace-nowrap text-ink">{s.hoursValue}</p>
                <p className="mt-3 max-w-[26ch] text-[0.925rem] leading-relaxed text-ink-soft">{s.hoursNote}</p>
              </div>
              <Swirl className="absolute -right-6 -bottom-4 w-28 opacity-80" color="#ffffff" />
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="group relative flex h-full items-center gap-[clamp(1.25rem,2.5vw,2.25rem)] overflow-hidden rounded-[1.25rem_3rem_1.25rem_3rem] bg-gradient-to-br from-powder-soft to-[#f7eef5] p-[clamp(1.5rem,2.6vw,2.25rem)] shadow-pearl">
              <MealArt className="w-[clamp(7.5rem,11vw,9.5rem)] shrink-0 transition-transform duration-700 group-hover:-rotate-[6deg]" />
              <div>
                <h3 className="text-[1.05rem] font-medium text-powder-deep">{s.mealsTitle}</h3>
                <p className="mt-1 font-display text-[clamp(1.75rem,2.7vw,2.35rem)] leading-none font-semibold text-ink">{s.mealsValue}</p>
                {/* four pearls = four meals; no invented menu or times */}
                <div className="mt-3 flex items-center gap-1.5" aria-hidden="true">
                  {mealPearls.map((tint, i) => (
                    <span key={tint} className="relative grid w-8 place-items-center">
                      <Pearl tint={tint} className="w-8" />
                      <span className="absolute top-[38%] -translate-y-1/2 text-[0.7rem] font-semibold text-ink">{i + 1}</span>
                    </span>
                  ))}
                </div>
                <p className="mt-2.5 max-w-[28ch] text-[0.925rem] leading-relaxed text-ink-soft">{s.mealsNote}</p>
              </div>
              <Sparkle className="absolute top-5 right-6 w-4" />
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
