import { useId } from "react";

/**
 * «ІНЖУ-НАЗ» mark: a pearl held by five soft, slightly uneven petals — a flower that is
 * also an open shell. The same geometry is used for the favicon (app/icon.svg).
 */
export function LogoMark({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const petals = [
    { rot: -4, s: 1, c: `url(#${id}-t)` },
    { rot: 70, s: 0.9, c: `url(#${id}-l)` },
    { rot: 143, s: 0.96, c: `url(#${id}-p)` },
    { rot: 216, s: 0.9, c: `url(#${id}-t)` },
    { rot: 288, s: 0.96, c: `url(#${id}-l)` },
  ];
  return (
    <svg viewBox="-32 -32 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-t`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#7fc4bd" />
          <stop offset="1" stopColor="#c7ebe7" />
        </linearGradient>
        <linearGradient id={`${id}-l`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#a796d8" />
          <stop offset="1" stopColor="#e6defa" />
        </linearGradient>
        <linearGradient id={`${id}-p`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#d79bbb" />
          <stop offset="1" stopColor="#f7e2ee" />
        </linearGradient>
        <radialGradient id={`${id}-pearl`} cx="0.36" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#f5f1ea" />
          <stop offset="1" stopColor="#cfc7b8" />
        </radialGradient>
      </defs>
      {petals.map((p) => (
        <path key={p.rot} d="M0 -7C8 -11 11 -24 0 -30C-11 -24 -8 -11 0 -7Z" fill={p.c} transform={`rotate(${p.rot}) scale(${p.s})`} />
      ))}
      <circle r="9.6" fill="#294e59" />
      <circle r="7.6" cx="-0.4" cy="-0.4" fill={`url(#${id}-pearl)`} />
      <ellipse cx="-3" cy="-3.4" rx="2.4" ry="1.5" fill="#fff" transform="rotate(-32 -3 -3.4)" />
    </svg>
  );
}

/** Mark + wordmark. `caption` is the translated «балабақшасы / детский ясли-сад». */
export function Logo({ caption, size = "md", tone = "ink" }: { caption: string; size?: "sm" | "md"; tone?: "ink" | "light" }) {
  const markSize = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const word = size === "sm" ? "text-[1.15rem]" : "text-[1.3rem]";
  const color = tone === "light" ? "text-white" : "text-ink";
  const sub = tone === "light" ? "text-white/70" : "text-ink-soft";
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className={`${markSize} shrink-0`} />
      <span className="flex flex-col leading-none">
        <span className={`font-display font-semibold tracking-[0.02em] ${word} ${color}`}>ІНЖУ-НАЗ</span>
        <span className={`mt-1 text-[0.7rem] font-medium tracking-[0.04em] ${sub}`}>{caption}</span>
      </span>
    </span>
  );
}
