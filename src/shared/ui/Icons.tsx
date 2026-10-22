import { Baby, Clock3, Languages, Users, UtensilsCrossed, type LucideIcon } from "lucide-react";

/** Lucide no longer ships brand marks. */
export function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Icons for the four «Біздің балабақша» stats, in dictionary order. */
export const statIcons: LucideIcon[] = [Users, Baby, UtensilsCrossed, Languages];

/** Icons for the four features, in dictionary order. */
export const featureIcons: LucideIcon[] = [Languages, Users, UtensilsCrossed, Clock3];

/** Pearl tints that accompany the stats / features, in order. */
export const accentTints = ["turquoise", "lavender", "powder", "gold"] as const;

export const tintSurface: Record<(typeof accentTints)[number], string> = {
  turquoise: "bg-turquoise-soft text-turquoise-deep",
  lavender: "bg-lavender-soft text-lavender-deep",
  powder: "bg-powder-soft text-powder-deep",
  gold: "bg-[#f6ecd6] text-[#a7843f]",
};
