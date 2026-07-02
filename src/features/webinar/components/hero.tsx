import Image from "next/image";
import { CalendarDays, Clock, Globe, Video, Play, Star, Users } from "lucide-react";
import { Highlight } from "./highlight";
import { CtaBanner } from "./cta-banner";

function Chip({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-stage-line bg-stage-raised px-4 py-2 text-sm text-cream">
      <Icon className="size-4 text-marigold" />
      {children}
    </div>
  );
}

export function Hero({
  heroHeadline,
  heroSubheadline,
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
    <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:pt-16">
      {/* ambient stage-light glow, subtle — not a spotlight cliché, just warmth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-marigold/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl text-center">
        {seatsRegisteredLabel && (
          <p className="font-utility text-sm font-medium uppercase tracking-wide text-cream-faint">
            {seatsRegisteredLabel}
          </p>
        )}
        <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
          <Highlight text={heroHeadline} />
        </h1>
        {heroSubheadline && (
          <p className="mx-auto mt-5 max-w-2xl font-body text-lg text-cream-dim">
            {heroSubheadline}
          </p>
        )}
      </div>

      <div className="relative mx-auto mt-12 grid max-w-5xl items-center gap-10 lg:grid-cols-[minmax(0,380px)_1fr]">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-stage-line bg-stage-raised shadow-2xl">
          {heroVideoThumbnailUrl ? (
            <Image
              src={heroVideoThumbnailUrl}
              alt="Masterclass preview"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 380px, 90vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-cream-faint">
              Video preview
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-ink/20">
            <div className="flex size-16 items-center justify-center rounded-full bg-cream/90">
              <Play className="size-6 fill-ink text-ink" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 lg:items-start">
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <Chip icon={CalendarDays}>{formattedDate}</Chip>
            <Chip icon={Clock}>{eventTime}</Chip>
            <Chip icon={Globe}>{language}</Chip>
            <Chip icon={Video}>{mode}</Chip>
          </div>

          <div className="w-full max-w-md">
            <CtaBanner
              registrationUrl={registrationUrl}
              offerPricePaise={offerPricePaise}
              seatsLeftText={seatsLeftText}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-cream-dim lg:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-4 fill-marigold text-marigold" />
              {ratingValue}/5 Rating
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-4 text-marigold" />
              {studentsTrainedLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
