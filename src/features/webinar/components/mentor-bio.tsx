import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function MentorBio({
  mentorName,
  mentorTagline,
  mentorBio,
  mentorPhotoUrl,
  mentorBadges,
}: {
  mentorName: string;
  mentorTagline: string;
  mentorBio: string | null;
  mentorPhotoUrl: string | null;
  mentorBadges: string | null;
}) {
  const badges = mentorBadges
    ? mentorBadges.split(",").map((b) => b.trim()).filter(Boolean)
    : [];

  return (
    <Section tone="base" width="medium" pad="lg">
      <SectionHeading title="Meet Your {gold}Mentor{/gold}" />

      <Reveal className="mt-12">
        <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-[240px_1fr] sm:gap-12">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-2xl bg-stage-raised shadow-featured ring-1 ring-marigold/15">
            {mentorPhotoUrl && (
              <Image
                src={mentorPhotoUrl}
                alt={mentorName}
                fill
                loading="lazy"
                // Admin-typed URL: an unlisted host must degrade, not 500 the page.
                unoptimized
                className="object-cover"
                sizes="240px"
              />
            )}
          </div>

          <div className="text-center sm:text-left">
            <h3 className="font-display text-2xl font-semibold text-cream sm:text-3xl">
              {mentorName}
            </h3>
            <p className="mt-1.5 font-utility text-sm uppercase tracking-[0.14em] text-marigold">
              {mentorTagline}
            </p>
            {mentorBio && (
              <p className="mt-5 font-body leading-relaxed text-cream-dim">
                {mentorBio}
              </p>
            )}
            {badges.length > 0 && (
              <ul className="mt-6 flex flex-wrap justify-center gap-2.5 sm:justify-start">
                {badges.map((b) => (
                  <li
                    key={b}
                    className="inline-flex items-center gap-1.5 rounded-full bg-marigold-dim px-3.5 py-1.5 font-utility text-xs font-semibold uppercase tracking-wide text-marigold"
                  >
                    <BadgeCheck className="size-3.5" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
