import { Highlight } from "./highlight";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={cn(centered ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <p
          className={cn(
            "font-utility text-sm font-semibold uppercase tracking-[0.22em] text-marigold",
            centered ? "mx-auto" : ""
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-[1.75rem] font-semibold leading-[1.12] text-cream sm:text-4xl lg:text-[2.75rem]",
          eyebrow ? "mt-3" : ""
        )}
      >
        <Highlight text={title} />
      </h2>
      {/* Signature: a hand-drawn harkat (vocal ornament) that draws itself in. */}
      <svg
        className={cn("mt-4 h-3 w-24", centered ? "mx-auto" : "")}
        viewBox="0 0 96 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="harkat-line"
          d="M2 8C10 8 10 2 18 2C26 2 26 10 34 10C42 10 42 4 50 4C58 4 58 9 66 9C74 9 74 3 82 3C88 3 88 6 94 6"
          stroke="var(--color-marigold)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {subtitle && (
        <p
          className={cn(
            "mt-5 max-w-2xl font-body text-cream-dim",
            centered ? "mx-auto" : ""
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
