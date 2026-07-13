import Image from "next/image";
import { CalendarDays, Clock, Globe, Video, Play } from "lucide-react";
import { CtaBanner } from "./cta-banner";
import { Chip } from "./chip";
import { StarRating } from "./star-rating";
import { Reveal } from "./reveal";
import { Waveform, SurLadder, DriftingNotes } from "./vocal-motifs";
import { PointerSpotlight } from "./pointer-spotlight";
import { VideoEmbed } from "./video-embed";
import { AvatarStack } from "./avatar-stack";
import { Tilt } from "@/components/ui/tilt";

function LiveBadge() {
  return (
    <span className="absolute left-4 top-4 z-10 inline-flex animate-pulse items-center gap-1.5 rounded-full bg-sindoor px-3 py-1 font-utility text-xs font-bold uppercase tracking-widest text-cream shadow-[0_0_14px_4px_rgba(194,59,51,0.55)]">
      <span className="size-1.5 rounded-full bg-cream" />
      Live Masterclass
    </span>
  );
}

export function Hero({
  heroVideoUrl,
  heroVideoThumbnailUrl,
  eventDate,
  eventTime,
  language,
  mode,
  ratingValue,
  studentsTrainedLabel,
  registrationUrl,
  offerPricePaise,
  seatsLeftText,
}: {
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
  const formattedDate = new Date(eventDate + "T00:00:00").toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  const seatsRegisteredLabel = "Live MAsterclass";

  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-14 sm:pt-16">
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
      {/* Notes hidden on mobile — saves GPU on low-end phones */}
      <div className="hidden sm:block">
        <DriftingNotes direction="scatter" />
      </div>
      <PointerSpotlight size={420} />

      <div className="relative mx-auto max-w-3xl text-center">
        {seatsRegisteredLabel && (
          <Reveal>
            <p className="inline-flex items-center gap-2 font-utility text-sm font-bold uppercase tracking-[0.22em] text-sindoor drop-shadow-[0_0_8px_rgba(194,59,51,0.6)]">
              <span className="animate-[blink_1s_step-start_infinite] size-2 rounded-full bg-sindoor shadow-[0_0_8px_2px_rgba(194,59,51,0.7)]" />
              {seatsRegisteredLabel}
            </p>
          </Reveal>
        )}
        <Reveal delay={80}>
          <h1 className="mt-5 font-display text-[2.1rem] font-bold leading-[1.12] tracking-tight text-cream sm:text-5xl lg:text-6xl">
            In{" "}
            <span className="text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]">
              3 Simple Steps
            </span>{" "}
            Master{" "}
            <span className="text-marigold-soft">High Notes, Harkats</span>{" "}
            &amp; Sing{" "}
            <span className="text-marigold-soft">Bollywood Songs</span> Like a
            Pro
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-cream-dim sm:text-xl">
            From Basic to Advanced —{" "}
            <span className="font-semibold text-cream">
              No Classical Background Required
            </span>
          </p>
        </Reveal>
      </div>

      {/* Sur ladder — rising Sa-Re-Ga-Ma-Pa. Subject-grounded ambient graphic,
          desktop only, sits behind content so it never competes for attention. */}
      <SurLadder className="pointer-events-none absolute right-[6%] top-24 hidden h-40 w-32 opacity-40 [animation:float-y_7s_ease-in-out_infinite] lg:block" />

      <div className="relative mx-auto mt-12 grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
        <Reveal
          delay={220}
          className="mx-auto flex w-full max-w-xl flex-col gap-4"
        >
          <Tilt rotationFactor={6} className="w-full">
            {heroVideoUrl ? (
              <VideoEmbed
                url={heroVideoUrl}
                title="Masterclass preview"
                thumbnailUrl={heroVideoThumbnailUrl}
                aspect="video"
                autoPlay
                className="shadow-featured ring-1 ring-marigold/20"
                overlayChildren={
                  <>
                    {/* <LiveBadge /> */}
                    <Waveform
                      bars={28}
                      className="absolute inset-x-4 bottom-4 h-8"
                    />
                  </>
                }
              />
            ) : (
              /* No video configured yet — keep the poster + motif treatment. */
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-stage-raised shadow-featured ring-1 ring-marigold/20">
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
                <Waveform
                  bars={28}
                  className="absolute inset-x-4 bottom-4 h-8"
                />
              </div>
            )}
          </Tilt>

          {/* Chips below video */}
          <div className="grid w-full grid-cols-2 gap-2.5">
            <Chip icon={CalendarDays}>{formattedDate}</Chip>
            <Chip icon={Clock}>{eventTime}</Chip>
            <Chip icon={Globe}>{language}</Chip>
            <Chip icon={Video}>{mode}</Chip>
          </div>
        </Reveal>

        <Reveal
          delay={300}
          className="flex flex-col items-center gap-8 lg:w-full lg:items-start lg:gap-7"
        >
          <CtaBanner
            registrationUrl={registrationUrl}
            offerPricePaise={offerPricePaise}
            seatsLeftText={seatsLeftText}
            className="mx-0 max-w-none"
          />

          {/* Social proof — pill card on desktop, stacked on mobile */}
          <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:items-stretch sm:gap-0 sm:overflow-hidden sm:rounded-2xl sm:border sm:border-stage-line sm:bg-stage-raised/60">
            {/* Left — avatar stack + student count */}
            <div className="flex flex-1 items-center sm:px-5 sm:py-4">
              <AvatarStack label={studentsTrainedLabel} />
            </div>

            {/* Desktop divider */}
            <span
              aria-hidden="true"
              className="hidden w-px shrink-0 self-stretch bg-stage-line sm:block"
            />

            {/* Right — stars + rating value */}
            <div className="flex items-center justify-center gap-3 sm:px-5 sm:py-4">
              <StarRating rating={Math.round(Number(ratingValue))} />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-base font-bold text-cream">
                  {ratingValue}
                  <span className="text-xs text-cream-dim">/5</span>
                </span>
                <span className="font-utility text-[10px] uppercase tracking-wide text-cream-dim">
                  Rating
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
