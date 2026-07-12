import { User } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Social proof as a cluster of student faces, not a plain stat line.
 * We have no real student photos to ship, so each avatar is a warm
 * gradient disc with a silhouette — reads as "a crowd of people" at a
 * glance while staying an asset-free, themeable SVG/CSS graphic.
 *
 * The label's leading number (e.g. "10,000+") is pulled out and set big
 * in gold so the scale lands before the eye reaches the words.
 */

// A few warm face tones so the cluster looks like distinct people, not clones.
const FACE_GRADIENTS = [
  "from-[#f7d489] to-[#c2843b]",
  "from-[#e8a93b] to-[#a8541f]",
  "from-[#c23b33] to-[#7a241f]",
  "from-[#f4c766] to-[#b7802a]",
  "from-[#e0895a] to-[#9c4a2c]",
];

export function AvatarStack({
  label,
  count = 5,
  className,
}: {
  /** e.g. "10,000+ Students Trained" */
  label: string;
  /** How many face discs to render. */
  count?: number;
  className?: string;
}) {
  // Split "10,000+ Students Trained" -> ["10,000+", "Students Trained"].
  const match = label.match(/^\s*([\d,]+\+?)\s*(.*)$/);
  const lead = match ? match[1] : null;
  const rest = match ? match[2] : label;

  return (
    <div className={cn("flex flex-col items-start gap-1.5", className)}>
      {/* Avatar discs */}
      <div className="flex items-center">
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "relative flex size-9 items-center justify-center rounded-full bg-gradient-to-br ring-2 ring-stage",
              FACE_GRADIENTS[i % FACE_GRADIENTS.length],
              i > 0 && "-ml-2.5"
            )}
            style={{ zIndex: count - i }}
            aria-hidden="true"
          >
            <User className="size-4 text-ink/70" strokeWidth={2.25} />
          </span>
        ))}
        {/* Tail bubble carrying the crowd-continues cue. */}
        <span
          className="-ml-2.5 flex size-9 items-center justify-center rounded-full bg-stage-raised font-utility text-[0.65rem] font-bold text-marigold-soft ring-2 ring-stage"
          aria-hidden="true"
        >
          +
        </span>
      </div>

      {/* Single-line label: "10,000+ Students Trained" */}
      <p className="whitespace-nowrap text-sm leading-none">
        {lead && (
          <span className="font-display font-bold text-marigold-soft">
            {lead}{" "}
          </span>
        )}
        <span className="font-utility text-xs font-medium uppercase tracking-wide text-cream-dim">
          {rest}
        </span>
      </p>
    </div>
  );
}
