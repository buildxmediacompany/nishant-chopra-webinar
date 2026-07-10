import { AdminPageHeader } from "@/features/admin/components/page-header";
import { ShowcaseVideoForm } from "@/features/admin/showcase-videos/showcase-video-form";
import { createShowcaseVideoAction } from "@/features/admin/showcase-videos/actions";

export default function NewShowcaseVideoPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="New singing video"
        backHref="/admin/showcase-videos"
        backLabel="Back to singing videos"
      />
      <ShowcaseVideoForm onSubmit={createShowcaseVideoAction} />
    </div>
  );
}
