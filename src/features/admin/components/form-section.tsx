import { cn } from "@/lib/utils";

const COLUMNS = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * One group of related fields. Every admin form is a stack of these, so a
 * three-field form and a thirty-field form read the same way.
 */
export function FormSection({
  title,
  description,
  columns = 1,
  children,
}: {
  title: string;
  description?: string;
  columns?: keyof typeof COLUMNS;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-stage-line bg-stage-raised p-6">
      <div className="mb-5">
        <h2 className="font-display text-base font-semibold text-cream">{title}</h2>
        {description && <p className="mt-1 text-sm text-cream-dim">{description}</p>}
      </div>
      <div className={cn("grid grid-cols-1 gap-5", COLUMNS[columns])}>{children}</div>
    </section>
  );
}
