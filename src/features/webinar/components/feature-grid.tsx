import { SectionHeading } from "./section-heading";
import { DynamicIcon } from "./icon-map";

export function FeatureGrid({
  features,
}: {
  features: { id: string; title: string; description: string; iconName: string }[];
}) {
  if (features.length === 0) return null;

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Why This Workshop Is a {gold}Game-Changer{/gold}" />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.id}
              className="rounded-xl border border-stage-line bg-stage-raised p-6 transition-colors hover:border-marigold/40"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-marigold-dim">
                <DynamicIcon name={f.iconName} className="size-5 text-marigold" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-cream">
                {f.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-cream-dim">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
