"use client";

import { sectionIds } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { Pearl, PearlDots, Sparkle, Wave } from "@/shared/ui/Decor";
import { accentTints, featureIcons, tintSurface } from "@/shared/ui/Icons";
import { Reveal } from "@/shared/ui/Reveal";
import { SectionHeading, container } from "../ui";

const shapes = ["shape-a", "shape-c", "shape-b", "shape-d"];

/** Four features strung like pearls on a thread: cards alternate up and down along it. */
export function Features() {
  const { t } = useLang();
  return (
    <section id={sectionIds.features} data-section aria-labelledby="features-title" className="relative isolate my-[clamp(1rem,3vh,2rem)]">
      <Wave className="block h-8 w-full" fill="#e4f2f0" />
      <div className="relative overflow-hidden bg-gradient-to-b from-[#e4f2f0] via-[#ebe8f7] to-[#f3eaf3] py-[clamp(2.75rem,7vh,4.5rem)]">
        <PearlDots className="absolute inset-0" opacity={0.7} />
        <div aria-hidden="true" className="absolute top-1/3 -right-40 h-80 w-[28rem] rounded-[58%_42%_44%_56%] bg-powder-soft/70 blur-3xl" />
        <div className={`${container} relative`}>
          <SectionHeading id="features-title" eyebrow={t.features.eyebrow} title={t.features.title} align="center" />

          <div className="relative">
            {/* thin silk thread the cards hang on */}
            <svg aria-hidden="true" viewBox="0 0 1000 60" preserveAspectRatio="none" className="pointer-events-none absolute top-[46%] left-0 h-14 w-full">
              <path d="M0 18C200 52 300 52 500 30S820 8 1000 40" fill="none" stroke="#5fa9a3" strokeOpacity="0.35" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeDasharray="1 9" strokeLinecap="round" />
            </svg>
            <ul className="relative grid grid-cols-4 gap-[clamp(0.9rem,1.6vw,1.4rem)]">
              {t.features.items.map((item, i) => {
                const Icon = featureIcons[i];
                const tint = accentTints[i];
                return (
                  <Reveal as="li" key={i} delay={0.07 * i} className={i % 2 === 1 ? "lg:translate-y-7" : ""}>
                    <article
                      className={`nacre ${shapes[i]} group h-full border border-white/90 p-[clamp(1.1rem,1.7vw,1.5rem)] shadow-pearl transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-float`}
                    >
                      <span className={`relative grid h-14 w-14 place-items-center rounded-[46%_54%_42%_58%] ${tintSurface[tint]} transition-transform duration-500 group-hover:rotate-6`}>
                        <Icon className="h-6 w-6" aria-hidden="true" />
                        <Pearl tint="white" className="absolute -top-1 -right-1 w-4" />
                      </span>
                      <h3 className="mt-4 text-[clamp(1.08rem,1.35vw,1.25rem)] leading-snug text-ink">{item.title}</h3>
                      <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">{item.text}</p>
                    </article>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
        <Sparkle className="absolute top-10 left-[8%] w-5" />
        <Sparkle className="absolute right-[10%] bottom-10 w-4" color="#b9a9e6" />
      </div>
      <Wave className="block h-8 w-full" fill="#f3eaf3" flip />
    </section>
  );
}
