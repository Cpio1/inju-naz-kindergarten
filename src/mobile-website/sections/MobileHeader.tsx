"use client";

import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { kindergarten, navSections, sectionIds } from "@/shared/data/kindergarten";
import { useBodyLock } from "@/shared/hooks/useBodyLock";
import { useScrolled } from "@/shared/hooks/useScrolled";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { scrollToSection } from "@/shared/lib/scroll";
import { Pearl, PearlThread } from "@/shared/ui/Decor";
import { InstagramIcon } from "@/shared/ui/Icons";
import { LangSwitch } from "@/shared/ui/LangSwitch";
import { Logo } from "@/shared/ui/Logo";

export function MobileHeader() {
  const { t } = useLang();
  const scrolled = useScrolled(8);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    // focus moves into the menu (the panel itself, so no focus ring flashes on a tap)
    panel.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /** Close first (unlocking scroll), then glide to the section on the next frames. */
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)));
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${scrolled || open ? "glass shadow-[0_6px_20px_-16px_rgb(41_78_89/0.4)]" : ""}`}>
        <div className="mx-auto flex h-[calc(3.5rem+env(safe-area-inset-top))] max-w-[36rem] items-center justify-between gap-2 px-[clamp(1rem,4.6vw,1.5rem)] pt-[env(safe-area-inset-top)]">
          <a href="#home" onClick={go(sectionIds.home)} aria-label={t.logoLabel} className="min-w-0 rounded-xl">
            <Logo caption={t.caption} size="sm" />
          </a>
          <div className="flex shrink-0 items-center gap-2">
            <LangSwitch compact />
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.header.menuClose : t.header.menuOpen}
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white shadow-ink transition-transform active:scale-95"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
      {/* outside <header>: its backdrop-filter would otherwise trap this fixed panel inside the bar */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            key="menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[calc(3.5rem+env(safe-area-inset-top))] bottom-0 z-40 overflow-y-auto overscroll-contain bg-milk"
          >
            <nav ref={panel} tabIndex={-1} aria-label={t.header.menu} className="mx-auto outline-none max-w-[36rem] px-[clamp(1rem,4.6vw,1.5rem)] pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <ul className="space-y-1.5">
                {navSections.map((key, i) => (
                  <li key={key}>
                    <a
                      href={`#${sectionIds[key]}`}
                      onClick={go(sectionIds[key])}
                      className="flex min-h-14 items-center justify-between rounded-[1.25rem_0.75rem_1.25rem_0.75rem] border border-white bg-white/75 px-4 font-display text-[1.3rem] text-ink shadow-pearl active:bg-white"
                    >
                      <span className="flex items-center gap-3">
                        <Pearl tint={(["turquoise", "lavender", "powder", "gold", "white"] as const)[i]} className="w-4" />
                        {t.nav[key]}
                      </span>
                      <ArrowRight className="h-4 w-4 text-ink-soft" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>

              <PearlThread className="mx-auto my-5 w-40" count={8} bend={0.22} />

              <div className="grid grid-cols-1 gap-2.5">
                {kindergarten.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} aria-label={t.contacts.callPerson(p.person)} className="flex min-h-14 items-center gap-3 rounded-2xl bg-ink px-4 text-white shadow-ink">
                    <Phone className="h-5 w-5 text-turquoise" aria-hidden="true" />
                    <span className="flex flex-col leading-tight">
                      <span className="text-[1rem] font-semibold">{p.display}</span>
                      <span className="text-[0.75rem] text-white/65">{p.person}</span>
                    </span>
                  </a>
                ))}
                <a href={kindergarten.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-pearl min-h-12 justify-start px-4">
                  <InstagramIcon className="h-5 w-5 text-powder-deep" />
                  {kindergarten.instagram.handle}
                </a>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
