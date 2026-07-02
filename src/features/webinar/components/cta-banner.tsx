import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPaise } from "@/lib/utils";

export function CtaBanner({
  registrationUrl,
  offerPricePaise,
  seatsLeftText,
}: {
  registrationUrl: string;
  offerPricePaise: number;
  seatsLeftText?: string | null;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-stage-line bg-stage-raised px-6 py-6">
      <Button asChild variant="cta" size="lg" className="w-full text-base">
        <a href={registrationUrl} target="_blank" rel="noopener noreferrer">
          Register Now {formatPaise(offerPricePaise)}/- Only
        </a>
      </Button>
      {seatsLeftText && (
        <p className="font-utility text-sm uppercase tracking-wide text-marigold-soft">
          {seatsLeftText}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-1">
        <span className="font-utility text-xs uppercase tracking-wide text-cream-faint">
          UPI
        </span>
        <span className="font-utility text-xs uppercase tracking-wide text-cream-faint">
          Visa
        </span>
        <span className="font-utility text-xs uppercase tracking-wide text-cream-faint">
          Mastercard
        </span>
        <span className="font-utility text-xs uppercase tracking-wide text-cream-faint">
          RuPay
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-cream-dim">
        <span className="inline-flex items-center gap-1.5">
          <Lock className="size-3.5 text-marigold" /> 100% Secure Payment
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-marigold" /> Instant Confirmation
        </span>
      </div>
    </div>
  );
}
