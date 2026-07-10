import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/features/admin/components/page-header";
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
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Edit segment"
        description={segment.title}
        backHref="/admin/audience"
        backLabel="Back to Who It's For"
      />
      <AudienceForm segment={segment} onSubmit={updateAudienceSegmentAction.bind(null, id)} />
    </div>
  );
}
