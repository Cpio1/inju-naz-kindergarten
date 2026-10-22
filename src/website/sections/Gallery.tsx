"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useRef } from "react";
import { kindergarten, sectionIds } from "@/shared/data/kindergarten";
import { useGallery } from "@/shared/hooks/useGallery";
import { useLang } from "@/shared/i18n/LanguageProvider";
import type { Media } from "@/shared/lib/media";
import { Pearl, Sparkle } from "@/shared/ui/Decor";
import { GalleryTile } from "@/shared/ui/GalleryTile";
import { InstagramIcon } from "@/shared/ui/Icons";
import { Lightbox } from "@/shared/ui/Lightbox";
import { MediaPlaceholder } from "@/shared/ui/MediaView";
import { Reveal } from "@/shared/ui/Reveal";
import { SectionHeading, container, sectionY } from "../ui";

const INITIAL = 6;

/**
 * Mosaic of 6 cells on a 4×3 grid: one large, one tall, one wide… repeated for every
 * six photos. Row height follows the viewport height so a laptop sees the whole block.
 */
const pattern = [
  "col-span-2 row-span-2 rounded-[2.25rem_1rem_1rem_1rem]",
  "rounded-[1rem_2rem_1rem_1rem]",
  "row-span-2 rounded-[1rem_1rem_2.25rem_1rem]",
  "rounded-[1rem]",
  "col-span-2 rounded-[1rem_1rem_1rem_2.25rem]",
  "col-span-2 rounded-[1rem_1rem_2.25rem_1rem]",
];
const patternSizes = ["(min-width:1180px) 580px, 50vw", "290px", "290px", "290px", "580px", "580px"];

/** Grid for a leftover chunk (< 6 photos) — always fills its rows, never leaves holes. */
const tailCols: Record<number, string> = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4", 5: "grid-cols-6" };

const rows = "auto-rows-[clamp(8.5rem,19vh,11.5rem)]";

function chunks<T>(items: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

export function Gallery({ items }: { items: Media[] }) {
  const { t } = useLang();
  const g = useGallery(items, INITIAL);
  const top = useRef<HTMLDivElement>(null);

  const renderChunk = (chunk: Media[], start: number) => {
    if (chunk.length === 6) {
      return (
        <div key={start} className={`grid grid-cols-4 ${rows} gap-3`}>
          {chunk.map((item, k) => (
            <div key={item.src} className={pattern[k]} style={{ overflow: "hidden" }}>
              <GalleryTile item={item} index={start + k} sizes={patternSizes[k]} onOpen={g.show} />
            </div>
          ))}
        </div>
      );
    }
    const n = chunk.length;
    return (
      <div key={start} className={`grid ${tailCols[n]} ${rows} gap-3`}>
        {chunk.map((item, k) => (
          <div key={item.src} className={`overflow-hidden rounded-[1rem_1.75rem_1rem_1.75rem] ${n === 5 ? (k < 3 ? "col-span-2" : "col-span-3") : ""}`}>
            <GalleryTile item={item} index={start + k} sizes={n <= 2 ? "580px" : "390px"} onOpen={g.show} />
          </div>
        ))}
      </div>
    );
  };

  const initial = items.slice(0, INITIAL);
  const extra = chunks(items.slice(INITIAL), 6);

  return (
    <section id={sectionIds.gallery} data-section aria-labelledby="gallery-title" className={`relative ${sectionY}`}>
      <div ref={top} className={container}>
        <SectionHeading id="gallery-title" eyebrow={t.gallery.eyebrow} title={t.gallery.title} intro={t.gallery.intro} />

        {items.length === 0 ? (
          <EmptyGallery />
        ) : (
          <Reveal className="flex flex-col gap-3">
            {renderChunk(initial, 0)}
            <AnimatePresence initial={false}>
              {g.expanded && (
                <m.div
                  key="more"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-3 overflow-hidden"
                >
                  {extra.map((chunk, c) => renderChunk(chunk, INITIAL + c * 6))}
                </m.div>
              )}
            </AnimatePresence>
          </Reveal>
        )}

        {g.canExpand && (
          <div className="mt-[clamp(1.25rem,3vh,2rem)] flex justify-center">
            <button
              type="button"
              aria-expanded={g.expanded}
              onClick={() => {
                if (g.expanded) top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                g.toggle();
              }}
              className="btn btn-pearl"
            >
              {g.expanded ? t.gallery.less : t.gallery.more}
              {!g.expanded && <span className="rounded-full bg-lavender-soft px-2 py-0.5 text-xs font-semibold text-lavender-deep">+{g.hiddenCount}</span>}
              {g.expanded ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        )}
      </div>

      <Lightbox items={items} index={g.open} onClose={g.close} onStep={g.step} />
    </section>
  );
}

/** Until photos are uploaded: the same mosaic in pearl tones, with a pointer to Instagram. */
function EmptyGallery() {
  const { t } = useLang();
  return (
    <Reveal className="relative">
      <div className={`grid grid-cols-4 ${rows} gap-3`} aria-hidden="true">
        {pattern.map((cls, k) => (
          <div key={k} className={`relative overflow-hidden ${cls}`}>
            <MediaPlaceholder compact />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 grid place-items-center p-6">
        <div className="glass relative flex max-w-sm flex-col items-center rounded-[2rem_1rem_2rem_1rem] border border-white px-8 py-7 text-center shadow-float">
          <Pearl tint="lavender" className="w-9" />
          <p className="mt-3 font-display text-[1.35rem] leading-snug text-ink">{t.gallery.empty}</p>
          <p className="mt-1.5 text-[0.9rem] text-ink-soft">{t.gallery.emptyHint}</p>
          <a href={kindergarten.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ink mt-4">
            <InstagramIcon className="h-4 w-4" />
            {kindergarten.instagram.handle}
          </a>
          <Sparkle className="absolute -top-3 -right-3 w-5" />
        </div>
      </div>
    </Reveal>
  );
}
