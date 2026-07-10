import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AdminPageHeader({
  title,
  description,
  backHref,
  backLabel,
  actions,
}: {
  title: string;
  description?: React.ReactNode;
  /** Renders the back link. Omit on top-level pages reachable from the sidebar. */
  backHref?: string;
  backLabel?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      {backHref && (
        <Link
          href={backHref}
          className="mb-3 inline-flex items-center gap-1.5 rounded-md text-sm text-cream-dim transition-colors hover:text-marigold focus-visible:ring-2 focus-visible:ring-marigold/40 focus-visible:outline-none"
        >
          <ArrowLeft className="size-4" />
          {backLabel ?? "Back"}
        </Link>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-semibold text-cream">{title}</h1>
          {description && <p className="mt-1 text-sm text-cream-dim">{description}</p>}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
