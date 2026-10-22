import { useId } from "react";

/**
 * Pearl Garden graphic system: iridescent pearls, pearl threads, sparkles, soft petals and
 * drops. All decorative (aria-hidden), all plain SVG — no images, no runtime cost.
 */

export type PearlTint = "turquoise" | "lavender" | "powder" | "gold" | "white";

const tints: Record<PearlTint, [string, string, string]> = {
  // highlight → body → rim
  white: ["#ffffff", "#f6f3ee", "#d9d3c7"],
  turquoise: ["#ffffff", "#bfe6e2", "#7fbcb6"],
  lavender: ["#ffffff", "#e3daf7", "#a99bd6"],
  powder: ["#ffffff", "#f6dfeb", "#d39fbc"],
  gold: ["#fffdf6", "#f1dfb9", "#c9a66a"],
};

/** Gradient defs for one pearl; ids are unique per render. */
function PearlDefs({ id, tint }: { id: string; tint: PearlTint }) {
  const [hi, body, rim] = tints[tint];
  return (
    <defs>
      <radialGradient id={`${id}-b`} cx="0.36" cy="0.32" r="0.78">
        <stop offset="0" stopColor={hi} />
        <stop offset="0.45" stopColor={body} />
        <stop offset="1" stopColor={rim} />
      </radialGradient>
      <radialGradient id={`${id}-g`} cx="0.7" cy="0.8" r="0.5">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function PearlBody({ id, cx, cy, r }: { id: string; cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-b)`} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-g)`} />
      <ellipse cx={cx - r * 0.34} cy={cy - r * 0.38} rx={r * 0.26} ry={r * 0.16} fill="#fff" opacity="0.9" transform={`rotate(-30 ${cx - r * 0.34} ${cy - r * 0.38})`} />
    </g>
  );
}

/** A single 3D-looking pearl. */
export function Pearl({ tint = "white", className = "", style }: { tint?: PearlTint; className?: string; style?: React.CSSProperties }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true" focusable="false">
      <PearlDefs id={id} tint={tint} />
      <ellipse cx="21" cy="37" rx="11" ry="2" fill="#294e59" opacity="0.08" />
      <PearlBody id={id} cx={20} cy={19} r={16} />
    </svg>
  );
}

/** Four-point sparkle. */
export function Sparkle({ className = "", color = "#e3c48d", style }: { className?: string; color?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M12 0c.9 6.4 4.3 10.4 12 12-7.7 1.6-11.1 5.6-12 12-.9-6.4-4.3-10.4-12-12C7.7 10.4 11.1 6.4 12 0Z" fill={color} />
    </svg>
  );
}

/**
 * A thread of pearls along a gentle curve — the brand's signature line.
 * Pearl sizes breathe along the thread so it never looks mechanical.
 */
export function PearlThread({
  className = "",
  count = 9,
  bend = 0.35,
  tints: palette = ["white", "turquoise", "white", "lavender", "white", "powder"],
}: {
  className?: string;
  count?: number;
  /** 0 = straight, 1 = deep sag */
  bend?: number;
  tints?: PearlTint[];
}) {
  const uid = useId().replace(/:/g, "");
  const W = 300;
  const H = 80;
  const p0 = { x: 8, y: 14 };
  const p2 = { x: W - 8, y: 14 };
  const p1 = { x: W / 2, y: 14 + bend * 120 };
  const at = (t: number) => ({
    x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x,
    y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y,
  });
  const used = [...new Set(palette)];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">
      {used.map((tint) => (
        <PearlDefs key={tint} id={`${uid}-${tint}`} tint={tint} />
      ))}
      <path d={`M${p0.x} ${p0.y} Q${p1.x} ${p1.y} ${p2.x} ${p2.y}`} fill="none" stroke="#294e59" strokeOpacity="0.22" strokeWidth="1.2" />
      {Array.from({ length: count }, (_, i) => {
        const t = count === 1 ? 0.5 : i / (count - 1);
        const { x, y } = at(t);
        const r = 5.5 + Math.sin(t * Math.PI) * 4.5;
        const tint = palette[i % palette.length];
        return <PearlBody key={i} id={`${uid}-${tint}`} cx={x} cy={y} r={r} />;
      })}
    </svg>
  );
}

/** Soft asymmetric flower — translucent petals around a pearl. */
export function PetalFlower({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const id = useId().replace(/:/g, "");
  const petals = [
    { rot: 0, s: 1, c: "#a7dcd7" },
    { rot: 68, s: 0.86, c: "#dcd1f4" },
    { rot: 140, s: 1.04, c: "#f2d7e6" },
    { rot: 212, s: 0.9, c: "#a7dcd7" },
    { rot: 286, s: 0.95, c: "#dcd1f4" },
  ];
  return (
    <svg viewBox="-50 -50 100 100" className={className} style={style} aria-hidden="true" focusable="false">
      <PearlDefs id={id} tint="white" />
      {petals.map((p) => (
        <path
          key={p.rot}
          d="M0 -6C10 -12 14 -32 0 -44C-14 -32 -10 -12 0 -6Z"
          fill={p.c}
          fillOpacity="0.7"
          stroke="#ffffff"
          strokeWidth="1.2"
          transform={`rotate(${p.rot}) scale(${p.s})`}
        />
      ))}
      <PearlBody id={id} cx={0} cy={0} r={11} />
    </svg>
  );
}

/** Water-drop / dew shape with a little depth. */
export function Drop({ className = "", tint = "lavender", style }: { className?: string; tint?: PearlTint; style?: React.CSSProperties }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 40 52" className={className} style={style} aria-hidden="true" focusable="false">
      <PearlDefs id={id} tint={tint} />
      <path d="M20 2C26 14 36 24 36 34a16 16 0 0 1-32 0C4 24 14 14 20 2Z" fill={`url(#${id}-b)`} />
      <ellipse cx="13.5" cy="31" rx="3.4" ry="5.6" fill="#fff" opacity="0.75" transform="rotate(18 13.5 31)" />
    </svg>
  );
}

/** Loose hand-drawn swirl line. */
export function Swirl({ className = "", color = "#a7dcd7" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true" focusable="false" fill="none">
      <path d="M4 44C22 10 46 8 54 26s-6 30-16 22 4-34 30-36 38 18 48 30" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/** Wavy divider at the top/bottom edge of a coloured band. */
export function Wave({ className = "", fill = "#f8f7f2", flip = false }: { className?: string; fill?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className={className} aria-hidden="true" focusable="false" style={flip ? { transform: "scaleY(-1)" } : undefined}>
      <path d="M0 48V22c120-14 240-20 360-12s240 26 360 26 240-24 360-28 240 8 360 14v26H0Z" fill={fill} />
    </svg>
  );
}

/** Subtle dotted-pearl texture for coloured bands. */
export function PearlDots({ className = "", color = "#ffffff", opacity = 0.5 }: { className?: string; color?: string; opacity?: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className={className} aria-hidden="true" focusable="false" width="100%" height="100%">
      <defs>
        <pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.6" fill={color} fillOpacity={opacity} />
          <circle cx="18" cy="18" r="1" fill={color} fillOpacity={opacity * 0.7} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
