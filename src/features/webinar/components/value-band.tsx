import { Section } from "./section";
import { Reveal } from "./reveal";
import { TrustBadges } from "./trust-badges";

/**
 * "Everything you get" — the enrolment value props (lifetime access, lifetime
 * support, recordings, certificate) rendered as medallions rather than a plain
 * bullet list, so they're scannable and read as guarantees.
 */
export function ValueBand() {
  return (
    <Section tone="base" width="medium" pad="md">
      <Reveal>
        <div className="text-center">
          <p className="font-utility text-sm font-semibold uppercase tracking-[0.22em] text-marigold">
            Enrol once, keep it forever
          </p>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight text-cream sm:text-4xl">
            Everything You Get
          </h2>
        </div>

        <TrustBadges
          className="mt-10"
          badges={[
            { icon: "infinity", label: "Lifetime access" },
            { icon: "support", label: "Lifetime support" },
            { icon: "video", label: "Session recording" },
            { icon: "check", label: "Practice plan" },
            { icon: "award", label: "Certificate" },
          ]}
        />
      </Reveal>
    </Section>
  );
}
