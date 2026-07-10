import { cn } from "@/lib/utils";

const toneClasses = {
  base: "bg-stage",
  raised: "bg-stage-raised/40",
} as const;

const widthClasses = {
  narrow: "max-w-3xl",
  medium: "max-w-5xl",
  default: "max-w-6xl",
} as const;

const padClasses = {
  sm: "py-14 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-20 sm:py-28",
} as const;

/**
 * Section rhythm wrapper. Alternating `tone` bands + varied `pad` (by section
 * importance) are what break the "every section looks identical" feel. Layout
 * inside each section stays the caller's job.
 */
export function Section({
  children,
  tone = "base",
  width = "default",
  pad = "md",
  id,
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof toneClasses;
  width?: keyof typeof widthClasses;
  pad?: keyof typeof padClasses;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={cn("px-4", toneClasses[tone], padClasses[pad], className)}>
      <div className={cn("mx-auto", widthClasses[width])}>{children}</div>
    </section>
  );
}
