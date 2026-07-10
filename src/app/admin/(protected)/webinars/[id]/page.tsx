import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/features/admin/components/page-header";
import { getWebinarById } from "@/features/admin/webinars/queries";
import { updateWebinarAction } from "@/features/admin/webinars/actions";
import { WebinarForm } from "@/features/admin/webinars/webinar-form";

export default async function EditWebinarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const webinar = await getWebinarById(id);

  if (!webinar) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <AdminPageHeader
        title="Edit webinar"
        description={webinar.slug}
        backHref="/admin/webinars"
        backLabel="Back to webinars"
      />
      <WebinarForm webinar={webinar} onSubmit={updateWebinarAction.bind(null, id)} />
    </div>
  );
}
