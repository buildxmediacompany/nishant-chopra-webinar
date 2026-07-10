import Image from "next/image";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";
import { Stat } from "./stat";
import { StarRating } from "./star-rating";
import { Reveal } from "./reveal";
import { Marquee } from "./marquee";
import { VideoEmbed } from "./video-embed";

type Testimonial = {
  id: string;
  name: string;
  location: string | null;
  quote: string;
  rating: number;
  avatarUrl: string | null;
  videoUrl?: string | null;
};

function Attribution({ t }: { t: Testimonial }) {
  return (
    <div className="flex items-center gap-3">
      {t.avatarUrl && (
        <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
          <Image src={t.avatarUrl} alt={t.name} fill className="object-cover" />
        </div>
      )}
      <div>
        <p className="font-body text-sm font-semibold text-cream">{t.name}</p>
        {t.location && (
          <p className="font-body text-xs text-cream-faint">{t.location}</p>
        )}
      </div>
    </div>
  );
}

/** Video review. The only framed element here — a video needs a defined edge. */
function VideoTestimonial({ t }: { t: Testimonial }) {
  return (
    <figure>
      <VideoEmbed
        url={t.videoUrl!}
        title={`Review from ${t.name}`}
        aspect="portrait"
        className="shadow-soft"
      />
      <figcaption className="mt-4 flex items-center justify-between gap-3">
        <Attribution t={t} />
        <StarRating rating={t.rating} />
      </figcaption>
    </figure>
  );
}

/** Text review: a marigold rule instead of a box. */
function QuoteBlock({ t }: { t: Testimonial }) {
  return (
    <figure className="w-[300px] shrink-0 border-l-2 border-marigold/30 pl-5 sm:w-[340px]">
      <StarRating rating={t.rating} />
      <blockquote className="mt-3 line-clamp-4 font-body text-sm leading-relaxed text-cream-dim">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4">
        <Attribution t={t} />
      </figcaption>
    </figure>
  );
}

export function TestimonialGrid({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  const videoReviews = testimonials.filter((t) => t.videoUrl);
  const textReviews = testimonials.filter((t) => !t.videoUrl);

  const avg = testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length;
  const fiveStar = testimonials.filter((t) => t.rating >= 5).length;

  const [featured, ...restText] = textReviews;
  const marqueeSource = featured ? restText : [];
  const mid = Math.ceil(marqueeSource.length / 2);
  const rowOne = marqueeSource.slice(0, mid);
  const rowTwo = marqueeSource.slice(mid);

  return (
    <Section tone="base" pad="lg">
      <SectionHeading
        eyebrow="Real results from real people"
        title="Hear From {gold}Our Students{/gold}"
      />

      <Reveal className="mt-10">
        <div className="mx-auto flex max-w-lg items-center justify-center gap-8 sm:gap-12">
          <Stat value={avg.toFixed(1)} label="Avg rating" />
          <span aria-hidden className="h-10 w-px bg-stage-line" />
          <Stat value={testimonials.length} label="Student reviews" />
          <span aria-hidden className="h-10 w-px bg-stage-line" />
          <Stat value={fiveStar} label="5-star" />
        </div>
      </Reveal>

      {videoReviews.length > 0 && (
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videoReviews.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 80}>
              <VideoTestimonial t={t} />
            </Reveal>
          ))}
        </div>
      )}

      {/* The pull-quote: set in the display face, unboxed. Typography is the
          emphasis — a card here would flatten it back into the grid. */}
      {featured && (
        <Reveal className="mt-16">
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="font-display text-2xl italic leading-relaxed text-cream sm:text-[2rem]">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex flex-col items-center gap-3">
              <StarRating rating={featured.rating} starClassName="size-5" />
              <Attribution t={featured} />
            </figcaption>
          </figure>
        </Reveal>
      )}

      {marqueeSource.length > 0 && (
        <div className="mt-16 space-y-8 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
          <Marquee durationSec={44}>
            {rowOne.map((t) => (
              <QuoteBlock key={t.id} t={t} />
            ))}
          </Marquee>
          {rowTwo.length > 0 && (
            <Marquee durationSec={52} reverse>
              {rowTwo.map((t) => (
                <QuoteBlock key={t.id} t={t} />
              ))}
            </Marquee>
          )}
        </div>
      )}
    </Section>
  );
}
