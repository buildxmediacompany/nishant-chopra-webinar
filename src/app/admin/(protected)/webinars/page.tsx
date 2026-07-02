import Link from "next/link";
import { Plus, Pencil, CheckCircle2 } from "lucide-react";
import { listWebinars } from "@/features/admin/webinars/queries";
import { deleteWebinarAction, setActiveWebinarAction } from "@/features/admin/webinars/actions";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/features/admin/components/delete-button";
import { formatPaise } from "@/lib/utils";

export default async function WebinarsListPage() {
  const webinarList = await listWebinars();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-cream">Webinars</h1>
          <p className="mt-1 text-sm text-cream-dim">
            The public page always shows whichever webinar is marked{" "}
            <span className="text-marigold">Live</span>.
          </p>
        </div>
        <Button asChild variant="gold">
          <Link href="/admin/webinars/new">
            <Plus className="size-4" /> New Webinar
          </Link>
        </Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-stage-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-stage-raised text-cream-dim">
            <tr>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Event date</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {webinarList.map((w) => (
              <tr key={w.id} className="border-t border-stage-line">
                <td className="px-4 py-3 text-cream">{w.slug}</td>
                <td className="px-4 py-3 text-cream-dim">{w.eventDate} · {w.eventTime}</td>
                <td className="px-4 py-3 text-cream-dim">{formatPaise(w.offerPricePaise)}</td>
                <td className="px-4 py-3">
                  {w.isActive ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-marigold-dim px-2.5 py-1 text-xs font-semibold text-marigold">
                      <CheckCircle2 className="size-3.5" /> Live
                    </span>
                  ) : (
                    <form action={setActiveWebinarAction.bind(null, w.id)}>
                      <button
                        type="submit"
                        className="rounded-full border border-stage-line px-2.5 py-1 text-xs text-cream-dim transition-colors hover:border-marigold hover:text-marigold"
                      >
                        Set as Live
                      </button>
                    </form>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/webinars/${w.id}`}
                      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-cream-dim transition-colors hover:bg-stage-raised hover:text-marigold"
                    >
                      <Pencil className="size-4" /> Edit
                    </Link>
                    <DeleteButton
                      action={deleteWebinarAction.bind(null, w.id)}
                      confirmMessage={`Delete "${w.slug}"? This can't be undone.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {webinarList.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-cream-faint">
                  No webinars yet — create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
