import { SectionHeading } from "./section-heading";
import { DynamicIcon } from "./icon-map";
import { formatPaise } from "@/lib/utils";
import { CtaBanner } from "./cta-banner";

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

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow={`Unlock Extra Value Today — Worth Over ${formatPaise(totalValuePaise)}!`}
          title="🎁 Special Webinar Bonuses"
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {bonuses.map((b, i) => (
            <div
              key={b.id}
              className="flex gap-4 rounded-xl border border-marigold/25 bg-stage-raised p-5"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-marigold-dim">
                <DynamicIcon name={b.iconName} className="size-5 text-marigold" />
              </div>
              <div>
                <p className="font-utility text-xs font-semibold uppercase tracking-wide text-sindoor">
                  Bonus {i + 1} — {formatPaise(b.valuePaise)}
                </p>
                <h3 className="mt-1 font-display text-base font-semibold text-cream">
                  {b.title}
                </h3>
                {b.description && (
                  <p className="mt-1 font-body text-sm leading-relaxed text-cream-dim">
                    {b.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="font-body text-cream-dim">
            Total Value Of Bonuses:{" "}
            <span className="text-cream-faint line-through">
              {formatPaise(totalValuePaise)}/-
            </span>
          </p>
          <p className="mt-1 font-display text-2xl font-semibold text-marigold-soft">
            Join Today For {formatPaise(offerPricePaise)}/- Only
          </p>
          <div className="mt-6">
            <CtaBanner registrationUrl={registrationUrl} offerPricePaise={offerPricePaise} />
          </div>
        </div>
      </div>
    </section>
  );
}
