import { Button } from "@/components/ui/button";
import { formatPaise } from "@/lib/utils";

/**
 * Fixed bottom register bar, mobile only. Keeps the primary action always in
 * reach on phones without pasting the full CTA block between every section.
 * (`main` reserves matching bottom padding so nothing hides behind it.)
 */
export function MobileCtaBar({
  registrationUrl,
  offerPricePaise,
  seatsLeftText,
}: {
  registrationUrl: string;
  offerPricePaise: number;
  seatsLeftText?: string | null;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-stage/90 px-4 pb-[calc(env(safe-area-inset-bottom)+0.625rem)] pt-2.5 shadow-bar backdrop-blur-md sm:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        {seatsLeftText && (
          <p className="min-w-0 flex-1 font-utility text-xs font-medium uppercase leading-tight tracking-wide text-marigold-soft">
            {seatsLeftText}
          </p>
        )}
        <Button asChild variant="cta" size="default" className="shrink-0 flex-[2]">
          <a href={registrationUrl} target="_blank" rel="noopener noreferrer">
            Register — {formatPaise(offerPricePaise)}/-
          </a>
        </Button>
      </div>
    </div>
  );
}
