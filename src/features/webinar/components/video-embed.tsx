"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { parseVideoUrl } from "@/lib/video-url";

/**
 * Thumbnail-first video embed for YouTube and Vimeo. Nothing from the provider
 * loads until the user clicks play (fast LCP, no third-party cookies on load).
 * Works with Unlisted/private-link videos, which is how the client publishes
 * testimonials and showcase clips.
 */
export function VideoEmbed({
  url,
  title,
  thumbnailUrl,
  aspect = "video",
  className,
  overlayChildren,
  autoPlay = false,
}: {
  url: string;
  title: string;
  /** Falls back to the provider's poster frame. Vimeo has none — set this. */
  thumbnailUrl?: string | null;
  aspect?: "video" | "portrait" | "square";
  className?: string;
  /** Rendered above the thumbnail while unplayed (badges, captions). */
  overlayChildren?: React.ReactNode;
  /** Start playing on mount. Forced muted — browsers block audible autoplay. */
  autoPlay?: boolean;
}) {
  const [playing, setPlaying] = useState(autoPlay);
  const [posterFailed, setPosterFailed] = useState(false);
  const video = parseVideoUrl(url);

  // Autoplay only works muted without a user gesture; append the provider's
  // mute flag to the embed src that already carries autoplay=1.
  const embedSrc =
    video && autoPlay
      ? `${video.embedSrc}${video.provider === "youtube" ? "&mute=1" : "&muted=1"}`
      : video?.embedSrc;

  const aspectClass =
    aspect === "portrait"
      ? "aspect-[3/4]"
      : aspect === "square"
        ? "aspect-square"
        : "aspect-video";

  // Vimeo exposes no poster from the id alone, and an admin-typed thumbnail can
  // 404 at any time. Either way the card must still look deliberate.
  const poster = thumbnailUrl || video?.poster || null;
  const showPoster = poster !== null && !posterFailed;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-stage-raised",
        aspectClass,
        className
      )}
    >
      {playing && video ? (
        <iframe
          className="absolute inset-0 size-full"
          src={embedSrc}
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
          disabled={!video}
          aria-label={video ? `Play video: ${title}` : title}
          className="group absolute inset-0 size-full cursor-pointer disabled:cursor-default"
        >
          {showPoster ? (
            <Image
              src={poster}
              alt=""
              fill
              onError={() => setPosterFailed(true)}
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 400px, 90vw"
            />
          ) : (
            <span
              aria-hidden
              className="absolute inset-0 bg-stage-raised-2 bg-[radial-gradient(ellipse_at_50%_35%,rgba(232,169,59,0.18),transparent_65%)]"
            />
          )}

          {!video && (
            <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-cream-faint">
              Video preview
            </span>
          )}

          <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

          {video && (
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
