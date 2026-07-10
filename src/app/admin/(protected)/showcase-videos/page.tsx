import { listShowcaseVideos } from "@/features/admin/showcase-videos/queries";
import {
  deleteShowcaseVideoAction,
  setShowcaseVideoActiveAction,
} from "@/features/admin/showcase-videos/actions";
import { SimpleResourceList } from "@/features/admin/components/simple-resource-list";

export default async function ShowcaseVideosPage() {
  const items = await listShowcaseVideos();

  return (
    <SimpleResourceList
      title="Singing Videos"
      description="Unlisted YouTube clips showcased on the landing page."
      newHref="/admin/showcase-videos/new"
      items={items}
      renderPrimary={(v) => v.title}
      renderSecondary={(v) => v.videoUrl}
      editHref={(v) => `/admin/showcase-videos/${v.id}`}
      toggleActiveActionFor={(v) => setShowcaseVideoActiveAction.bind(null, v.id)}
      deleteActionFor={(v) => deleteShowcaseVideoAction.bind(null, v.id)}
    />
  );
}
