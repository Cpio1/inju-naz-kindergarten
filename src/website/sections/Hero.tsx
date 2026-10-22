"use client";

import { ArrowRight, Baby, Clock3, MapPin, Users } from "lucide-react";
import { m } from "motion/react";
import { sectionIds } from "@/shared/data/kindergarten";
import { mediaRatio } from "@/shared/hooks/useGallery";
import { useLang } from "@/shared/i18n/LanguageProvider";
import type { Media } from "@/shared/lib/media";
import { HERO_SIZES } from "@/shared/lib/media-sizes";
import { scrollToSection } from "@/shared/lib/scroll";
import { Drop, Pearl, PearlThread, PetalFlower, Sparkle } from "@/shared/ui/Decor";
import { MediaView } from "@/shared/ui/MediaView";
import { container } from "../ui";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

/** Organic pearl-shell outline used to clip the hero photo (objectBoundingBox units). */
const FRAME = "M0.07,0.2 C0.1,0.05 0.3,0.01 0.55,0.02 C0.8,0.03 0.96,0.1 0.985,0.34 C1,0.58 0.995,0.83 0.87,0.95 C0.74,1.01 0.4,0.995 0.18,0.965 C0.04,0.94 0.005,0.8 0.008,0.56 C0.01,0.4 0.04,0.29 0.07,0.2 Z";

export function Hero({ media }: { media: Media | null }) {
  const { t } = useLang();
  const h = t.hero;
  // A portrait photo gets a portrait frame of its own proportions — nothing important
  // (like the «ІНЖУ-НАЗ» sign at the top of the building) is cut off by a landscape crop.
  const ratio = media ? mediaRatio(media) : null;
  const portrait = ratio !== null && ratio < 1.05;
  const facts = [
    { icon: Baby, label: h.factLabels.ages, value: h.facts.ages },
    { icon: Users, label: h.factLabels.groups, value: h.facts.groups },
    { icon: Clock3, label: h.factLabels.hours, value: h.facts.hours },
  ];

  return (
    <section id={sectionIds.home} data-section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* soft nacre wash behind the whole first screen */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-[46%_54%_60%_40%] bg-turquoise-soft/70 blur-3xl" />
        <div className="absolute top-10 right-[-12rem] h-[30rem] w-[36rem] rounded-[58%_42%_44%_56%] bg-lavender-soft/80 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[38%] h-[22rem] w-[26rem] rounded-full bg-powder-soft/70 blur-3xl" />
      </div>

      <div
        className={`${container} grid min-h-[min(100svh,880px)] grid-cols-[1.02fr_0.98fr] items-center gap-[clamp(2rem,4.5vw,4.5rem)] pt-[calc(4rem+clamp(1.25rem,4vh,2.5rem))] pb-[clamp(2rem,6vh,4rem)]`}
      >
        {/* ── text ── */}
        <div className="relative">
          <m.p {...rise(0)} className="glass inline-flex items-center gap-2 rounded-full border border-line/80 px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink-soft">
            <MapPin className="h-3.5 w-3.5 text-turquoise-deep" aria-hidden="true" />
            {h.place}
          </m.p>

          <m.h1
            {...rise(0.08)}
            id="hero-title"
            className="relative mt-[clamp(1rem,3vh,1.6rem)] w-fit text-[clamp(3.25rem,5.6vw,5.25rem)] leading-[0.95] font-semibold tracking-[0.005em] text-ink"
          >
            ІНЖУ-<span className="text-turquoise-deep italic">НАЗ</span>
            <Sparkle className="absolute -top-3 -right-7 w-6 animate-shimmer" />
            <Pearl tint="powder" className="absolute -right-12 top-7 w-4" />
          </m.h1>

          <m.p {...rise(0.16)} className="mt-[clamp(0.8rem,2.2vh,1.25rem)] max-w-[28ch] font-display text-[clamp(1.3rem,1.85vw,1.65rem)] leading-[1.3] font-medium text-ink">
            {h.subtitle}
          </m.p>

          <m.p {...rise(0.22)} className="mt-3 max-w-[44ch] text-[clamp(0.95rem,1.05vw,1.05rem)] leading-relaxed text-ink-soft">
            {h.description}
          </m.p>

          <m.ul {...rise(0.3)} className="mt-[clamp(1.25rem,3.2vh,2rem)] flex flex-wrap gap-2.5">
            {facts.map(({ icon: Icon, label, value }) => (
              <li key={label} className="nacre flex items-center gap-3 rounded-[1.25rem_0.75rem_1.25rem_0.75rem] border border-white py-2 pr-4 pl-2 shadow-pearl">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-milk text-turquoise-deep">
                  <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[0.7rem] font-medium text-ink-soft">{label}</span>
                  <span className="text-[0.95rem] font-semibold whitespace-nowrap text-ink">{value}</span>
                </span>
              </li>
            ))}
          </m.ul>

          <m.div {...rise(0.38)} className="mt-[clamp(1.4rem,3.6vh,2.25rem)] flex flex-wrap gap-3">
            <a
              href={`#${sectionIds.contacts}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(sectionIds.contacts);
              }}
              className="btn btn-ink group"
            >
              {h.primary}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href={`#${sectionIds.groups}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(sectionIds.groups);
              }}
              className="btn btn-pearl"
            >
              {h.secondary}
            </a>
          </m.div>
        </div>

        {/* ── photo ── */}
        <m.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className={`relative mx-auto ${portrait ? "w-fit max-w-full" : "w-full max-w-[34rem]"}`}
        >
          <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
            <clipPath id="inju-hero-clip" clipPathUnits="objectBoundingBox">
              <path d={FRAME} />
            </clipPath>
          </svg>

          {/* layered backing: lavender shell + thin outline frame, offset for depth */}
          <div aria-hidden="true" className="absolute inset-0 translate-x-5 translate-y-5 rounded-[48%_52%_40%_60%/42%_46%_54%_58%] bg-gradient-to-br from-lavender to-powder opacity-80" />
          <svg aria-hidden="true" viewBox="0 0 1 1" preserveAspectRatio="none" className="absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] overflow-visible">
            <path d={FRAME} fill="none" stroke="#5fa9a3" strokeOpacity="0.45" strokeWidth="1.2" vectorEffect="non-scaling-stroke" strokeDasharray="2 7" strokeLinecap="round" />
          </svg>

          <div
            className={`relative ${portrait ? "h-[clamp(22rem,70dvh,36rem)] max-w-full" : "h-[min(62svh,560px)] min-h-[380px] w-full"}`}
            style={{ clipPath: "url(#inju-hero-clip)", aspectRatio: portrait ? Math.max(ratio, 0.72) : undefined }}
          >
            <MediaView media={media} alt={h.photoAlt} sizes={HERO_SIZES} priority placeholder={h.placeholder} objectPosition="50% 0%" />
          </div>

          {/* floating accents — small, never over the faces in the centre of the frame */}
          <PetalFlower className={`absolute -top-8 w-[clamp(4.5rem,7vw,6rem)] animate-float-slow ${portrait ? "-right-14" : "-right-6"}`} />
          <PearlThread
            className={`absolute w-[clamp(9rem,15vw,12rem)] rotate-[-8deg] ${portrait ? "-bottom-6 -left-[clamp(8rem,13vw,10.5rem)]" : "-bottom-3 -left-10"}`}
            count={8}
            bend={0.3}
          />
          <Drop tint="turquoise" className={`absolute top-[18%] w-7 animate-float ${portrait ? "-left-12" : "-left-7"}`} />
          <Sparkle className="absolute right-[12%] -bottom-6 w-4" color="#b9a9e6" />
          <div className={`glass absolute bottom-[14%] ${portrait ? "left-[calc(100%-1.75rem)]" : "right-[-1.25rem]"} flex items-center gap-2.5 rounded-[1.1rem_1.6rem_1.6rem_0.5rem] border border-white/80 px-3.5 py-2.5 whitespace-nowrap shadow-float`}>
            <Clock3 className="h-5 w-5 text-turquoise-deep" aria-hidden="true" />
            <span className="text-[0.9rem] font-semibold text-ink">{h.facts.hours}</span>
          </div>
        </m.div>
      </div>
    </section>
  );
}
