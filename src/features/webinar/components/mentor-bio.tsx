import Image from "next/image";
import { SectionHeading } from "./section-heading";

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
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Meet Your {gold}Mentor{/gold}" />
        <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
          <div className="relative aspect-[5/6] w-full max-w-[220px] shrink-0 overflow-hidden rounded-2xl border border-stage-line">
            {mentorPhotoUrl && (
              <Image
                src={mentorPhotoUrl}
                alt={mentorName}
                fill
                className="object-cover"
                sizes="220px"
              />
            )}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-display text-2xl font-semibold text-cream">
              {mentorName}
            </h3>
            <p className="mt-1 font-utility text-sm uppercase tracking-wide text-marigold">
              {mentorTagline}
            </p>
            {mentorBio && (
              <p className="mt-4 font-body text-cream-dim leading-relaxed">{mentorBio}</p>
            )}
            {badges.length > 0 && (
              <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="rounded-full bg-marigold-dim px-3 py-1 font-utility text-xs font-semibold uppercase tracking-wide text-marigold"
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
