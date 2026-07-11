import { Button } from "@/components/ui/button";
import { formatPaise } from "@/lib/utils";

export function AnnouncementBar({
  text,
  registrationUrl,
  offerPricePaise,
}: {
  text: string;
  registrationUrl: string;
  offerPricePaise: number;
}) {
  return (
    <div className="sticky top-0 z-50 bg-stage/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5">
        <p className="flex min-w-0 items-center gap-2 font-body text-xs font-medium text-cream-dim sm:text-sm">
          <span
            aria-hidden="true"
            className="hidden size-1.5 shrink-0 rounded-full bg-sindoor sm:inline-block"
          />
          <span className="truncate">{text}</span>
        </p>
        <div className="flex shrink-0 items-center gap-4">
          <Button
            asChild
            size="sm"
            variant="cta"
            className="hidden transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex"
          >
            <a href={registrationUrl} target="_blank" rel="noopener noreferrer">
              Register {formatPaise(offerPricePaise)}/-
            </a>
          </Button>
        </div>
      </div>
      {/* Hairline divider — softer than a flat border, fades at the edges. */}
      <div className="h-px bg-gradient-to-r from-transparent via-stage-line to-transparent" />
    </div>
  );
}
