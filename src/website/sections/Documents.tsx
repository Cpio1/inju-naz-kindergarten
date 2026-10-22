"use client";

import { ExternalLink, FolderOpen } from "lucide-react";
import { kindergarten, sectionIds } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { Pearl, PearlThread, Sparkle } from "@/shared/ui/Decor";
import { DocumentsArt } from "@/shared/ui/Illustrations";
import { Reveal } from "@/shared/ui/Reveal";
import { container } from "../ui";

/** One compact pearl card: emblem, title + short text, and the Google Drive button. */
export function Documents() {
  const { t } = useLang();
  const d = t.documents;
  const url = kindergarten.documents.driveUrl;

  return (
    <section id={sectionIds.documents} data-section aria-labelledby="documents-title" className="relative py-[clamp(1.5rem,5dvh,3rem)]">
      <div className={container}>
        <Reveal>
          <div className="nacre relative isolate grid grid-cols-[auto_1fr_auto] items-center gap-[clamp(1.5rem,3vw,2.75rem)] overflow-hidden rounded-[3rem_1.25rem_3rem_1.25rem] border border-white px-[clamp(1.5rem,3.5vw,3rem)] py-[clamp(1.25rem,3.5dvh,2rem)] shadow-pearl">
            <div aria-hidden="true" className="absolute -top-16 -left-10 -z-10 h-56 w-56 rounded-[46%_54%_60%_40%] bg-lavender-soft/80 blur-2xl" />
            <div aria-hidden="true" className="absolute -right-10 -bottom-20 -z-10 h-56 w-72 rounded-[58%_42%_44%_56%] bg-turquoise-soft/70 blur-2xl" />

            <DocumentsArt className="w-[clamp(6rem,10vw,8rem)]" />

            <div className="min-w-0">
              <p className="eyebrow">{d.eyebrow}</p>
              <h2 id="documents-title" className="mt-2 text-[clamp(1.75rem,min(2.5vw,4.6dvh),2.5rem)] leading-[1.1] text-ink">
                {d.title}
              </h2>
              <p className="mt-2 max-w-[44ch] text-[clamp(0.95rem,1.05vw,1.02rem)] leading-relaxed text-ink-soft">{d.text}</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-ink group">
                  <FolderOpen className="h-4 w-4" aria-hidden="true" />
                  {d.open}
                  <ExternalLink className="h-3.5 w-3.5 opacity-80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              ) : (
                <span aria-disabled="true" className="btn btn-ghost cursor-default opacity-60">
                  <FolderOpen className="h-4 w-4" aria-hidden="true" />
                  {d.open}
                </span>
              )}
              <span className="text-[0.78rem] text-ink-soft">{url ? d.note : d.soon}</span>
            </div>

            <PearlThread className="pointer-events-none absolute top-3 right-[18%] w-32 opacity-80" count={7} bend={0.25} />
            <Pearl tint="powder" className="absolute bottom-4 left-[clamp(7.5rem,13vw,10rem)] w-4" />
            <Sparkle className="absolute top-5 right-6 w-4" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
