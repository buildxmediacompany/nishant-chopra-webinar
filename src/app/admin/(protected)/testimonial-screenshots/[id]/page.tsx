import { notFound } from "next/navigation";
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
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-semibold text-cream">Edit review screenshot</h1>
      <div className="mt-8">
        <ScreenshotForm screenshot={screenshot} onSubmit={updateScreenshotAction.bind(null, id)} />
      </div>
    </div>
  );
}
