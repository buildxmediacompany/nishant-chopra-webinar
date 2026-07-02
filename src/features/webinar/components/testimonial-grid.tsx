import Image from "next/image";
import { Star } from "lucide-react";
import { SectionHeading } from "./section-heading";

export function TestimonialGrid({
  testimonials,
}: {
  testimonials: {
    id: string;
    name: string;
    location: string | null;
    quote: string;
    rating: number;
    avatarUrl: string | null;
  }[];
}) {
  if (testimonials.length === 0) return null;

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Real results from real people — just like you"
          title="Hear From {gold}Our Students{/gold}"
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-xl border border-stage-line bg-stage-raised p-6"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < t.rating
                        ? "size-4 fill-marigold text-marigold"
                        : "size-4 text-stage-line"
                    }
                  />
                ))}
              </div>
              <p className="mt-4 font-body text-sm leading-relaxed text-cream-dim">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                {t.avatarUrl && (
                  <div className="relative size-10 overflow-hidden rounded-full">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
