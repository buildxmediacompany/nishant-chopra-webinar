import { AdminPageHeader } from "@/features/admin/components/page-header";
import { ScreenshotForm } from "@/features/admin/testimonial-screenshots/screenshot-form";
import { createScreenshotAction } from "@/features/admin/testimonial-screenshots/actions";

export default function NewScreenshotPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="New review screenshot"
        backHref="/admin/testimonial-screenshots"
        backLabel="Back to review screenshots"
      />
      <ScreenshotForm onSubmit={createScreenshotAction} />
    </div>
  );
}
