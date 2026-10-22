"use client";

import { ExternalLink, FolderOpen } from "lucide-react";
import { kindergarten, sectionIds } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { Sparkle } from "@/shared/ui/Decor";
import { DocumentsArt } from "@/shared/ui/Illustrations";
import { Reveal } from "@/shared/ui/Reveal";
import { mContainer } from "../ui";

/** Compact card: emblem beside the title, text, full-width Google Drive button. */
export function MobileDocuments() {
  const { t } = useLang();
  const d = t.documents;
  const url = kindergarten.documents.driveUrl;

  return (
    <section id={sectionIds.documents} data-section aria-labelledby="m-documents-title" className="py-6">
      <div className={mContainer}>
        <Reveal y={10}>
          <div className="nacre relative overflow-hidden rounded-[2rem_0.9rem_2rem_0.9rem] border border-white p-4 shadow-pearl">
            <div className="flex items-center gap-3.5">
              <DocumentsArt className="w-[4.5rem] shrink-0" />
              <div className="min-w-0">
                <p className="eyebrow">{d.eyebrow}</p>
                <h2 id="m-documents-title" className="mt-1 text-[clamp(1.5rem,7vw,1.8rem)] leading-[1.15] text-ink">
                  {d.title}
                </h2>
              </div>
            </div>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">{d.text}</p>

            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-ink mt-4 min-h-12 w-full">
                <FolderOpen className="h-4 w-4" aria-hidden="true" />
                {d.open}
                <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden="true" />
              </a>
            ) : (
              <span aria-disabled="true" className="btn btn-ghost mt-4 min-h-12 w-full cursor-default opacity-60">
                <FolderOpen className="h-4 w-4" aria-hidden="true" />
                {d.open}
              </span>
            )}
            <p className="mt-2 text-center text-[0.75rem] text-ink-soft">{url ? d.note : d.soon}</p>

            <Sparkle className="absolute top-4 right-4 w-3.5" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
