"use client";

import { groups, sectionIds, type Group } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { PearlThread } from "@/shared/ui/Decor";
import { GroupArt, toneStyles } from "@/shared/ui/GroupArt";
import { Reveal } from "@/shared/ui/Reveal";
import { SectionHeading, container, sectionYCompact } from "../ui";

const shapes = [
  "rounded-[2.5rem_1.25rem_2.5rem_1.25rem]",
  "rounded-[1.25rem_2.5rem_1.25rem_2.5rem]",
  "rounded-[2.5rem_2.5rem_1.25rem_2.5rem]",
  "rounded-[1.25rem_2.75rem_2.75rem_1.25rem]",
  "rounded-[2.75rem_1.25rem_1.25rem_2.75rem]",
];

/**
 * 3 + 2: three cards on top, two wide ones below — five groups, five different silhouettes.
 * Heights follow the visible browser height (dvh), so heading + all five cards fit one
 * laptop screen under the fixed header (≈ 630px of page on a 1366×768 laptop).
 */
export function Groups() {
  const { t } = useLang();
  return (
    <section id={sectionIds.groups} data-section aria-labelledby="groups-title" className={`relative ${sectionYCompact}`}>
      <div className={container}>
        <SectionHeading
          compact
          id="groups-title"
          eyebrow={t.groups.eyebrow}
          title={t.groups.title}
          intro={t.groups.intro}
          aside={<PearlThread className="mt-2 ml-auto w-36" count={9} bend={0.25} />}
        />
        <ul className="grid grid-cols-6 gap-[clamp(0.75rem,min(1.2vw,2dvh),1rem)]">
          {groups.map((group, i) => (
            <Reveal as="li" key={group.id} delay={0.06 * i} className={i < 3 ? "col-span-2" : "col-span-3"}>
              <GroupCard group={group} index={i} wide={i >= 3} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Card heights: the two rows together take ≈ 46% of the visible height, never less than their text needs. */
const topRow = "h-[clamp(9.75rem,26dvh,12rem)]";
const bottomRow = "h-[clamp(7.25rem,19dvh,9rem)]";
const artTop = "h-[clamp(4rem,11dvh,5.5rem)] w-[clamp(4rem,11dvh,5.5rem)]";
const artWide = "h-[clamp(4.5rem,13dvh,6rem)] w-[clamp(4.5rem,13dvh,6rem)]";

function GroupCard({ group, index, wide }: { group: Group; index: number; wide: boolean }) {
  const { t } = useLang();
  const tone = toneStyles[group.tone];
  const [from, to] = group.ages;
  const number = String(index + 1).padStart(2, "0");
  const age = t.groups.age(from, to);

  return (
    <article
      className={`group relative isolate flex overflow-hidden border border-white/70 shadow-pearl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-float ${shapes[index]} ${
        wide
          ? `${bottomRow} items-center gap-[clamp(0.9rem,1.6vw,1.4rem)] px-[clamp(1rem,1.8vw,1.4rem)] py-3`
          : `${topRow} flex-col px-[clamp(1rem,1.6vw,1.3rem)] py-[clamp(0.8rem,2dvh,1.1rem)]`
      }`}
      style={{ background: `linear-gradient(150deg, #ffffff 0%, ${tone.surface} 55%, ${tone.soft} 130%)` }}
    >
      {/* soft tinted shell behind the illustration */}
      <span
        aria-hidden="true"
        className={`absolute -z-10 rounded-[46%_54%_42%_58%] opacity-70 transition-transform duration-500 group-hover:scale-110 ${
          wide ? "top-1/2 left-[clamp(0.5rem,1vw,0.8rem)] h-[clamp(5.5rem,15dvh,7rem)] w-[clamp(5.5rem,15dvh,7rem)] -translate-y-1/2" : "-top-5 -right-5 h-[clamp(6rem,17dvh,7.5rem)] w-[clamp(6rem,17dvh,7.5rem)]"
        }`}
        style={{ background: tone.soft }}
      />

      {wide ? (
        <>
          <GroupArt motif={group.motif} tone={group.tone} className={`${artWide} shrink-0 transition-transform duration-500 group-hover:-rotate-3`} />
          <div className="min-w-0 flex-1">
            <span className="font-display text-[0.85rem] italic" style={{ color: tone.deep }}>
              {number}
            </span>
            <CardText group={group} />
          </div>
          <AgeBadge label={t.groups.ageLabel} value={age} color={tone.deep} />
        </>
      ) : (
        <>
          <span className="font-display text-[0.85rem] italic" style={{ color: tone.deep }}>
            {number}
          </span>
          {/* illustration sits in the empty top-right corner, away from the text */}
          <GroupArt
            motif={group.motif}
            tone={group.tone}
            className={`absolute top-[clamp(0.4rem,1.2dvh,0.75rem)] right-[clamp(0.5rem,1vw,0.9rem)] ${artTop} transition-transform duration-500 group-hover:-rotate-3`}
          />
          <div className="mt-auto">
            <CardText group={group} />
            <div className="mt-[clamp(0.4rem,1.2dvh,0.7rem)]">
              <AgeBadge label={t.groups.ageLabel} value={age} color={tone.deep} inline />
            </div>
          </div>
        </>
      )}
    </article>
  );
}

function CardText({ group }: { group: Group }) {
  const { t } = useLang();
  const tone = toneStyles[group.tone];
  const [from, to] = group.ages;
  return (
    <>
      <h3 className="text-[clamp(1.3rem,min(1.75vw,3.4dvh),1.6rem)] leading-tight text-ink">{group.name}</h3>
      <p className="mt-0.5 text-[0.9rem] leading-snug font-medium" style={{ color: tone.deep }}>
        {t.groups.category[group.id]}
      </p>
      <p className="mt-0.5 text-[0.8rem] leading-snug text-ink-soft">{t.groups.description(from, to)}</p>
    </>
  );
}

function AgeBadge({ label, value, color, inline = false }: { label: string; value: string; color: string; inline?: boolean }) {
  if (inline) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-white/85 py-0.5 pr-3 pl-0.5 text-[0.8rem] font-semibold text-ink shadow-[0_1px_0_#fff_inset]">
        <span className="grid h-5 w-5 place-items-center rounded-full" style={{ background: color }} aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        <span className="sr-only">{label}: </span>
        {value}
      </span>
    );
  }
  return (
    <span className="grid shrink-0 place-items-center rounded-[1.25rem_0.8rem_1.25rem_0.8rem] bg-white/85 px-3.5 py-2 text-center shadow-[0_1px_0_#fff_inset]">
      <span className="text-[0.68rem] font-medium text-ink-soft">{label}</span>
      <span className="font-display text-[clamp(1.1rem,min(1.5vw,3dvh),1.3rem)] leading-tight font-semibold whitespace-nowrap" style={{ color }}>
        {value}
      </span>
    </span>
  );
}
