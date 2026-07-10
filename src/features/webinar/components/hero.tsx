import Image from "next/image";
import { CalendarDays, Clock, Globe, Video, Play, Users } from "lucide-react";
import { Highlight } from "./highlight";
import { CtaBanner } from "./cta-banner";
import { Chip } from "./chip";
import { StarRating } from "./star-rating";
import { Reveal } from "./reveal";
import { Waveform, SurLadder, DriftingNotes } from "./vocal-motifs";
import { PointerSpotlight } from "./pointer-spotlight";
import { VideoEmbed } from "./video-embed";
import { TrustBadges } from "./trust-badges";
import { Tilt } from "@/components/ui/tilt";

function LiveBadge() {
  return (
    <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-sindoor px-3 py-1 font-utility text-xs font-semibold uppercase tracking-wide text-cream shadow-soft">
      <span className="size-1.5 rounded-full bg-cream" />
      Live Masterclass
    </span>
  );
}

export function Hero({
  heroHeadline,
  heroSubheadline,
  heroVideoUrl,
  heroVideoThumbnailUrl,
  eventDate,
  eventTime,
  language,
  mode,
  ratingValue,
  studentsTrainedLabel,
  seatsRegisteredLabel,
  registrationUrl,
  offerPricePaise,
  seatsLeftText,
}: {
  heroHeadline: string;
  heroSubheadline: string | null;
  heroVideoUrl: string | null;
  heroVideoThumbnailUrl: string | null;
  eventDate: string;
  eventTime: string;
  language: string;
  mode: string;
  ratingValue: string;
  studentsTrainedLabel: string;
  seatsRegisteredLabel: string | null;
  registrationUrl: string;
  offerPricePaise: number;
  seatsLeftText: string | null;
}) {
  const formattedDate = new Date(eventDate + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:pt-20">
      {/* Faint marigold grid, fading out from the top — quiet architectural
          texture behind the hero (adapted from a 21st.dev grid background).
          Drifts one cell per cycle, so the stage never sits perfectly still. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(232,169,59,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(232,169,59,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          animation: "grid-pan 24s linear infinite",
          maskImage:
            "radial-gradient(ellipse 72% 55% at 50% 0%, #000 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 72% 55% at 50% 0%, #000 55%, transparent 100%)",
        }}
      />
      {/* Ambient stage warmth — a soft glow that breathes, not a spotlight
          cliché, plus a slow vermilion counter-glow drifting against it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-marigold/[0.08] blur-[130px]"
        style={{ animation: "glow-drift 13s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[8%] h-[320px] w-[420px] rounded-full bg-sindoor/[0.07] blur-[120px]"
        style={{ animation: "glow-drift-alt 17s ease-in-out infinite" }}
      />
      {/* Notes rising through the backdrop + a glow tracking the cursor —
          the same ambient pairing as the "Why this workshop" section. */}
      <DriftingNotes direction="scatter" />
      <PointerSpotlight size={420} />

      <div className="relative mx-auto max-w-3xl text-center">
        {seatsRegisteredLabel && (
          <Reveal>
            <p className="font-utility text-sm font-semibold uppercase tracking-[0.22em] text-marigold">
              {seatsRegisteredLabel}
            </p>
          </Reveal>
        )}
        <Reveal delay={80}>
          <h1 className="mt-4 font-display text-[2.5rem] font-semibold leading-[1.08] text-cream sm:text-6xl">
            <Highlight text={heroHeadline} />
          </h1>
        </Reveal>
        {heroSubheadline && (
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-cream-dim">
              {heroSubheadline}
            </p>
          </Reveal>
        )}
      </div>

      {/* Sur ladder — rising Sa-Re-Ga-Ma-Pa. Subject-grounded ambient graphic,
          desktop only, sits behind content so it never competes for attention. */}
      <SurLadder className="pointer-events-none absolute right-[6%] top-24 hidden h-40 w-32 opacity-40 [animation:float-y_7s_ease-in-out_infinite] lg:block" />

      <div className="relative mx-auto mt-14 grid max-w-5xl items-center gap-10 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-14">
        <Reveal delay={220} className="mx-auto w-full max-w-sm">
          <Tilt rotationFactor={6} className="w-full">
            {heroVideoUrl ? (
              <VideoEmbed
                url={heroVideoUrl}
                title="Masterclass preview"
                thumbnailUrl={heroVideoThumbnailUrl}
                aspect="portrait"
                className="shadow-featured ring-1 ring-marigold/20"
                overlayChildren={
                  <>
                    <LiveBadge />
                    <Waveform bars={28} className="absolute inset-x-4 bottom-4 h-8" />
                  </>
                }
              />
            ) : (
              /* No video configured yet — keep the poster + motif treatment. */
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-stage-raised shadow-featured ring-1 ring-marigold/20">
                {heroVideoThumbnailUrl ? (
                  <Image
                    src={heroVideoThumbnailUrl}
                    alt="Masterclass preview"
                    fill
                    priority
                    // Admin-typed URL: an unlisted host must degrade, not 500 the page.
                    unoptimized
                    className="object-cover"
                    sizes="(min-width: 1024px) 400px, 90vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-cream-faint">
                    Video preview
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-ink/70 via-transparent to-transparent">
                  <div className="flex size-16 items-center justify-center rounded-full bg-cream/90 shadow-raised">
                    <Play className="size-6 fill-ink text-ink" />
                  </div>
                </div>
                <LiveBadge />
                <Waveform bars={28} className="absolute inset-x-4 bottom-4 h-8" />
              </div>
            )}
          </Tilt>
        </Reveal>

        <Reveal delay={300} className="flex flex-col items-center gap-7 lg:items-start">
          <div className="flex flex-wrap justify-center gap-2.5 lg:justify-start">
            <Chip icon={CalendarDays}>{formattedDate}</Chip>
            <Chip icon={Clock}>{eventTime}</Chip>
            <Chip icon={Globe}>{language}</Chip>
            <Chip icon={Video}>{mode}</Chip>
          </div>

          <CtaBanner
            registrationUrl={registrationUrl}
            offerPricePaise={offerPricePaise}
            seatsLeftText={seatsLeftText}
            className="mx-0"
          />

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
            <span className="inline-flex items-center gap-2 text-sm text-cream-dim">
              <StarRating rating={Math.round(Number(ratingValue))} />
              <span className="font-medium text-cream">{ratingValue}/5</span>
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-cream-dim">
              <Users className="size-4 text-marigold" />
              {studentsTrainedLabel}
            </span>
          </div>

          {/* Credibility as medallions, not plain text — scannable at a glance. */}
          <TrustBadges
            className="justify-center lg:justify-start"
            badges={[
              { icon: "users", label: studentsTrainedLabel },
              { icon: "star", label: `${ratingValue}/5 rating` },
              { icon: "trophy", label: "Award winner" },
            ]}
          />
        </Reveal>
      </div>
    </section>
  );
}
