import { notFound } from "next/navigation";
import { getWebinarById } from "@/features/admin/webinars/queries";
import { updateWebinarAction } from "@/features/admin/webinars/actions";
import { WebinarForm } from "@/features/admin/webinars/webinar-form";

export default async function EditWebinarPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;
  const webinar = await getWebinarById(id);

  if (!webinar) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-semibold text-cream">Edit webinar</h1>
      <p className="mt-1 text-sm text-cream-dim">{webinar.slug}</p>
      {saved && (
        <p className="mt-4 rounded-lg border border-marigold/30 bg-marigold-dim px-4 py-3 text-sm text-marigold">
          Saved.
        </p>
      )}
      <div className="mt-8">
        <WebinarForm webinar={webinar} onSubmit={updateWebinarAction.bind(null, id)} />
      </div>
    </div>
  );
}
