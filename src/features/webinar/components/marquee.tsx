import { cn } from "@/lib/utils";

/**
 * Pure-CSS infinite marquee (no framer-motion). Two identical tracks scroll as
 * one; pauses on hover. Edges faded via a mask on the caller if desired.
 */
export function Marquee({
  children,
  reverse = false,
  pauseOnHover = true,
  durationSec = 40,
  className,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  durationSec?: number;
  className?: string;
}) {
  return (
    <div className={cn("group flex gap-4 overflow-hidden", className)}>
      {[0, 1].map((track) => (
        <div
          key={track}
          aria-hidden={track === 1}
          className={cn(
            "flex shrink-0 items-stretch gap-4 [animation:marquee_var(--dur)_linear_infinite]",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          style={{ "--dur": `${durationSec}s` } as React.CSSProperties}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
