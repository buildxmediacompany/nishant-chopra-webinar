import { FeatureForm } from "@/features/admin/features/feature-form";
import { createFeatureAction } from "@/features/admin/features/actions";

export default function NewFeaturePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-cream">New feature highlight</h1>
      <div className="mt-8">
        <FeatureForm onSubmit={createFeatureAction} />
      </div>
    </div>
  );
}
