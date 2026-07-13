import Image from "next/image";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";
import { StarRating } from "./star-rating";
import { Reveal } from "./reveal";
import { Marquee } from "./marquee";
import { TESTIMONIALS } from "./testimonials-data";

function Attribution({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-marigold/30">
        <Image
          src={t.avatar}
          alt={t.name}
          fill
          sizes="40px"
          className="object-cover"
        />
      </div>
      <div>
        <p className="font-body text-sm font-semibold text-cream">{t.name}</p>
        {t.location && (
          <p className="font-body text-xs text-cream-faint">{t.location}</p>
        )}
      </div>
    </div>
  );
}

/** Text review card with left marigold rule */
function QuoteBlock({ t }: { t: (typeof TESTIMONIALS)[number] }) {
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

export function TestimonialGrid() {
  const mid = Math.ceil(TESTIMONIALS.length / 2);
  const rowOne = TESTIMONIALS.slice(0, mid);
  const rowTwo = TESTIMONIALS.slice(mid);

  return (
    <Section tone="base" pad="lg">
      <SectionHeading
        eyebrow="Real results from real people"
        title="Hear From {gold}Our Students{/gold}"
      />

      <div className="mt-16 space-y-8 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        <Marquee durationSec={18}>
          {rowOne.map((t) => (
            <QuoteBlock key={t.id} t={t} />
          ))}
        </Marquee>
        <Marquee durationSec={18} reverse>
          {rowTwo.map((t) => (
            <QuoteBlock key={t.id} t={t} />
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
