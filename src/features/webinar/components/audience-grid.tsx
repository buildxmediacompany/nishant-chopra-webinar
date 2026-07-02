import { SectionHeading } from "./section-heading";
import { DynamicIcon } from "./icon-map";

export function AudienceGrid({
  segments,
}: {
  segments: { id: string; title: string; description: string; iconName: string }[];
}) {
  if (segments.length === 0) return null;

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Who This Is {gold}Perfect For{/gold}"
          subtitle="If any of these sound like you, this workshop was made for you."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {segments.map((s) => (
            <div
              key={s.id}
              className="flex flex-col items-center gap-3 rounded-xl border border-sindoor/30 bg-sindoor-dim px-6 py-8 text-center"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-stage-raised">
                <DynamicIcon name={s.iconName} className="size-5 text-marigold" />
              </div>
              <h3 className="font-display text-lg font-semibold text-cream">
                {s.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-cream-dim">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
