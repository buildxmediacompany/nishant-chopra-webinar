import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/features/admin/components/page-header";
import { getScreenshotById } from "@/features/admin/testimonial-screenshots/queries";
import { updateScreenshotAction } from "@/features/admin/testimonial-screenshots/actions";
import { ScreenshotForm } from "@/features/admin/testimonial-screenshots/screenshot-form";

export default async function EditScreenshotPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const screenshot = await getScreenshotById(id);
  if (!screenshot) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Edit review screenshot"
        description={screenshot.altText}
        backHref="/admin/testimonial-screenshots"
        backLabel="Back to review screenshots"
      />
      <ScreenshotForm screenshot={screenshot} onSubmit={updateScreenshotAction.bind(null, id)} />
    </div>
  );
}
