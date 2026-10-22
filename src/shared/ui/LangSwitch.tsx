"use client";

import { dictionaries, useLang, type Lang } from "@/shared/i18n/LanguageProvider";

const order: Lang[] = ["kk", "ru"];

/** ҚАЗ / РУС segmented switch with a sliding pearl. */
export function LangSwitch({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useLang();
  const h = compact ? "h-9" : "h-10";
  const w = compact ? "w-[3.1rem]" : "w-[3.4rem]";
  return (
    <div role="group" aria-label={t.header.language} className={`relative inline-flex ${h} items-center rounded-full border border-line bg-white/70 p-1`}>
      <span
        aria-hidden="true"
        className={`absolute top-1 bottom-1 left-1 ${w} rounded-full bg-ink shadow-ink transition-transform duration-300 ease-out`}
        style={{ transform: lang === "ru" ? "translateX(100%)" : "translateX(0)" }}
      />
      {order.map((code) => (
        <button
          key={code}
          type="button"
          lang={dictionaries[code].htmlLang}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`relative z-10 ${w} h-full rounded-full text-[0.75rem] font-semibold tracking-[0.06em] transition-colors duration-300 ${
            lang === code ? "text-white" : "text-ink-soft hover:text-ink"
          }`}
        >
          {dictionaries[code].short}
        </button>
      ))}
    </div>
  );
}
