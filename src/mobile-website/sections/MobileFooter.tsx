"use client";

import { ArrowUp, Phone } from "lucide-react";
import { kindergarten, navSections, sectionIds } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { scrollToSection } from "@/shared/lib/scroll";
import { PearlDots, PearlThread, Wave } from "@/shared/ui/Decor";
import { InstagramIcon } from "@/shared/ui/Icons";
import { Logo } from "@/shared/ui/Logo";
import { mContainer } from "../ui";

export function MobileFooter() {
  const { t } = useLang();
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
  };
  return (
    <footer className="relative mt-4">
      <Wave className="block h-6 w-full" fill="#294e59" />
      <div className="relative overflow-hidden bg-ink pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-white">
        <PearlDots className="absolute inset-0" opacity={0.12} />
        <div className={`${mContainer} relative`}>
          <Logo caption={t.caption} size="sm" tone="light" />
          <p className="mt-3 font-display text-[1.02rem] leading-snug text-white/90 italic">{t.hero.subtitle}</p>
          <PearlThread className="mt-4 w-32" count={7} bend={0.2} />

          <nav aria-label={t.footer.sections} className="mt-5">
            <ul className="flex flex-wrap gap-2">
              {navSections.map((key) => (
                <li key={key}>
                  <a href={`#${sectionIds[key]}`} onClick={go(sectionIds[key])} className="inline-flex min-h-10 items-center rounded-full border border-white/15 px-3.5 text-[0.85rem] text-white/85 active:bg-white/10">
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="mt-5 space-y-2.5 text-[0.875rem] text-white/80">
            {kindergarten.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="inline-flex min-h-10 items-center gap-2.5">
                  <Phone className="h-4 w-4 text-turquoise" aria-hidden="true" />
                  <span className="font-semibold whitespace-nowrap text-white">{p.display}</span>
                  <span className="text-white/55">{p.person}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={kindergarten.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2.5">
                <InstagramIcon className="h-4 w-4 text-turquoise" />
                {kindergarten.instagram.handle}
              </a>
            </li>
            <li className="leading-relaxed text-white/70">{t.contacts.address}</li>
          </ul>

          <div className="mt-6 flex items-end justify-between gap-4 border-t border-white/10 pt-4 text-[0.75rem] text-white/55">
            <div>
              <p>{t.name}</p>
              <p>{kindergarten.legalName}</p>
              <p className="mt-1" suppressHydrationWarning>
                © {new Date().getFullYear()} · {t.footer.rights}
              </p>
            </div>
            <a href="#home" onClick={go(sectionIds.home)} aria-label={t.footer.toTop} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 text-white">
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
