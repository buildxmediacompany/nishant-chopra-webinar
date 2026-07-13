import { cn } from "@/lib/utils";

/**
 * Social proof cluster of real student faces from /assets/1.webp – 6.png.
 * Shows the first `count` photos stacked with overlap, plus a "+" bubble.
 */

const STUDENT_PHOTOS = [
  "/assets/7.webp",
  "/assets/8.webp",
  "/assets/9.webp",
  "/assets/10.webp",
  "/assets/11.webp",
  "/assets/12.webp",
];

export function AvatarStack({
  label,
  count = 5,
  className,
}: {
  /** e.g. "10,000+ Students Trained" */
  label: string;
  /** How many face discs to render (max 6). */
  count?: number;
  className?: string;
}) {
  // Split "10,000+ Students Trained" -> ["10,000+", "Students Trained"].
  const match = label.match(/^\s*([\d,]+\+?)\s*(.*)$/);
  const lead = match ? match[1] : null;
  const rest = match ? match[2] : label;

  const photos = STUDENT_PHOTOS.slice(
    0,
    Math.min(count, STUDENT_PHOTOS.length),
  );

  return (
    <div className={cn("flex flex-col items-start gap-1.5", className)}>
      {/* Avatar discs */}
      <div className="flex items-center">
        {photos.map((src, i) => (
          <div
            key={src}
            className={cn(
              "relative size-9 shrink-0 overflow-hidden rounded-full ring-2 ring-stage",
              i > 0 && "-ml-2.5",
            )}
            style={{ zIndex: photos.length - i }}
            aria-hidden="true"
          >
            <img src={src} alt="" className="size-full object-cover" />
          </div>
        ))}
        {/* Tail "+" bubble */}
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
