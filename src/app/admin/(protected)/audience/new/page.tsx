import { AudienceForm } from "@/features/admin/audience/audience-form";
import { createAudienceSegmentAction } from "@/features/admin/audience/actions";

export default function NewAudienceSegmentPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-cream">New audience segment</h1>
      <div className="mt-8">
        <AudienceForm onSubmit={createAudienceSegmentAction} />
      </div>
    </div>
  );
}
