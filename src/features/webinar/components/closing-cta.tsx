import { Section } from "./section";
import { Reveal } from "./reveal";
import { CtaBanner } from "./cta-banner";
import { GlowCard } from "@/components/ui/spotlight-card";

export function ClosingCta({
  registrationUrl,
  offerPricePaise,
  seatsLeftText,
}: {
  registrationUrl: string;
  offerPricePaise: number;
  seatsLeftText: string | null;
}) {
  return (
    <Section tone="base" width="narrow" pad="lg">
      {/* The only card on the page. It's the conversion moment — it earns the
          surface, the glow, and the spotlight the rest of the sections gave up. */}
      <Reveal>
        <GlowCard
          customSize
          glowColor="red"
          className="relative px-6 py-14 text-center shadow-featured sm:px-10"
        >
          {/* Clipped here, not on the card — the card's glow ring sits outside
              its bounds and must not be cropped. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
          >
            <div className="absolute -top-24 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-sindoor/15 blur-[100px]" />
          </div>
          <div className="relative">
            <h2 className="font-display text-3xl font-semibold text-cream sm:text-[2.5rem]">
              Ready to Transform Your Voice?
            </h2>
            <p className="mx-auto mt-4 max-w-md font-body leading-relaxed text-cream-dim">
              Every day you wait is another day of straining, going off-pitch, or
              holding back. Your seat is reserved — for now.
            </p>
            <CtaBanner
              registrationUrl={registrationUrl}
              offerPricePaise={offerPricePaise}
              seatsLeftText={seatsLeftText}
              className="mt-8"
            />
          </div>
        </GlowCard>
      </Reveal>
    </Section>
  );
}
