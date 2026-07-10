"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Extracts a YouTube video id from the URL shapes an admin is likely to paste:
 * watch?v=, youtu.be/, /embed/, /shorts/, /live/. Returns null for anything else.
 */
export function youtubeId(url: string): string | null {
  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return u.pathname.slice(1).split("/")[0] || null;
    if (!host.endsWith("youtube.com") && !host.endsWith("youtube-nocookie.com")) {
      return null;
    }
    const v = u.searchParams.get("v");
    if (v) return v;
    const m = u.pathname.match(/^\/(embed|shorts|live|v)\/([^/?#]+)/);
    return m ? m[2] : null;
  } catch {
    return null;
  }
}

/** youtube-nocookie thumbnail (works for unlisted videos too). */
function thumbFor(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

/**
 * Thumbnail-first YouTube embed. Nothing from YouTube loads until the user
 * clicks play (fast LCP, no third-party cookies on load). Works with Unlisted
 * videos, which is how the client publishes testimonials and showcase clips.
 */
export function VideoEmbed({
  url,
  title,
  thumbnailUrl,
  aspect = "video",
  className,
  overlayChildren,
}: {
  url: string;
  title: string;
  /** Falls back to the YouTube thumbnail when omitted. */
  thumbnailUrl?: string | null;
  aspect?: "video" | "portrait" | "square";
  className?: string;
  /** Rendered above the thumbnail while unplayed (badges, captions). */
  overlayChildren?: React.ReactNode;
}) {
  const [playing, setPlaying] = useState(false);
  const id = youtubeId(url);

  const aspectClass =
    aspect === "portrait"
      ? "aspect-[3/4]"
      : aspect === "square"
        ? "aspect-square"
        : "aspect-video";

  const poster = thumbnailUrl || (id ? thumbFor(id) : null);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-stage-raised",
        aspectClass,
        className
      )}
    >
      {playing && id ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          disabled={!id}
          aria-label={id ? `Play video: ${title}` : title}
          className="group absolute inset-0 size-full cursor-pointer disabled:cursor-default"
        >
          {poster ? (
            <Image
              src={poster}
              alt=""
              fill
              unoptimized
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 400px, 90vw"
            />
          ) : (
            <span className="flex size-full items-center justify-center text-cream-faint">
              Video preview
            </span>
          )}

          <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

          {id && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-cream/90 shadow-raised transition-transform duration-200 group-hover:scale-105">
                <Play className="size-6 fill-ink text-ink" />
              </span>
            </span>
          )}

          {overlayChildren}
        </button>
      )}
    </div>
  );
}
