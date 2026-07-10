import { AdminPageHeader } from "@/features/admin/components/page-header";
import { AudienceForm } from "@/features/admin/audience/audience-form";
import { createAudienceSegmentAction } from "@/features/admin/audience/actions";

export default function NewAudienceSegmentPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="New segment"
        backHref="/admin/audience"
        backLabel="Back to Who It's For"
      />
      <AudienceForm onSubmit={createAudienceSegmentAction} />
    </div>
  );
}
