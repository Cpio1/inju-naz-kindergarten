"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useRef } from "react";
import { kindergarten, sectionIds } from "@/shared/data/kindergarten";
import { mediaRatio, useGallery } from "@/shared/hooks/useGallery";
import { useLang } from "@/shared/i18n/LanguageProvider";
import type { Media } from "@/shared/lib/media";
import { Pearl, Sparkle } from "@/shared/ui/Decor";
import { GalleryTile } from "@/shared/ui/GalleryTile";
import { InstagramIcon } from "@/shared/ui/Icons";
import { Lightbox } from "@/shared/ui/Lightbox";
import { MediaPlaceholder } from "@/shared/ui/MediaView";
import { Reveal } from "@/shared/ui/Reveal";
import { SectionHeading, container, sectionYCompact } from "../ui";

const INITIAL = 4;
const PER_ROW = 4;

/**
 * Justified rows of four. Every photo keeps its own proportions (nothing is cropped):
 * a cell is `--gal-h` tall and `--gal-h × ratio` wide; when a row is wider than the
 * column, flex shrinks all cells by the same factor, so heights stay equal.
 * `--gal-h` follows the visible browser height, so heading + first row + button fit
 * one laptop screen under the fixed header.
 */
const rowHeight = { "--gal-h": "clamp(9.5rem, 42dvh, 20rem)" } as React.CSSProperties;

/** Pearl-shell corners: the outer cells of a row get the soft, larger radius. */
function corner(k: number, n: number) {
  if (n === 1) return "rounded-[2rem_1rem_2rem_1rem]";
  if (k === 0) return "rounded-[2rem_0.9rem_0.9rem_2rem]";
  if (k === n - 1) return "rounded-[0.9rem_2rem_2rem_0.9rem]";
  return k % 2 ? "rounded-[0.9rem_1.6rem_0.9rem_0.9rem]" : "rounded-[0.9rem_0.9rem_1.6rem_0.9rem]";
}

const cellStyle = (ratio: number): React.CSSProperties => ({ flex: `0 1 calc(var(--gal-h) * ${ratio})`, aspectRatio: ratio });

function chunks<T>(items: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

export function Gallery({ items }: { items: Media[] }) {
  const { t } = useLang();
  const g = useGallery(items, INITIAL);
  const top = useRef<HTMLDivElement>(null);

  const renderRow = (row: Media[], start: number) => (
    <div key={start} className="flex items-center justify-center gap-[clamp(0.6rem,1vw,0.8rem)]" style={rowHeight}>
      {row.map((item, k) => {
        const ratio = mediaRatio(item);
        return (
          <div key={item.src} className={`min-w-0 overflow-hidden ${corner(k, row.length)}`} style={cellStyle(ratio)}>
            <GalleryTile item={item} index={start + k} sizes={`${Math.min(720, Math.round(320 * ratio))}px`} onOpen={g.show} />
          </div>
        );
      })}
    </div>
  );

  const extra = chunks(items.slice(INITIAL), PER_ROW);

  return (
    <section id={sectionIds.gallery} data-section aria-labelledby="gallery-title" className={`relative ${sectionYCompact}`}>
      <div ref={top} className={container}>
        <SectionHeading compact id="gallery-title" eyebrow={t.gallery.eyebrow} title={t.gallery.title} intro={t.gallery.intro} />

        {items.length === 0 ? (
          <EmptyGallery />
        ) : (
          <Reveal className="flex flex-col gap-[clamp(0.6rem,1vw,0.8rem)]">
            {renderRow(items.slice(0, INITIAL), 0)}
            <AnimatePresence initial={false}>
              {g.expanded && (
                <m.div
                  key="more"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-[clamp(0.6rem,1vw,0.8rem)] overflow-hidden"
                >
                  {extra.map((row, r) => renderRow(row, INITIAL + r * PER_ROW))}
                </m.div>
              )}
            </AnimatePresence>
          </Reveal>
        )}

        {g.canExpand && (
          <div className="mt-[clamp(0.9rem,2.4dvh,1.5rem)] flex justify-center">
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

const placeholderRatios = [1.35, 0.8, 1.2, 0.8];

/** Until photos are uploaded: the same row in pearl tones, with a pointer to Instagram. */
function EmptyGallery() {
  const { t } = useLang();
  return (
    <Reveal className="relative">
      <div className="flex items-center justify-center gap-[clamp(0.6rem,1vw,0.8rem)]" style={rowHeight} aria-hidden="true">
        {placeholderRatios.map((ratio, k) => (
          <div key={k} className={`relative min-w-0 overflow-hidden ${corner(k, placeholderRatios.length)}`} style={cellStyle(ratio)}>
            <MediaPlaceholder compact />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 grid place-items-center p-6">
        <div className="glass relative flex max-w-sm flex-col items-center rounded-[2rem_1rem_2rem_1rem] border border-white px-7 py-[clamp(1rem,3dvh,1.6rem)] text-center shadow-float">
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
