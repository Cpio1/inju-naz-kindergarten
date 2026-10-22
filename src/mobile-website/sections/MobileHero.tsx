"use client";

import { Baby, Clock3, MapPin, Users } from "lucide-react";
import { m } from "motion/react";
import { sectionIds } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import type { Media } from "@/shared/lib/media";
import { HERO_SIZES } from "@/shared/lib/media-sizes";
import { scrollToSection } from "@/shared/lib/scroll";
import { Pearl, PearlThread, PetalFlower, Sparkle } from "@/shared/ui/Decor";
import { MediaView } from "@/shared/ui/MediaView";
import { mContainer } from "../ui";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease },
});

export function MobileHero({ media }: { media: Media | null }) {
  const { t } = useLang();
  const h = t.hero;
  const facts = [
    { icon: Baby, value: h.facts.ages, label: h.factLabels.ages },
    { icon: Users, value: h.facts.groups, label: h.factLabels.groups },
    { icon: Clock3, value: h.facts.hours, label: h.factLabels.hours },
  ];
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <section id={sectionIds.home} data-section aria-labelledby="m-hero-title" className="relative isolate overflow-hidden pt-[calc(3.5rem+env(safe-area-inset-top)+1.25rem)] pb-8">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-[46%_54%_60%_40%] bg-turquoise-soft/80 blur-2xl" />
        <div className="absolute top-40 -right-28 h-72 w-72 rounded-[58%_42%_44%_56%] bg-lavender-soft blur-2xl" />
      </div>

      <div className={mContainer}>
        <m.p {...rise(0)} className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-line/80 bg-white/60 px-3 py-1 text-[0.75rem] font-medium text-ink-soft">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-turquoise-deep" aria-hidden="true" />
          <span className="truncate">{h.place}</span>
        </m.p>

        <m.h1 {...rise(0.06)} id="m-hero-title" className="relative mt-3 w-fit text-[clamp(2.75rem,13.5vw,3.6rem)] leading-[1] font-semibold text-ink">
          ІНЖУ-<span className="text-turquoise-deep italic">НАЗ</span>
          <Sparkle className="absolute -top-2 -right-5 w-4" />
        </m.h1>

        <m.p {...rise(0.12)} className="mt-2.5 font-display text-[clamp(1.12rem,5.2vw,1.3rem)] leading-[1.3] font-medium text-ink">
          {h.subtitle}
        </m.p>
        <m.p {...rise(0.18)} className="mt-2 text-[0.925rem] leading-relaxed text-ink-soft">
          {h.description}
        </m.p>

        <m.div {...rise(0.24)} className="mt-5 grid grid-cols-[1.2fr_1fr] gap-2.5">
          <a href={`#${sectionIds.contacts}`} onClick={go(sectionIds.contacts)} className="btn btn-ink min-h-12 px-3 text-[0.875rem]">
            {h.primary}
          </a>
          <a href={`#${sectionIds.groups}`} onClick={go(sectionIds.groups)} className="btn btn-pearl min-h-12 px-3 text-[0.875rem]">
            {h.secondary}
          </a>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="relative mt-7"
        >
          <div aria-hidden="true" className="absolute inset-x-3 -bottom-2 top-3 rounded-[50%_50%_1.75rem_1.75rem/34%_34%_1.75rem_1.75rem] bg-gradient-to-br from-lavender to-powder opacity-70" />
          {/* mobile frame: a soft arch, like the top of a shell */}
          <div className="relative aspect-[4/3.6] w-full overflow-hidden rounded-[50%_50%_1.75rem_1.75rem/30%_30%_1.75rem_1.75rem] border-[3px] border-white shadow-float">
            <MediaView media={media} alt={h.photoAlt} sizes={HERO_SIZES} priority placeholder={h.placeholder} />
          </div>
          <PetalFlower className="absolute -top-4 -right-2 w-14" />
          <PearlThread className="absolute -top-1 -left-3 w-24 -rotate-12" count={6} bend={0.25} />
          <Pearl tint="turquoise" className="absolute bottom-16 -left-2 w-5" />
        </m.div>

        <m.ul {...rise(0.3)} className="relative z-10 mx-2 -mt-7 grid grid-cols-3 divide-x divide-line rounded-[1.25rem_0.75rem_1.25rem_0.75rem] border border-white bg-white/92 py-2.5 shadow-float">
          {facts.map(({ icon: Icon, value, label }) => (
            <li key={label} className="flex flex-col items-center gap-0.5 px-1 text-center">
              <Icon className="h-4 w-4 text-turquoise-deep" aria-hidden="true" />
              <span className="sr-only">{label}: </span>
              <span className="text-[clamp(0.78rem,3.6vw,0.9rem)] font-semibold whitespace-nowrap text-ink">{value}</span>
            </li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}
