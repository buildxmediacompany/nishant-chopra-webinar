import { CtaBanner } from "./cta-banner";

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
    <section className="px-4 pb-20 pt-4">
      <div className="mx-auto max-w-3xl rounded-2xl border border-sindoor/30 bg-gradient-to-b from-sindoor-dim to-transparent px-6 py-12 text-center">
        <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
          Ready to Transform Your Voice?
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-cream-dim">
          Every day you wait is another day of straining, going off-pitch, or
          holding back. Your seat is reserved — for now.
        </p>
        <div className="mt-8">
          <CtaBanner
            registrationUrl={registrationUrl}
            offerPricePaise={offerPricePaise}
            seatsLeftText={seatsLeftText}
          />
        </div>
      </div>
    </section>
  );
}
