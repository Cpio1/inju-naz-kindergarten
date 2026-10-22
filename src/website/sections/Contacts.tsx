"use client";

import { Clock3, MapPin, Map as MapIcon, Phone } from "lucide-react";
import { kindergarten, links, sectionIds } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { Pearl, PetalFlower, Sparkle } from "@/shared/ui/Decor";
import { InstagramIcon } from "@/shared/ui/Icons";
import { MapCard } from "@/shared/ui/MapCard";
import { Reveal } from "@/shared/ui/Reveal";
import { container, sectionY } from "../ui";

export function Contacts() {
  const { t } = useLang();
  const c = t.contacts;
  const [first] = kindergarten.phones;

  return (
    <section id={sectionIds.contacts} data-section aria-labelledby="contacts-title" className={`relative ${sectionY}`}>
      <div className={`${container} grid grid-cols-[1fr_1.08fr] items-stretch gap-[clamp(2rem,4vw,4rem)]`}>
        <Reveal className="flex flex-col">
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 id="contacts-title" className="mt-3 text-[clamp(2rem,2.9vw,2.75rem)] leading-[1.1] text-ink">
            {c.title}
          </h2>

          <div className="mt-[clamp(1.25rem,3vh,1.75rem)] space-y-3">
            <div className="flex gap-3.5 rounded-[1.5rem_0.75rem_1.5rem_0.75rem] border border-white bg-white/70 p-4 shadow-pearl">
              <span className="sr-only">{c.addressLabel}</span>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-turquoise-soft text-turquoise-deep" aria-hidden="true">
                <MapPin className="h-5 w-5" />
              </span>
              <span className="text-[0.95rem] leading-relaxed text-ink">{c.address}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <span className="sr-only">{c.phonesLabel}</span>
              {kindergarten.phones.map((p) => (
                <span key={p.tel}>
                  <a
                    href={`tel:${p.tel}`}
                    aria-label={c.callPerson(p.person)}
                    className="group flex h-full items-center gap-3 rounded-[0.75rem_1.5rem_0.75rem_1.5rem] border border-white bg-white/70 p-4 shadow-pearl transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-turquoise hover:shadow-float"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lavender-soft text-lavender-deep transition-colors group-hover:bg-ink group-hover:text-white" aria-hidden="true">
                      <Phone className="h-[1.1rem] w-[1.1rem]" />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-[0.8rem] text-ink-soft">{p.person}</span>
                      <span className="text-[1rem] font-semibold whitespace-nowrap text-ink">{p.display}</span>
                    </span>
                  </a>
                </span>
              ))}
            </div>

            <div className="grid grid-cols-[1.45fr_1fr] gap-3">
              <div className="flex items-center gap-3 rounded-[1.5rem_0.75rem_1.5rem_0.75rem] border border-white bg-white/70 p-4 shadow-pearl">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-powder-soft text-powder-deep" aria-hidden="true">
                  <InstagramIcon className="h-[1.1rem] w-[1.1rem]" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[0.8rem] text-ink-soft">{c.instagramLabel}</span>
                  <span className="block truncate">
                    <a href={kindergarten.instagram.url} target="_blank" rel="noopener noreferrer" className="text-[0.875rem] font-semibold text-ink underline-offset-4 hover:underline">
                      {kindergarten.instagram.handle}
                    </a>
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-[0.75rem_1.5rem_0.75rem_1.5rem] border border-white bg-white/70 p-4 shadow-pearl">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f6ecd6] text-[#a7843f]" aria-hidden="true">
                  <Clock3 className="h-[1.1rem] w-[1.1rem]" />
                </span>
                <span className="flex flex-col">
                  <span className="text-[0.8rem] text-ink-soft">{c.hoursLabel}</span>
                  <span className="text-[1rem] font-semibold text-ink">{t.schedule.hoursValue}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-[clamp(1.25rem,3vh,1.75rem)] flex flex-wrap gap-2.5">
            <a href={`tel:${first.tel}`} className="btn btn-ink px-4 text-[0.875rem]">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {c.call}
            </a>
            <a href={kindergarten.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-pearl px-4 text-[0.875rem]">
              <InstagramIcon className="h-4 w-4" />
              {c.instagram}
            </a>
            <a href={links.twoGisCard} target="_blank" rel="noopener noreferrer" className="btn btn-pearl px-4 text-[0.875rem]">
              <MapIcon className="h-4 w-4" aria-hidden="true" />
              {c.map}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-[3rem_1.5rem_3rem_1.5rem] bg-gradient-to-br from-turquoise to-lavender opacity-60" />
          <MapCard width={1100} height={760} className="h-full min-h-[clamp(22rem,58vh,30rem)] rounded-[3rem_1.5rem_3rem_1.5rem] border-4 border-white shadow-float" />
          <PetalFlower className="absolute -top-8 -left-8 w-16" />
          <Pearl tint="powder" className="absolute -right-3 bottom-1/3 w-6" />
          <Sparkle className="absolute -top-5 right-12 w-4" />
        </Reveal>
      </div>
    </section>
  );
}
