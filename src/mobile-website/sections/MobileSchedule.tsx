"use client";

import { sectionIds } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { Pearl, type PearlTint } from "@/shared/ui/Decor";
import { ClockArt, MealArt } from "@/shared/ui/Illustrations";
import { Reveal } from "@/shared/ui/Reveal";
import { MSectionHeading, mContainer, mSectionY } from "../ui";

const mealPearls: PearlTint[] = ["turquoise", "lavender", "powder", "gold"];

/** Two compact cards side by side: the working day and the four meals. */
export function MobileSchedule() {
  const { t } = useLang();
  const s = t.schedule;
  return (
    <section id={sectionIds.schedule} data-section aria-labelledby="m-schedule-title" className={mSectionY}>
      <div className={mContainer}>
        <MSectionHeading id="m-schedule-title" eyebrow={s.eyebrow} title={s.title} />
        <div className="grid grid-cols-2 gap-2.5">
          <Reveal y={10}>
            <article className="flex h-full flex-col rounded-[1.75rem_0.75rem_1.75rem_0.75rem] bg-gradient-to-br from-turquoise-soft to-[#eaf6f4] p-3.5 shadow-pearl">
              <ClockArt className="w-[4.5rem]" />
              <h3 className="mt-2 font-sans text-[0.8rem] font-medium text-turquoise-deep">{s.hoursTitle}</h3>
              <p className="mt-0.5 font-display text-[clamp(1.05rem,5vw,1.3rem)] leading-tight font-semibold whitespace-nowrap text-ink">{s.hoursValue}</p>
              <p className="mt-1.5 text-[0.78rem] leading-snug text-ink-soft">{s.hoursNote}</p>
            </article>
          </Reveal>
          <Reveal y={10} delay={0.06}>
            <article className="flex h-full flex-col rounded-[0.75rem_1.75rem_0.75rem_1.75rem] bg-gradient-to-br from-powder-soft to-[#f7eef5] p-3.5 shadow-pearl">
              <MealArt className="w-[4.5rem]" />
              <h3 className="mt-2 font-sans text-[0.8rem] font-medium text-powder-deep">{s.mealsTitle}</h3>
              <p className="mt-0.5 font-display text-[clamp(1.05rem,5vw,1.3rem)] leading-tight font-semibold text-ink">{s.mealsValue}</p>
              <div className="mt-1.5 flex gap-1" aria-hidden="true">
                {mealPearls.map((tint) => (
                  <Pearl key={tint} tint={tint} className="w-5" />
                ))}
              </div>
              <p className="mt-1.5 text-[0.78rem] leading-snug text-ink-soft">{s.mealsNote}</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
