import { ScreenshotForm } from "@/features/admin/testimonial-screenshots/screenshot-form";
import { createScreenshotAction } from "@/features/admin/testimonial-screenshots/actions";

export default function NewScreenshotPage() {
  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-semibold text-cream">New review screenshot</h1>
      <div className="mt-8">
        <ScreenshotForm onSubmit={createScreenshotAction} />
      </div>
    </div>
  );
}
