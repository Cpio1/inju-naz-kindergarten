"use client";

import { MapPin, Map as MapIcon, Phone } from "lucide-react";
import { kindergarten, links, sectionIds } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { Pearl } from "@/shared/ui/Decor";
import { InstagramIcon } from "@/shared/ui/Icons";
import { MapCard } from "@/shared/ui/MapCard";
import { Reveal } from "@/shared/ui/Reveal";
import { MSectionHeading, mContainer, mSectionY } from "../ui";

export function MobileContacts() {
  const { t } = useLang();
  const c = t.contacts;
  const [first] = kindergarten.phones;

  return (
    <section id={sectionIds.contacts} data-section aria-labelledby="m-contacts-title" className={mSectionY}>
      <div className={mContainer}>
        <MSectionHeading id="m-contacts-title" eyebrow={c.eyebrow} title={c.title} />

        <Reveal y={10} className="space-y-2.5">
          {kindergarten.phones.map((p, i) => (
            <a
              key={p.tel}
              href={`tel:${p.tel}`}
              aria-label={c.callPerson(p.person)}
              className={`flex min-h-16 items-center gap-3 border border-white bg-white/80 px-3.5 py-3 shadow-pearl active:bg-white ${
                i === 0 ? "rounded-[1.5rem_0.75rem_0.75rem_0.75rem]" : "rounded-[0.75rem_0.75rem_0.75rem_1.5rem]"
              }`}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-white" aria-hidden="true">
                <Phone className="h-5 w-5" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-[1.05rem] font-semibold whitespace-nowrap text-ink">{p.display}</span>
                <span className="text-[0.8rem] text-ink-soft">{p.person}</span>
              </span>
            </a>
          ))}

          <div className="flex gap-3 rounded-[0.75rem_1.5rem_0.75rem_0.75rem] border border-white bg-white/80 p-3.5 shadow-pearl">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-turquoise-soft text-turquoise-deep" aria-hidden="true">
              <MapPin className="h-5 w-5" />
            </span>
            <p className="text-[0.875rem] leading-relaxed text-ink">
              <span className="sr-only">{c.addressLabel}: </span>
              {c.address}
            </p>
          </div>

          <a
            href={kindergarten.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 items-center gap-3 rounded-[0.75rem_0.75rem_0.75rem_1.5rem] border border-white bg-white/80 px-3.5 py-2.5 shadow-pearl active:bg-white"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-powder-soft text-powder-deep" aria-hidden="true">
              <InstagramIcon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[0.75rem] text-ink-soft">{c.instagramLabel}</span>
              <span className="block truncate text-[0.95rem] font-semibold text-ink">{kindergarten.instagram.handle}</span>
            </span>
          </a>
        </Reveal>

        <Reveal y={10} className="relative mt-5">
          <MapCard width={760} height={600} className="aspect-[4/3.1] w-full rounded-[2rem_0.9rem_2rem_0.9rem] border-[3px] border-white shadow-float" />
          <Pearl tint="powder" className="absolute -top-2 -right-1 w-6" />
        </Reveal>

        <Reveal y={10} className="mt-5 grid grid-cols-2 gap-2.5">
          <a href={`tel:${first.tel}`} className="btn btn-ink col-span-2 min-h-12">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {c.call}
          </a>
          <a href={kindergarten.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-pearl min-h-12 px-3 text-[0.875rem]">
            <InstagramIcon className="h-4 w-4" />
            {c.instagram}
          </a>
          <a href={links.twoGisCard} target="_blank" rel="noopener noreferrer" className="btn btn-pearl min-h-12 px-3 text-[0.875rem]">
            <MapIcon className="h-4 w-4" aria-hidden="true" />
            {c.map}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
