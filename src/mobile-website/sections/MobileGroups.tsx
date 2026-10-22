"use client";

import { groups, sectionIds } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { GroupArt, toneStyles } from "@/shared/ui/GroupArt";
import { Reveal } from "@/shared/ui/Reveal";
import { MSectionHeading, mContainer, mSectionY } from "../ui";

/**
 * Compact horizontal cards — illustration, name + category, age badge — about 88px each,
 * so all five groups fit in roughly one phone screen. Cards alternate their rounded side.
 */
export function MobileGroups() {
  const { t } = useLang();
  return (
    <section id={sectionIds.groups} data-section aria-labelledby="m-groups-title" className={mSectionY}>
      <div className={mContainer}>
        <MSectionHeading id="m-groups-title" eyebrow={t.groups.eyebrow} title={t.groups.title} intro={t.groups.intro} />
        <ul className="space-y-2.5">
          {groups.map((group, i) => {
            const tone = toneStyles[group.tone];
            const [from, to] = group.ages;
            const even = i % 2 === 0;
            return (
              <Reveal as="li" y={10} key={group.id} delay={0.04 * i}>
                <article
                  className={`relative flex min-h-[5.5rem] items-center gap-3 overflow-hidden border border-white/80 py-2.5 pr-3 pl-2 shadow-pearl ${
                    even ? "rounded-[1.75rem_0.9rem_0.9rem_1.75rem]" : "rounded-[0.9rem_1.75rem_1.75rem_0.9rem]"
                  }`}
                  style={{ background: `linear-gradient(110deg, ${tone.surface} 0%, #ffffff 120%)` }}
                >
                  <span className="relative grid h-[4.25rem] w-[4.25rem] shrink-0 place-items-center rounded-[46%_54%_42%_58%]" style={{ background: tone.soft }}>
                    <GroupArt motif={group.motif} tone={group.tone} className="h-[3.9rem] w-[3.9rem]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[1.2rem] leading-tight text-ink">{group.name}</h3>
                    <p className="mt-0.5 text-[0.8rem] leading-snug font-medium" style={{ color: tone.deep }}>
                      {t.groups.category[group.id]}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-[0.9rem_0.6rem_0.9rem_0.6rem] bg-white/90 px-2.5 py-1.5 text-center">
                    <span className="sr-only">{t.groups.ageLabel}: </span>
                    <span className="block font-display text-[1rem] leading-none font-semibold whitespace-nowrap" style={{ color: tone.deep }}>
                      {t.groups.age(from, to)}
                    </span>
                  </span>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
