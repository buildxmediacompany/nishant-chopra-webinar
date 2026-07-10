import { Gift } from "lucide-react";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { DynamicIcon } from "./icon-map";
import { formatPaise } from "@/lib/utils";
import { CtaBanner } from "./cta-banner";
import { GlowCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

/**
 * Depth layer: rises toward the viewer while its parent card is hovered.
 *
 * The perspective lives on the transform itself rather than on the card. The
 * card sets `backdrop-filter`, which forces `transform-style: flat` on it —
 * any translateZ inherited through it would be silently discarded.
 */
const layer = (z: number) =>
  cn(
    "[transform:perspective(700px)_translateZ(0px)] transition-transform duration-300 ease-out",
    "motion-reduce:transition-none motion-reduce:group-hover:[transform:none]",
    z === 24 && "group-hover:[transform:perspective(700px)_translateZ(24px)]",
    z === 40 && "group-hover:[transform:perspective(700px)_translateZ(40px)]"
  );

/**
 * The bonus value. It's the number that sells the offer, so it gets the most
 * depth, a lift, and a warm glow — nothing else on the card competes. The
 * shadow grows with the lift so the tag reads as floating above the surface.
 */
function PriceTag({ paise, large = false }: { paise: number; large?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex origin-left items-center rounded-full border border-marigold/25 bg-marigold-dim/60",
        "font-utility font-semibold uppercase tracking-wide text-marigold-soft",
        "shadow-[0_1px_2px_rgba(0,0,0,0.35)]",
        "[transform:perspective(700px)_translateZ(0px)] transition-[transform,box-shadow,border-color] duration-300 ease-out",
        "group-hover:[transform:perspective(700px)_translateZ(70px)_translateY(-2px)]",
        "group-hover:border-marigold/60",
        "group-hover:shadow-[0_14px_28px_-8px_rgba(0,0,0,0.65),0_0_22px_rgba(244,199,102,0.45)]",
        "motion-reduce:transition-none motion-reduce:group-hover:[transform:none]",
        "motion-reduce:group-hover:shadow-[0_1px_2px_rgba(0,0,0,0.35)]",
        large ? "px-3.5 py-1.5 text-sm sm:text-base" : "px-2.5 py-1 text-[11px]"
      )}
    >
      {formatPaise(paise)} value
    </span>
  );
}

export function BonusStack({
  bonuses,
  offerPricePaise,
  registrationUrl,
}: {
  bonuses: {
    id: string;
    title: string;
    description: string | null;
    valuePaise: number;
    iconName: string;
  }[];
  offerPricePaise: number;
  registrationUrl: string;
}) {
  if (bonuses.length === 0) return null;

  const totalValuePaise = bonuses.reduce((sum, b) => sum + b.valuePaise, 0);
  // Feature the single most valuable bonus; the rest stay in admin order.
  const featured = bonuses.reduce((max, b) =>
    b.valuePaise > max.valuePaise ? b : max
  );
  const rest = bonuses.filter((b) => b.id !== featured.id);

  return (
    <Section tone="raised" width="medium" pad="lg">
      <SectionHeading
        eyebrow={`Worth ${formatPaise(totalValuePaise)} — yours free today`}
        title="Special Webinar {gold}Bonuses{/gold}"
      />

      <div className="mt-12 space-y-5">
        {/* Hero bonus — the biggest value, given the most surface. */}
        <Reveal>
          <GlowCard
            customSize
            enable3d
            glowColor="red"
            className="p-7 hover:-translate-y-1.5 sm:p-8"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
              <div
                className={cn(
                  layer(40),
                  "flex size-14 shrink-0 items-center justify-center rounded-xl bg-marigold-dim"
                )}
              >
                <DynamicIcon name={featured.iconName} className="size-7 text-marigold" />
              </div>
              <div className="flex-1">
                <div className={cn(layer(24), "flex flex-wrap items-center gap-3")}>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-sindoor-dim px-3 py-1 font-utility text-xs font-semibold uppercase tracking-wide text-sindoor">
                    <Gift className="size-3.5" /> Most valuable
                  </span>
                </div>
                <div className="mt-2">
                  <PriceTag paise={featured.valuePaise} large />
                </div>
                <h3
                  className={cn(
                    layer(24),
                    "mt-3 font-display text-xl font-semibold text-cream sm:text-2xl"
                  )}
                >
                  {featured.title}
                </h3>
                {featured.description && (
                  <p className="mt-2 font-body text-[15px] leading-relaxed text-cream-dim">
                    {featured.description}
                  </p>
                )}
              </div>
            </div>
          </GlowCard>
        </Reveal>

        {/* Supporting bonuses — same spotlight treatment, smaller footprint. */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {rest.map((b, i) => (
              <Reveal key={b.id} delay={(i % 2) * 80}>
                <GlowCard
                  customSize
                  enable3d
                  glowColor="orange"
                  className="flex h-full gap-4 p-5 hover:-translate-y-1.5"
                >
                  <div
                    className={cn(
                      layer(40),
                      "flex size-11 shrink-0 items-center justify-center rounded-lg bg-marigold-dim"
                    )}
                  >
                    <DynamicIcon name={b.iconName} className="size-5 text-marigold" />
                  </div>
                  <div>
                    <PriceTag paise={b.valuePaise} />
                    <h3
                      className={cn(
                        layer(24),
                        "mt-1 font-display text-base font-semibold text-cream"
                      )}
                    >
                      {b.title}
                    </h3>
                    {b.description && (
                      <p className="mt-1 font-body text-sm leading-relaxed text-cream-dim">
                        {b.description}
                      </p>
                    )}
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Value summary + the section's single CTA. */}
      <Reveal className="mt-12">
        <div className="mx-auto max-w-md text-center">
          <p className="font-body text-cream-dim">
            Total value of bonuses:{" "}
            <span className="text-cream-faint line-through">
              {formatPaise(totalValuePaise)}
            </span>
          </p>
          <p className="mt-1.5 font-display text-2xl font-semibold text-marigold-soft sm:text-3xl">
            Join today for {formatPaise(offerPricePaise)}/- only
          </p>
          <CtaBanner
            registrationUrl={registrationUrl}
            offerPricePaise={offerPricePaise}
            className="mt-7"
          />
        </div>
      </Reveal>
    </Section>
  );
}
