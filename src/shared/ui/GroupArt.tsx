import { useId } from "react";
import type { GroupMotif, Tone } from "@/shared/data/kindergarten";

/** Per-group pastel tone: card surface, illustration accent, deeper text accent. */
export const toneStyles: Record<Tone, { surface: string; soft: string; accent: string; deep: string }> = {
  pink: { surface: "#F9E8F1", soft: "#F2D7E6", accent: "#E3AFCB", deep: "#A5577F" },
  lilac: { surface: "#EEE8FB", soft: "#DCD1F4", accent: "#B9A9E6", deep: "#6C5BA8" },
  sky: { surface: "#E4F1F6", soft: "#CDE5EE", accent: "#9CCBDD", deep: "#3E7891" },
  peach: { surface: "#FBEDE2", soft: "#F6DCC8", accent: "#EDBB98", deep: "#A3613A" },
  sand: { surface: "#F5EEDC", soft: "#EBDDBB", accent: "#D7BC85", deep: "#8A6A2E" },
};

type Props = { motif: GroupMotif; tone: Tone; className?: string };

/** Hand-drawn SVG mascot for each group: beads, a bead string, a dove, a butterfly, a baby camel. */
export function GroupArt({ motif, tone, className = "" }: Props) {
  const id = useId().replace(/:/g, "");
  const c = toneStyles[tone];
  const pearl = (cx: number, cy: number, r: number, fill: string, key?: string | number) => (
    <g key={key}>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-sheen)`} />
      <ellipse cx={cx - r * 0.35} cy={cy - r * 0.38} rx={r * 0.28} ry={r * 0.17} fill="#fff" opacity="0.9" transform={`rotate(-30 ${cx - r * 0.35} ${cy - r * 0.38})`} />
    </g>
  );

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-sheen`} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#294e59" stopOpacity="0.16" />
        </radialGradient>
      </defs>

      {motif === "beads" && (
        <g>
          <ellipse cx="60" cy="102" rx="34" ry="5" fill="#294e59" opacity="0.07" />
          {pearl(46, 70, 22, "#ffffff")}
          {pearl(78, 76, 16, c.soft)}
          {pearl(70, 42, 13, "#ffffff")}
          {pearl(30, 40, 8, c.accent)}
          {pearl(94, 50, 6.5, "#ffffff")}
          {pearl(98, 92, 5, c.accent)}
          <path d="M28 18c.6 4 2.6 6.4 7 7-4.4.6-6.4 3-7 7-.6-4-2.6-6.4-7-7 4.4-.6 6.4-3 7-7Z" fill="#e3c48d" />
        </g>
      )}

      {motif === "bead-string" && (
        <g>
          <path d="M14 34C30 92 90 92 106 34" fill="none" stroke="#294e59" strokeOpacity="0.3" strokeWidth="1.6" />
          {[
            [16, 42, 6, "#ffffff"],
            [24, 60, 7.5, c.accent],
            [38, 74, 8.5, "#ffffff"],
            [60, 80, 11, c.soft],
            [82, 74, 8.5, "#ffffff"],
            [96, 60, 7.5, c.accent],
            [104, 42, 6, "#ffffff"],
          ].map(([x, y, r, f], i) => pearl(x as number, y as number, r as number, f as string, i))}
          <rect x="54" y="92" width="12" height="16" rx="6" fill={c.deep} opacity="0.75" />
          {pearl(60, 112, 5, "#e3c48d")}
          <path d="M60 18c.5 3.4 2.2 5.4 6 6-3.8.6-5.5 2.6-6 6-.5-3.4-2.2-5.4-6-6 3.8-.6 5.5-2.6 6-6Z" fill="#e3c48d" />
        </g>
      )}

      {motif === "dove" && (
        <g>
          <ellipse cx="60" cy="104" rx="32" ry="4.5" fill="#294e59" opacity="0.07" />
          {/* tail */}
          <path d="M30 70 6 62l8 14-6 10 26-6Z" fill={c.accent} opacity="0.75" />
          {/* body */}
          <path d="M28 72c0-20 22-32 44-26 4-10 14-16 24-12 6 2 9 7 9 12l9 3-9 4c-1 22-18 38-42 38-20 0-35-8-35-19Z" fill="#ffffff" stroke={c.accent} strokeWidth="1.6" />
          {/* wing */}
          <path d="M44 66c10-22 30-30 44-30-4 22-18 38-42 40-4 0-5-5-2-10Z" fill={c.soft} />
          <path d="M56 60c8-6 16-10 24-12M54 70c8-4 16-8 22-14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* eye + cheek */}
          <circle cx="96" cy="46" r="2.6" fill="#294e59" />
          <circle cx="92" cy="54" r="3" fill="#f2bfd5" opacity="0.8" />
          {/* sprig */}
          <path d="M114 50c4 6 2 12-2 16" stroke="#8fb79a" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx="117" cy="58" rx="3" ry="5" fill="#a9cfb3" transform="rotate(25 117 58)" />
          {pearl(20, 30, 6, "#ffffff")}
        </g>
      )}

      {motif === "butterfly" && (
        <g>
          <ellipse cx="60" cy="106" rx="30" ry="4.5" fill="#294e59" opacity="0.07" />
          <path d="M58 56C46 26 18 18 14 36c-3 14 14 26 42 26Z" fill={c.soft} stroke={c.accent} strokeWidth="1.6" />
          <path d="M62 56c12-30 40-38 44-20 3 14-14 26-42 26Z" fill="#ffffff" stroke={c.accent} strokeWidth="1.6" />
          <path d="M57 62C38 62 24 74 30 88c5 10 22 6 28-18Z" fill="#ffffff" stroke={c.accent} strokeWidth="1.6" />
          <path d="M63 62c19 0 33 12 27 26-5 10-22 6-28-18Z" fill={c.soft} stroke={c.accent} strokeWidth="1.6" />
          {pearl(32, 38, 6, c.accent)}
          {pearl(88, 40, 6, "#e9d5f3")}
          {pearl(40, 78, 4, c.accent)}
          {pearl(80, 78, 4, "#ffffff")}
          <rect x="56" y="44" width="8" height="44" rx="4" fill="#294e59" />
          <path d="M58 46c-4-10-10-16-16-18M62 46c4-10 10-16 16-18" stroke="#294e59" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          {pearl(42, 28, 3.6, "#e3c48d")}
          {pearl(78, 28, 3.6, "#e3c48d")}
        </g>
      )}

      {motif === "camel" && (
        <g>
          <ellipse cx="58" cy="108" rx="38" ry="4.5" fill="#294e59" opacity="0.1" />
          {/* far legs (darker) then near legs */}
          {[40, 74].map((x) => (
            <rect key={x} x={x} y="74" width="7.5" height="32" rx="3.75" fill={c.deep} opacity="0.55" />
          ))}
          {[30, 64].map((x) => (
            <rect key={x} x={x} y="74" width="8" height="32" rx="4" fill={c.accent} />
          ))}
          {/* body with one soft hump */}
          <path d="M20 72c0-13 9-22 21-22 3-13 12-19 22-18 10 1 16 9 17 18 7 2 11 9 11 16 0 11-12 16-35 16-23 0-36-3-36-10Z" fill={c.accent} />
          {/* neck + head */}
          <path d="M74 66c3-14 5-26 9-34 4-7 12-10 19-7 6 3 9 8 8 13-1 4-5 6-9 5l-6-1c-3 6-5 15-6 24Z" fill={c.accent} />
          <path d="M96 22c-1-5 2-9 5-9 1 3 0 7-2 10Z" fill={c.deep} opacity="0.6" />
          <circle cx="102" cy="31" r="2.3" fill="#294e59" />
          <circle cx="108" cy="37" r="2.6" fill="#f2bfd5" opacity="0.9" />
          {/* tail */}
          <path d="M21 68c-6 3-8 9-5 15" stroke={c.deep} strokeOpacity="0.6" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          {/* pearl necklace on the hump — the kindergarten's pearl */}
          <path d="M44 56c6 8 20 9 28 2" stroke="#ffffff" strokeWidth="1.4" fill="none" opacity="0.9" />
          {pearl(48, 61, 3.6, "#ffffff")}
          {pearl(57, 64, 4.2, "#ffffff")}
          {pearl(66, 62, 3.6, "#ffffff")}
          <path d="M16 24c.5 3.4 2.2 5.4 6 6-3.8.6-5.5 2.6-6 6-.5-3.4-2.2-5.4-6-6 3.8-.6 5.5-2.6 6-6Z" fill="#e3c48d" />
        </g>
      )}
    </svg>
  );
}
