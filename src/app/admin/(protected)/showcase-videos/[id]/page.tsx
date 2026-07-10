import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/features/admin/components/page-header";
import { getShowcaseVideoById } from "@/features/admin/showcase-videos/queries";
import { updateShowcaseVideoAction } from "@/features/admin/showcase-videos/actions";
import { ShowcaseVideoForm } from "@/features/admin/showcase-videos/showcase-video-form";

export default async function EditShowcaseVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = await getShowcaseVideoById(id);
  if (!video) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Edit singing video"
        description={video.title}
        backHref="/admin/showcase-videos"
        backLabel="Back to singing videos"
      />
      <ShowcaseVideoForm video={video} onSubmit={updateShowcaseVideoAction.bind(null, id)} />
    </div>
  );
}
