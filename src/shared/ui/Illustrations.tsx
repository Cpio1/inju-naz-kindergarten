import { useId } from "react";

/**
 * Clock whose pearl-rimmed dial highlights 08:00 → 18:00 (8 → 6 on the face):
 * the working day drawn, not just written.
 */
export function ClockArt({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const R = 46;
  const point = (hour: number, r: number) => {
    const a = ((hour % 12) / 12) * Math.PI * 2 - Math.PI / 2;
    return { x: 60 + r * Math.cos(a), y: 60 + r * Math.sin(a) };
  };
  const start = point(8, R);
  const end = point(6, R);
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-face`} cx="0.38" cy="0.32" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#f7f4ee" />
          <stop offset="1" stopColor="#e7e1d4" />
        </radialGradient>
        <linearGradient id={`${id}-arc`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a7dcd7" />
          <stop offset="1" stopColor="#b9a9e6" />
        </linearGradient>
      </defs>
      <ellipse cx="62" cy="114" rx="34" ry="4" fill="#294e59" opacity="0.08" />
      <circle cx="60" cy="60" r="54" fill={`url(#${id}-face)`} />
      {/* working-hours arc: 8 → 6, clockwise, 300° */}
      <path d={`M${start.x} ${start.y} A${R} ${R} 0 1 1 ${end.x} ${end.y}`} fill="none" stroke={`url(#${id}-arc)`} strokeWidth="7" strokeLinecap="round" />
      {Array.from({ length: 12 }, (_, i) => {
        const p = point(i, R);
        const major = i % 3 === 0;
        return <circle key={i} cx={p.x} cy={p.y} r={major ? 3.2 : 2} fill="#ffffff" stroke="#d9d3c7" strokeWidth="0.8" />;
      })}
      {/* hands at 08:00 */}
      <line x1="60" y1="60" x2={point(8, 24).x} y2={point(8, 24).y} stroke="#294e59" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="60" y1="60" x2="60" y2="27" stroke="#294e59" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="60" r="5" fill="#294e59" />
      <circle cx="59" cy="59" r="2" fill="#ffffff" />
    </svg>
  );
}

/** Bowl with steam and a spoon — meals, without inventing a menu. */
export function MealArt({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-bowl`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f2d7e6" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="108" rx="40" ry="5" fill="#294e59" opacity="0.08" />
      <path d="M40 34c-4-6 4-10 0-16M60 30c-4-6 4-10 0-16M80 34c-4-6 4-10 0-16" stroke="#a7dcd7" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="56" rx="46" ry="10" fill="#f8e1d0" />
      <circle cx="44" cy="54" r="5" fill="#ffffff" />
      <circle cx="58" cy="52" r="4" fill="#dcd1f4" />
      <circle cx="72" cy="55" r="5" fill="#a7dcd7" />
      <circle cx="84" cy="52" r="3.4" fill="#ffffff" />
      <path d="M14 56h92c0 26-20 44-46 44S14 82 14 56Z" fill={`url(#${id}-bowl)`} stroke="#e3afcb" strokeWidth="1.4" />
      <path d="M28 70c6 10 16 16 28 18" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.9" />
      <rect x="92" y="18" width="7" height="44" rx="3.5" fill="#e3c48d" transform="rotate(24 95 40)" />
    </svg>
  );
}
