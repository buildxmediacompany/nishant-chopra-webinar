import { Button } from "@/components/ui/button";
import { formatPaise } from "@/lib/utils";
import { RegistrationToast } from "./registration-toast";
import { SeatsLeftTicker } from "./seats-left-ticker";

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
      {/* Live-signup nudge, floating just above the bar. */}
      <RegistrationToast className="absolute inset-x-4 bottom-full mb-2" />

      <div className="mx-auto flex max-w-md items-center gap-3">
        {seatsLeftText && (
          <SeatsLeftTicker
            text={seatsLeftText}
            className="min-w-0 flex-1 gap-1.5 text-xs leading-tight"
          />
        )}
        <Button
          asChild
          variant="cta"
          size="sm"
          className="h-10 shrink-0 flex-[2] text-sm"
        >
          <a href={registrationUrl} target="_blank" rel="noopener noreferrer">
            Register — {formatPaise(offerPricePaise)}/-
          </a>
        </Button>
      </div>
    </div>
  );
}
