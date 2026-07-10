import { cn } from "@/lib/utils";

/** A single trust metric: big Fraunces number over a tracked utility label. */
export function Stat({
  value,
  label,
  className,
}: {
  value: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <div className="font-display text-2xl font-semibold leading-none text-cream sm:text-3xl">
        {value}
      </div>
      <div className="mt-1.5 font-utility text-xs uppercase tracking-[0.14em] text-cream-faint">
        {label}
      </div>
    </div>
  );
}
