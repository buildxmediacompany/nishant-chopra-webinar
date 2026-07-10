import { cn } from "@/lib/utils";

/** Rounded pill with an optional leading marigold icon. Event meta, tags, etc. */
export function Chip({
  icon: Icon,
  children,
  className,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-stage-raised px-4 py-2 text-sm text-cream shadow-soft",
        className
      )}
    >
      {Icon && <Icon className="size-4 shrink-0 text-marigold" />}
      {children}
    </span>
  );
}
