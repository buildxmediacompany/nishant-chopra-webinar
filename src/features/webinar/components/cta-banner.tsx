import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPaise } from "@/lib/utils";
import { cn } from "@/lib/utils";

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
    <div className={cn("mx-auto flex w-full max-w-md flex-col items-center gap-3.5", className)}>
      <Button
        asChild
        variant="cta"
        size="lg"
        className="w-full text-base transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(194,59,51,0.7)]"
      >
        <a href={registrationUrl} target="_blank" rel="noopener noreferrer">
          Register Now — {formatPaise(offerPricePaise)}/- Only
        </a>
      </Button>

      {seatsLeftText && (
        <p className="font-utility text-sm font-medium uppercase tracking-wide text-marigold-soft">
          {seatsLeftText}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-cream-dim">
        <span className="inline-flex items-center gap-1.5">
          <Lock className="size-3.5 text-marigold" /> 100% Secure Payment
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-marigold" /> Instant Confirmation
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        {["UPI", "Visa", "Mastercard", "RuPay"].map((m) => (
          <span
            key={m}
            className="font-utility text-xs uppercase tracking-wide text-cream-faint"
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
