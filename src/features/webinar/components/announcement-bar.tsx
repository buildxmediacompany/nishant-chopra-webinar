import { CountdownTimer } from "./countdown-timer";
import { Button } from "@/components/ui/button";
import { formatPaise } from "@/lib/utils";

export function AnnouncementBar({
  text,
  countdownTargetAt,
  registrationUrl,
  offerPricePaise,
}: {
  text: string;
  countdownTargetAt: Date | string | null;
  registrationUrl: string;
  offerPricePaise: number;
}) {
  return (
    <div className="sticky top-0 z-50 border-b border-stage-line bg-stage/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2.5">
        <p className="font-body text-xs font-medium text-cream-dim sm:text-sm">
          {text}
        </p>
        <div className="flex items-center gap-4">
          {countdownTargetAt && (
            <CountdownTimer targetAt={new Date(countdownTargetAt).toISOString()} />
          )}
          <Button asChild size="sm" variant="cta" className="hidden sm:inline-flex">
            <a href={registrationUrl} target="_blank" rel="noopener noreferrer">
              Register Now {formatPaise(offerPricePaise)}/-
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
