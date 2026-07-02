import { listScreenshots } from "@/features/admin/testimonial-screenshots/queries";
import {
  deleteScreenshotAction,
  setScreenshotActiveAction,
} from "@/features/admin/testimonial-screenshots/actions";
import { SimpleResourceList } from "@/features/admin/components/simple-resource-list";

export default async function ScreenshotsPage() {
  const items = await listScreenshots();

  return (
    <SimpleResourceList
      title="Review Screenshots"
      description='The "Some More Feedback" image grid.'
      newHref="/admin/testimonial-screenshots/new"
      items={items}
      renderPrimary={(s) => s.altText}
      renderSecondary={(s) => s.imageUrl}
      editHref={(s) => `/admin/testimonial-screenshots/${s.id}`}
      toggleActiveActionFor={(s) => setScreenshotActiveAction.bind(null, s.id)}
      deleteActionFor={(s) => deleteScreenshotAction.bind(null, s.id)}
    />
  );
}
