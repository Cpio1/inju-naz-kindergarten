"use client";

import { ArrowUp, MapPin, Phone } from "lucide-react";
import { kindergarten, navSections, sectionIds } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { scrollToSection } from "@/shared/lib/scroll";
import { PearlDots, PearlThread, Wave } from "@/shared/ui/Decor";
import { InstagramIcon } from "@/shared/ui/Icons";
import { Logo } from "@/shared/ui/Logo";
import { container } from "../ui";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-[clamp(1rem,3vh,2rem)]">
      <Wave className="block h-10 w-full" fill="#294e59" />
      <div className="relative overflow-hidden bg-ink text-white">
        <PearlDots className="absolute inset-0" opacity={0.12} />
        <div aria-hidden="true" className="absolute -top-24 right-[-8rem] h-72 w-[30rem] rounded-full bg-turquoise/15 blur-3xl" />

        <div className={`${container} relative grid grid-cols-[1.3fr_0.8fr_1.2fr] gap-[clamp(2rem,5vw,4.5rem)] pt-[clamp(2rem,5vh,3rem)] pb-8`}>
          <div>
            <Logo caption={t.caption} tone="light" />
            <p className="mt-4 max-w-[30ch] font-display text-[1.1rem] leading-snug text-white/90 italic">{t.hero.subtitle}</p>
            <p className="mt-3 text-[0.8rem] text-white/55">{t.name}</p>
            <p className="text-[0.8rem] text-white/55">{kindergarten.legalName}</p>
            <PearlThread className="mt-5 w-40 opacity-90" count={8} bend={0.2} />
          </div>

          <nav aria-label={t.footer.sections}>
            <h2 className="font-sans text-[0.8rem] font-semibold tracking-[0.04em] text-turquoise">{t.footer.sections}</h2>
            <ul className="mt-4 space-y-2.5">
              {navSections.map((key) => (
                <li key={key}>
                  <a
                    href={`#${sectionIds[key]}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(sectionIds[key]);
                    }}
                    className="text-[0.95rem] text-white/80 transition-colors hover:text-white"
                  >
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-[0.8rem] font-semibold tracking-[0.04em] text-turquoise">{t.footer.contacts}</h2>
            <ul className="mt-4 space-y-3 text-[0.925rem] text-white/80">
              {kindergarten.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="group inline-flex items-center gap-2.5 transition-colors hover:text-white">
                    <Phone className="h-4 w-4 text-turquoise" aria-hidden="true" />
                    <span className="font-semibold whitespace-nowrap text-white">{p.display}</span>
                    <span className="text-white/55">· {p.person}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={kindergarten.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 transition-colors hover:text-white">
                  <InstagramIcon className="h-4 w-4 text-turquoise" />
                  {kindergarten.instagram.handle}
                </a>
              </li>
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden="true" />
                <span className="leading-relaxed">{t.contacts.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={`${container} relative flex items-center justify-between border-t border-white/10 py-5 text-[0.8rem] text-white/55`}>
          <p suppressHydrationWarning>
            © {year} {t.name}. {t.footer.rights}
          </p>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            {t.footer.toTop}
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
