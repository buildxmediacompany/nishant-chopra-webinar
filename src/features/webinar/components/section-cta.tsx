import { Button } from "@/components/ui/button";
import { formatPaise } from "@/lib/utils";

/**
 * A compact, repeatable "Register Now" nudge dropped between sections so the
 * primary action is always within a scroll of the reader. Deliberately light
 * (just the button + price) — the Hero, bonus stack, and closing block carry
 * the full CTA treatment.
 */
export function SectionCta({
  registrationUrl,
  offerPricePaise,
}: {
  registrationUrl: string;
  offerPricePaise: number;
}) {
  return (
    <div className="flex justify-center py-4">
      <Button
        asChild
        variant="cta"
        size="lg"
        className="animate-[cta-wobble_3s_ease-in-out_2s_infinite] transition-[transform,box-shadow] duration-200 hover:animate-none hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(194,59,51,0.7)]"
      >
        <a href={registrationUrl} target="_blank" rel="noopener noreferrer">
          Register Now — {formatPaise(offerPricePaise)}/- Only
        </a>
      </Button>
    </div>
  );
}
