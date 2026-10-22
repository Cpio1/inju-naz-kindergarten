"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import type { Media } from "@/shared/lib/media";
import { Pearl, PearlThread, PetalFlower, Sparkle } from "./Decor";

const noop = () => () => {};
/** false during SSR and hydration, true afterwards. */
export const useMounted = () => useSyncExternalStore(noop, () => true, () => false);

type Props = {
  media: Media | null;
  alt: string;
  /** `sizes` for next/image — keep it identical in both layouts for the same photo, so the browser fetches one file */
  sizes: string;
  priority?: boolean;
  /** shown when there is no file yet */
  placeholder?: string;
  className?: string;
  objectPosition?: string;
};

/**
 * Fills its (relatively positioned) parent with a photo, a muted looping video, or a pearl
 * placeholder until the real file is added to /public.
 */
export function MediaView({ media, alt, sizes, priority = false, placeholder, className = "", objectPosition = "center" }: Props) {
  if (!media) return <MediaPlaceholder label={placeholder} className={className} />;
  if (media.kind === "image") {
    return (
      <Image
        src={media.src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
        style={{ objectPosition }}
      />
    );
  }
  return <AutoVideo media={media} label={alt} sizes={sizes} className={className} />;
}

/**
 * Muted, inline, looping video. The <video> element exists only after hydration — so the
 * server HTML of the hidden layout never downloads or plays a second copy — and it plays
 * only while on screen.
 */
function AutoVideo({ media, label, sizes, className }: { media: Extract<Media, { kind: "video" }>; label: string; sizes: string; className: string }) {
  const mounted = useMounted();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduce) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [mounted]);

  return (
    <>
      {media.poster && <Image src={media.poster.src} alt="" fill sizes={sizes} className={`object-cover ${className}`} />}
      {mounted && (
        <video
          ref={ref}
          className={`absolute inset-0 h-full w-full object-cover ${className}`}
          poster={media.poster?.src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
        >
          <source src={media.src} type={media.type} />
        </video>
      )}
    </>
  );
}

/** Neutral, on-brand stand-in for a photo that hasn't been uploaded yet. */
export function MediaPlaceholder({ label, className = "", compact = false }: { label?: string; className?: string; compact?: boolean }) {
  return (
    <div className={`absolute inset-0 overflow-hidden bg-gradient-to-br from-turquoise-soft via-lavender-soft to-powder-soft ${className}`}>
      <PetalFlower className={`absolute ${compact ? "-right-6 -bottom-6 w-28" : "-right-10 -bottom-10 w-56"} opacity-80`} />
      <PearlThread className={`absolute ${compact ? "top-3 left-3 w-28" : "top-8 left-8 w-48"} opacity-80`} count={compact ? 6 : 8} />
      <Pearl tint="lavender" className={`absolute ${compact ? "top-1/2 left-5 w-6" : "top-[46%] left-[14%] w-12"}`} />
      <Sparkle className={`absolute ${compact ? "top-4 right-6 w-3" : "top-10 right-14 w-5"}`} />
      {label && (
        <span className="absolute inset-x-0 top-[30%] flex items-center justify-center gap-2 p-4 text-[0.8rem] font-medium text-ink-soft">
          <ImageIcon className="h-4 w-4" aria-hidden="true" />
          {label}
        </span>
      )}
    </div>
  );
}
