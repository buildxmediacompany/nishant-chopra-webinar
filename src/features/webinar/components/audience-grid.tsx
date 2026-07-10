import { Section } from "./section";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { DynamicIcon } from "./icon-map";

export function AudienceGrid({
  segments,
}: {
  segments: { id: string; title: string; description: string; iconName: string }[];
}) {
  if (segments.length === 0) return null;

  return (
    <Section tone="raised" width="medium" pad="md">
      <SectionHeading
        title="Who This Is {gold}Perfect For{/gold}"
        subtitle="If any of these sound like you, this workshop was made for you."
      />
      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
        {segments.map((s, i) => (
          <Reveal key={s.id} delay={(i % 2) * 80}>
            <div className="group flex items-start gap-4 py-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-marigold-dim transition-transform duration-200 group-hover:scale-105">
                <DynamicIcon name={s.iconName} className="size-5 text-marigold" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-cream">
                  {s.title}
                </h3>
                <p className="mt-1 font-body text-sm leading-relaxed text-cream-dim">
                  {s.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
