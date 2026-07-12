import { cn } from "@/lib/utils";

/**
 * Renders the star.png asset (which already contains all 5 stars)
 * alongside the rating value. Height-adjustable via className.
 */
export function StarRating({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-2", className)}
      aria-label={`${rating} out of 5 stars`}
    >
      <img
        src="/assets/star.png"
        alt="5 stars"
        className="h-8 w-auto object-contain"
      />
    </span>
  );
}
