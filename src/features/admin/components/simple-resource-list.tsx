import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminPageHeader } from "./page-header";
import { DeleteButton } from "./delete-button";
import { ActiveToggle } from "./active-toggle";
import type { ActionResult } from "@/features/admin/action-result";

export function SimpleResourceList<T extends { id: string; isActive: boolean }>({
  title,
  description,
  newHref,
  items,
  renderPrimary,
  renderSecondary,
  editHref,
  toggleActiveActionFor,
  deleteActionFor,
}: {
  title: string;
  description?: string;
  newHref: string;
  items: T[];
  renderPrimary: (item: T) => React.ReactNode;
  renderSecondary?: (item: T) => React.ReactNode;
  editHref: (item: T) => string;
  /** Return the real server action bound to this item, e.g. `(item) => toggleXAction.bind(null, item.id)` */
  toggleActiveActionFor: (item: T) => (checked: boolean) => Promise<ActionResult>;
  /** Return the real server action bound to this item, e.g. `(item) => deleteXAction.bind(null, item.id)` */
  deleteActionFor: (item: T) => () => Promise<ActionResult>;
}) {
  return (
    <div>
      <AdminPageHeader
        title={title}
        description={description}
        actions={
          <Button asChild variant="gold">
            <Link href={newHref}>
              <Plus className="size-4" /> New
            </Link>
          </Button>
        }
      />

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-stage-line bg-stage-raised px-4 py-3"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-body text-sm font-medium text-cream">
                {renderPrimary(item)}
              </p>
              {renderSecondary && (
                <p className="mt-0.5 truncate text-xs text-cream-dim">
                  {renderSecondary(item)}
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <ActiveToggle
                defaultChecked={item.isActive}
                action={toggleActiveActionFor(item)}
              />
              <Link
                href={editHref(item)}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-cream-dim transition-colors hover:bg-stage hover:text-marigold"
              >
                <Pencil className="size-4" />
              </Link>
              <DeleteButton action={deleteActionFor(item)} />
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="rounded-xl border border-dashed border-stage-line px-4 py-10 text-center text-sm text-cream-faint">
            Nothing here yet — click &quot;New&quot; to add one.
          </p>
        )}
      </div>
    </div>
  );
}
