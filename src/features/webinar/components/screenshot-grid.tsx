import Image from "next/image";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { StarRating } from "./star-rating";
import { TESTIMONIALS } from "./testimonials-data";

/**
 * "What Students Are Saying — Straight from the DMs"
 *
 * Renders the 6 hardcoded testimonials as WhatsApp-style DM cards
 * in a masonry-rhythm 3-column grid. No longer depends on DB screenshots.
 */
function DmCard({ t, delay }: { t: (typeof TESTIMONIALS)[number]; delay: number }) {
  return (
    <Reveal delay={delay}>
      <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-stage-line bg-[#0e1420] shadow-soft transition-transform duration-300 hover:-translate-y-1">
        {/* WhatsApp-style header bar */}
        <div className="flex items-center gap-3 border-b border-white/5 bg-[#0e1420] px-4 py-3">
          <div className="relative size-9 shrink-0 overflow-hidden rounded-full ring-2 ring-marigold/30">
            <Image src={t.avatar} alt={t.name} fill sizes="36px" className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate font-body text-sm font-semibold text-cream">{t.name}</p>
            {t.location && (
              <p className="font-body text-[11px] text-cream-dim">{t.location}</p>
            )}
          </div>
        </div>

        {/* Message bubble */}
        <div className="flex flex-1 flex-col justify-end bg-[#0e1420] px-4 py-5">
          <div className="ml-auto max-w-[85%]">
            <div className="rounded-xl rounded-tr-sm bg-[#005c4b] px-3.5 py-2.5 shadow-sm">
              <p className="font-body text-sm leading-relaxed text-white">
                {t.quote}
              </p>
            </div>
          </div>
        </div>

        {/* Footer: stars */}
        <div className="flex items-center justify-between border-t border-white/5 bg-[#0e1420] px-4 py-3">
          <StarRating rating={t.rating} />
          <span className="font-utility text-xs text-cream-dim">Verified Student</span>
        </div>
      </figure>
    </Reveal>
  );
}

export function ScreenshotGrid({
  screenshots: _screenshots,
}: {
  screenshots?: { id: string; imageUrl: string; altText: string }[];
}) {
  return (
    <Section tone="raised" pad="md">
      <SectionHeading
        eyebrow="Straight from the DMs"
        title="What Students Are {gold}Saying{/gold}"
      />
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.slice(0, 6).map((t, i) => (
          <DmCard
            key={t.id}
            t={t}
            delay={(i % 3) * 90}
          />
        ))}
      </div>
    </Section>
  );
}
