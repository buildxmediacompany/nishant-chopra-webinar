import { notFound } from "next/navigation";
import { getAudienceSegmentById } from "@/features/admin/audience/queries";
import { updateAudienceSegmentAction } from "@/features/admin/audience/actions";
import { AudienceForm } from "@/features/admin/audience/audience-form";

export default async function EditAudienceSegmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const segment = await getAudienceSegmentById(id);
  if (!segment) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-cream">Edit audience segment</h1>
      <div className="mt-8">
        <AudienceForm segment={segment} onSubmit={updateAudienceSegmentAction.bind(null, id)} />
      </div>
    </div>
  );
}
