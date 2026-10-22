"use client";

import { Phone } from "lucide-react";
import { navSections, sectionIds } from "@/shared/data/kindergarten";
import { useActiveSection } from "@/shared/hooks/useActiveSection";
import { useScrolled } from "@/shared/hooks/useScrolled";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { scrollToSection } from "@/shared/lib/scroll";
import { LangSwitch } from "@/shared/ui/LangSwitch";
import { Logo } from "@/shared/ui/Logo";
import { container } from "../ui";

const ids = navSections.map((s) => sectionIds[s]);
/** sections without their own menu item light up their nearest neighbour */
const alias: Record<string, string> = { features: "groups", schedule: "gallery" };
const observed = Object.values(sectionIds);

export function Header() {
  const { t } = useLang();
  const scrolled = useScrolled(16);
  const raw = useActiveSection(observed);
  const active = raw ? (alias[raw] ?? raw) : "home";

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled ? "glass border-b border-line/70 shadow-[0_6px_24px_-18px_rgb(41_78_89/0.35)]" : "border-b border-transparent"
      }`}
    >
      <div className={`${container} flex h-16 items-center justify-between gap-6`}>
        <a href="#home" onClick={go("home")} aria-label={t.logoLabel} className="shrink-0 rounded-xl">
          <Logo caption={t.caption} />
        </a>

        <nav aria-label={t.header.menu}>
          <ul className="flex items-center gap-1 rounded-full border border-line/80 bg-white/55 p-1">
            {ids.map((id, i) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={go(id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-full px-[clamp(0.7rem,1.1vw,1.05rem)] py-2 text-[0.875rem] font-medium whitespace-nowrap transition-colors duration-200 ${
                      isActive ? "bg-white text-ink shadow-pearl" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {t.nav[navSections[i]]}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <LangSwitch />
          <a href="#contacts" onClick={go("contacts")} aria-label={t.header.contact} className="btn btn-ink h-10 min-h-0 px-3 text-[0.875rem] xl:px-4">
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="hidden xl:inline">{t.header.contact}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
