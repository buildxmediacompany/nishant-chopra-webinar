import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Five stars, `rating` of them filled marigold. Shared by hero + testimonials. */
export function StarRating({
  rating,
  className,
  starClassName,
}: {
  rating: number;
  className?: string;
  starClassName?: string;
}) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < rating ? "fill-marigold text-marigold" : "text-stage-line",
            starClassName
          )}
        />
      ))}
    </div>
  );
}
