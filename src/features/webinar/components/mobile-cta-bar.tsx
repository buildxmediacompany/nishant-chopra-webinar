import { Button } from "@/components/ui/button";
import { formatPaise } from "@/lib/utils";
import { RegistrationToast } from "./registration-toast";
import { SeatsLeftTicker } from "./seats-left-ticker";

/**
 * Fixed bottom register bar, mobile only. Keeps the primary action always in
 * reach on phones without pasting the full CTA block between every section.
 * (`main` reserves matching bottom padding so nothing hides behind it.)
 *
 * Layout (when seatsLeftText is present):
 *   ┌──────────────────────────────────────────┐
 *   │  🔥 FILLING FAST  •  ● Only N Seats Left │  ← urgency badge pill
 *   │  [ Register Now — ₹XXX/- Only          ] │  ← full-width CTA button
 *   └──────────────────────────────────────────┘
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
    <div className="fixed inset-x-0 bottom-0 z-50 bg-[#120509] px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-4px_24px_-4px_rgba(194,59,51,0.35)] ring-1 ring-sindoor/20 backdrop-blur-md sm:hidden">
      {/* Live-signup nudge, floating just above the bar. */}
      <RegistrationToast className="absolute inset-x-4 bottom-full mb-2" />

      <div className="mx-auto flex max-w-md flex-col gap-2.5">
        {/* ── Urgency badge pill ── */}
        {seatsLeftText && (
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-sindoor/30 bg-sindoor/10 px-4 py-1.5 shadow-[0_0_12px_0px_rgba(194,59,51,0.2)]">
              {/* Filling fast label */}
              <span className="font-utility text-[11px] font-black uppercase tracking-widest text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]">
                🔥 Filling Fast
              </span>

              {/* Divider dot */}
              <span aria-hidden="true" className="size-1 rounded-full bg-sindoor/50" />

              {/* Blinking seats count */}
              <SeatsLeftTicker
                text={seatsLeftText}
                variant="compact"
              />
            </div>
          </div>
        )}

        {/* ── Full-width register button ── */}
        <Button
          asChild
          variant="cta"
          size="sm"
          className="h-11 w-full text-sm font-semibold"
        >
          <a href={registrationUrl} target="_blank" rel="noopener noreferrer">
            Register Now — {formatPaise(offerPricePaise)}/- Only
          </a>
        </Button>
      </div>
    </div>
  );
}
