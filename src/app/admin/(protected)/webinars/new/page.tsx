import { AdminPageHeader } from "@/features/admin/components/page-header";
import { WebinarForm } from "@/features/admin/webinars/webinar-form";
import { createWebinarAction } from "@/features/admin/webinars/actions";

export default function NewWebinarPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <AdminPageHeader
        title="New webinar"
        description="Fill this in, then mark it Live from the webinars list when it's ready to publish."
        backHref="/admin/webinars"
        backLabel="Back to webinars"
      />
      <WebinarForm onSubmit={createWebinarAction} />
    </div>
  );
}
