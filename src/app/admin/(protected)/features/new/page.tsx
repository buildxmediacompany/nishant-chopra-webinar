import { AdminPageHeader } from "@/features/admin/components/page-header";
import { FeatureForm } from "@/features/admin/features/feature-form";
import { createFeatureAction } from "@/features/admin/features/actions";

export default function NewFeaturePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="New highlight"
        backHref="/admin/features"
        backLabel="Back to Why It Works"
      />
      <FeatureForm onSubmit={createFeatureAction} />
    </div>
  );
}
