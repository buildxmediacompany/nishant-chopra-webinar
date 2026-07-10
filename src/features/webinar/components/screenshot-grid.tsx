import Image from "next/image";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function ScreenshotGrid({
  screenshots,
}: {
  screenshots: { id: string; imageUrl: string; altText: string }[];
}) {
  if (screenshots.length === 0) return null;

  return (
    <Section tone="raised" pad="md">
      <SectionHeading
        eyebrow="Straight from the DMs"
        title="What Students Are {gold}Saying{/gold}"
      />
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {screenshots.map((s, i) => (
          <Reveal
            key={s.id}
            delay={(i % 3) * 90}
            // Nudge the middle column down for a gentle masonry rhythm.
            className={i % 3 === 1 ? "lg:mt-8" : undefined}
          >
            {/* The screenshot is the object — no frame, no surface behind it. */}
            <div className="group relative aspect-[5/4] w-full overflow-hidden rounded-xl">
              <Image
                src={s.imageUrl}
                alt={s.altText}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                sizes="(min-width: 1024px) 380px, 90vw"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
