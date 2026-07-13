import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPaise } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { SeatsLeftTicker } from "./seats-left-ticker";

/**
 * The registration call-to-action: primary button + urgency + trust signals.
 * Deliberately not boxed in its own card — it drops into whatever section
 * frames it, so the CTA stops reading as the same pasted banner every time.
 */
export function CtaBanner({
  registrationUrl,
  offerPricePaise,
  seatsLeftText,
  className,
}: {
  registrationUrl: string;
  offerPricePaise: number;
  seatsLeftText?: string | null;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto flex w-full max-w-md flex-col items-center gap-4", className)}>
      <Button
        asChild
        variant="cta"
        size="lg"
        className="h-11 w-full animate-[cta-wobble_1.2s_ease-in-out_infinite] text-sm transition-[transform,background-color,box-shadow] duration-200 hover:animate-none hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(194,59,51,0.7)] sm:h-12 sm:text-base"
      >
        <a href={registrationUrl} target="_blank" rel="noopener noreferrer">
          Register Now — {formatPaise(offerPricePaise)}/- Only
        </a>
      </Button>

      {seatsLeftText && (
        <SeatsLeftTicker
          text={seatsLeftText}
          variant="banner"
          className="hidden sm:flex"
        />
      )}

      {/* Trust signals + payment — always stacked */}
      <div className="flex w-full flex-col items-center gap-3">
        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-cream-dim">
          <span className="inline-flex items-center gap-1.5">
            <Lock className="size-3.5 shrink-0 text-marigold" /> 100% Secure Payment
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 shrink-0 text-marigold" /> Instant Confirmation
          </span>
        </div>

        {/* Payment image */}
        <img
          src="/assets/payment.webp"
          alt="Accepted payment methods: UPI, Visa, Mastercard, RuPay"
          className="h-7 w-auto max-w-full object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
}
