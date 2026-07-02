import { notFound } from "next/navigation";
import { getFeatureById } from "@/features/admin/features/queries";
import { updateFeatureAction } from "@/features/admin/features/actions";
import { FeatureForm } from "@/features/admin/features/feature-form";

export default async function EditFeaturePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const feature = await getFeatureById(id);
  if (!feature) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-cream">Edit feature highlight</h1>
      <div className="mt-8">
        <FeatureForm feature={feature} onSubmit={updateFeatureAction.bind(null, id)} />
      </div>
    </div>
  );
}
