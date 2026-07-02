import Image from "next/image";
import { SectionHeading } from "./section-heading";

export function ScreenshotGrid({
  screenshots,
}: {
  screenshots: { id: string; imageUrl: string; altText: string }[];
}) {
  if (screenshots.length === 0) return null;

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Some More Feedback" />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((s) => (
            <div
              key={s.id}
              className="overflow-hidden rounded-xl border border-stage-line bg-stage-raised"
            >
              <div className="relative aspect-[5/4] w-full">
                <Image
                  src={s.imageUrl}
                  alt={s.altText}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 380px, 90vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
