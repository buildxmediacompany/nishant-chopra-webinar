import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/features/admin/components/page-header";
import { getFeatureById } from "@/features/admin/features/queries";
import { updateFeatureAction } from "@/features/admin/features/actions";
import { FeatureForm } from "@/features/admin/features/feature-form";

export default async function EditFeaturePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const feature = await getFeatureById(id);
  if (!feature) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Edit highlight"
        description={feature.title}
        backHref="/admin/features"
        backLabel="Back to Why It Works"
      />
      <FeatureForm feature={feature} onSubmit={updateFeatureAction.bind(null, id)} />
    </div>
  );
}
