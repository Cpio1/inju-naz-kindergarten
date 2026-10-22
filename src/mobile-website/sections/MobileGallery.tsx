"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useRef } from "react";
import { kindergarten, sectionIds } from "@/shared/data/kindergarten";
import { mediaRatio, useGallery } from "@/shared/hooks/useGallery";
import { useLang } from "@/shared/i18n/LanguageProvider";
import type { Media } from "@/shared/lib/media";
import { Pearl } from "@/shared/ui/Decor";
import { GalleryTile } from "@/shared/ui/GalleryTile";
import { InstagramIcon } from "@/shared/ui/Icons";
import { Lightbox } from "@/shared/ui/Lightbox";
import { MediaPlaceholder } from "@/shared/ui/MediaView";
import { Reveal } from "@/shared/ui/Reveal";
import { MSectionHeading, mContainer, mSectionY } from "../ui";

const INITIAL = 4;

/** Placeholder layout while there are no photos: 2 columns, one tall, two small, one wide. */
const pattern = [
  "row-span-2 rounded-[1.5rem_0.6rem_0.6rem_0.6rem]",
  "rounded-[0.6rem_1.5rem_0.6rem_0.6rem]",
  "rounded-[0.6rem]",
  "col-span-2 rounded-[0.6rem_0.6rem_1.5rem_1.5rem]",
];
const rows = "auto-rows-[clamp(7rem,31vw,9.5rem)]";

const PER_ROW = 2;

/** Alternating pearl-shell corners so the column of photos doesn't look like a plain grid. */
function corner(row: number, k: number, n: number) {
  if (n === 1) return "rounded-[1.5rem_0.6rem_1.5rem_0.6rem]";
  const big = (row + k) % 2 === 0;
  if (k === 0) return big ? "rounded-[1.5rem_0.6rem_0.6rem_0.6rem]" : "rounded-[0.6rem_0.6rem_0.6rem_1.5rem]";
  return big ? "rounded-[0.6rem_0.6rem_1.5rem_0.6rem]" : "rounded-[0.6rem_1.5rem_0.6rem_0.6rem]";
}

function chunks<T>(items: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

export function MobileGallery({ items }: { items: Media[] }) {
  const { t } = useLang();
  const g = useGallery(items, INITIAL);
  const top = useRef<HTMLDivElement>(null);

  /**
   * Rows of two that keep every photo's proportions: widths are shared in proportion to the
   * aspect ratios, so both photos in a row get the same height and nothing is cropped.
   * A lone last photo is centred and capped in height instead of filling the whole width.
   */
  const renderRow = (row: Media[], start: number) => (
    <div key={start} className="flex justify-center gap-2">
      {row.map((item, k) => {
        const ratio = mediaRatio(item);
        const style: React.CSSProperties =
          row.length === 1 ? { width: `min(100%, ${(ratio * 13).toFixed(2)}rem)`, aspectRatio: ratio } : { flex: `${ratio} 1 0`, aspectRatio: ratio };
        return (
          <div key={item.src} className={`min-w-0 overflow-hidden ${corner(start / PER_ROW, k, row.length)}`} style={style}>
            <GalleryTile item={item} index={start + k} sizes={row.length === 1 ? "70vw" : "50vw"} onOpen={g.show} />
          </div>
        );
      })}
    </div>
  );

  return (
    <section id={sectionIds.gallery} data-section aria-labelledby="m-gallery-title" className={mSectionY}>
      <div ref={top} className={mContainer}>
        <MSectionHeading id="m-gallery-title" eyebrow={t.gallery.eyebrow} title={t.gallery.title} intro={t.gallery.intro} />

        {items.length === 0 ? (
          <Reveal y={10} className="relative">
            <div className={`grid grid-cols-2 ${rows} gap-2`} aria-hidden="true">
              {pattern.map((cls, k) => (
                <div key={k} className={`relative overflow-hidden ${cls}`}>
                  <MediaPlaceholder compact />
                </div>
              ))}
            </div>
            <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-[1.25rem_0.75rem_1.25rem_0.75rem] border border-white bg-white/92 p-3 shadow-float">
              <Pearl tint="lavender" className="w-7 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-display text-[1rem] leading-snug text-ink">{t.gallery.empty}</p>
                <a href={kindergarten.instagram.url} target="_blank" rel="noopener noreferrer" className="mt-0.5 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-turquoise-deep">
                  <InstagramIcon className="h-3.5 w-3.5" />
                  {kindergarten.instagram.handle}
                </a>
              </div>
            </div>
          </Reveal>
        ) : (
          <Reveal y={10} className="flex flex-col gap-2">
            {chunks(items.slice(0, INITIAL), PER_ROW).map((row, r) => renderRow(row, r * PER_ROW))}
            <AnimatePresence initial={false}>
              {g.expanded && (
                <m.div
                  key="more"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-2 overflow-hidden"
                >
                  {chunks(items.slice(INITIAL), PER_ROW).map((row, r) => renderRow(row, INITIAL + r * PER_ROW))}
                </m.div>
              )}
            </AnimatePresence>
          </Reveal>
        )}

        {g.canExpand && (
          <button
            type="button"
            aria-expanded={g.expanded}
            onClick={() => {
              if (g.expanded) top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              g.toggle();
            }}
            className="btn btn-pearl mt-4 min-h-12 w-full"
          >
            {g.expanded ? t.gallery.less : t.gallery.more}
            {!g.expanded && <span className="rounded-full bg-lavender-soft px-2 py-0.5 text-xs font-semibold text-lavender-deep">+{g.hiddenCount}</span>}
            {g.expanded ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
          </button>
        )}
      </div>

      <Lightbox items={items} index={g.open} onClose={g.close} onStep={g.step} />
    </section>
  );
}
