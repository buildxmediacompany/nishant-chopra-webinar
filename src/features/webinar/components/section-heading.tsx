import { Highlight } from "./highlight";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && (
        <p className="font-utility text-sm font-semibold uppercase tracking-[0.2em] text-marigold">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-display text-3xl font-semibold text-cream sm:text-4xl">
        <Highlight text={title} />
      </h2>
      <svg
        className={
          align === "center" ? "mx-auto mt-3 h-3 w-24" : "mt-3 h-3 w-24"
        }
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
        <p className="mx-auto mt-4 max-w-2xl font-body text-cream-dim">
          {subtitle}
        </p>
      )}
    </div>
  );
}
