"use client";

import { groups, sectionIds, type Group } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { PearlThread } from "@/shared/ui/Decor";
import { GroupArt, toneStyles } from "@/shared/ui/GroupArt";
import { Reveal } from "@/shared/ui/Reveal";
import { SectionHeading, container, sectionY } from "../ui";

const shapes = [
  "rounded-[2.5rem_1.25rem_2.5rem_1.25rem]",
  "rounded-[1.25rem_2.5rem_1.25rem_2.5rem]",
  "rounded-[2.5rem_2.5rem_1.25rem_2.5rem]",
  "rounded-[1.25rem_2.75rem_2.75rem_1.25rem]",
  "rounded-[2.75rem_1.25rem_1.25rem_2.75rem]",
];

/** 3 + 2: three upright cards, then two wide ones — five groups, five different silhouettes. */
export function Groups() {
  const { t } = useLang();
  return (
    <section id={sectionIds.groups} data-section aria-labelledby="groups-title" className={`relative ${sectionY}`}>
      <div className={container}>
        <SectionHeading
          id="groups-title"
          eyebrow={t.groups.eyebrow}
          title={t.groups.title}
          intro={t.groups.intro}
          aside={<PearlThread className="mt-3 ml-auto w-44" count={9} bend={0.25} />}
        />
        <ul className="grid grid-cols-6 gap-[clamp(0.9rem,1.5vw,1.25rem)]">
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

function GroupCard({ group, index, wide }: { group: Group; index: number; wide: boolean }) {
  const { t } = useLang();
  const tone = toneStyles[group.tone];
  const [from, to] = group.ages;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`group relative isolate flex h-full overflow-hidden border border-white/70 shadow-pearl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-float ${shapes[index]} ${
        wide ? "min-h-[clamp(8.75rem,19vh,11.5rem)] items-center gap-[clamp(1rem,2vw,1.75rem)] p-[clamp(1.1rem,2vw,1.6rem)]" : "min-h-[clamp(11.25rem,27vh,15rem)] flex-col p-[clamp(1.1rem,1.8vw,1.5rem)]"
      }`}
      style={{ background: `linear-gradient(150deg, #ffffff 0%, ${tone.surface} 55%, ${tone.soft} 130%)` }}
    >
      {/* soft tinted shell behind the illustration */}
      <span
        aria-hidden="true"
        className={`absolute -z-10 rounded-[46%_54%_42%_58%] opacity-70 transition-transform duration-500 group-hover:scale-110 ${
          wide ? "top-1/2 left-[clamp(0.6rem,1.4vw,1.1rem)] h-32 w-32 -translate-y-1/2" : "-top-6 -right-6 h-32 w-32"
        }`}
        style={{ background: tone.soft }}
      />

      {wide ? (
        <>
          <GroupArt motif={group.motif} tone={group.tone} className="h-[clamp(6rem,13vh,7.5rem)] w-[clamp(6rem,13vh,7.5rem)] shrink-0 transition-transform duration-500 group-hover:-rotate-3" />
          <div className="min-w-0 flex-1">
            <CardText group={group} number={number} />
          </div>
          <AgeBadge label={t.groups.ageLabel} value={t.groups.age(from, to)} color={tone.deep} />
        </>
      ) : (
        <>
          <div className="flex items-start justify-between">
            <span className="font-display text-[0.95rem] italic" style={{ color: tone.deep }}>
              {number}
            </span>
            <GroupArt motif={group.motif} tone={group.tone} className="-mt-1 -mr-1 h-[clamp(5.5rem,12vh,6.75rem)] w-[clamp(5.5rem,12vh,6.75rem)] transition-transform duration-500 group-hover:-rotate-3" />
          </div>
          <div className="mt-auto">
            <CardText group={group} />
            <div className="mt-3">
              <AgeBadge label={t.groups.ageLabel} value={t.groups.age(from, to)} color={tone.deep} inline />
            </div>
          </div>
        </>
      )}
    </article>
  );
}

function CardText({ group, number }: { group: Group; number?: string }) {
  const { t } = useLang();
  const tone = toneStyles[group.tone];
  const [from, to] = group.ages;
  return (
    <>
      {number && (
        <span className="font-display text-[0.95rem] italic" style={{ color: tone.deep }}>
          {number}
        </span>
      )}
      <h3 className="text-[clamp(1.45rem,2vw,1.8rem)] leading-tight text-ink">{group.name}</h3>
      <p className="mt-1 text-[0.95rem] font-medium" style={{ color: tone.deep }}>
        {t.groups.category[group.id]}
      </p>
      <p className="mt-1 text-[0.85rem] text-ink-soft">{t.groups.description(from, to)}</p>
    </>
  );
}

function AgeBadge({ label, value, color, inline = false }: { label: string; value: string; color: string; inline?: boolean }) {
  if (inline) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-white/85 py-1 pr-3 pl-1 text-[0.85rem] font-semibold text-ink shadow-[0_1px_0_#fff_inset]">
        <span className="grid h-6 w-6 place-items-center rounded-full" style={{ background: color }} aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white" />
        </span>
        <span className="sr-only">{label}: </span>
        {value}
      </span>
    );
  }
  return (
    <span className="grid shrink-0 place-items-center rounded-[1.5rem_1rem_1.5rem_1rem] bg-white/85 px-4 py-3 text-center shadow-[0_1px_0_#fff_inset]">
      <span className="text-[0.7rem] font-medium text-ink-soft">{label}</span>
      <span className="font-display text-[1.35rem] leading-tight font-semibold whitespace-nowrap" style={{ color }}>
        {value}
      </span>
    </span>
  );
}
