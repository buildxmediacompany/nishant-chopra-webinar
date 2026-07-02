import { listAudienceSegments } from "@/features/admin/audience/queries";
import {
  deleteAudienceSegmentAction,
  setAudienceSegmentActiveAction,
} from "@/features/admin/audience/actions";
import { SimpleResourceList } from "@/features/admin/components/simple-resource-list";

export default async function AudiencePage() {
  const items = await listAudienceSegments();

  return (
    <SimpleResourceList
      title="Who It's For"
      description='The "Who This Is Perfect For" grid.'
      newHref="/admin/audience/new"
      items={items}
      renderPrimary={(s) => s.title}
      renderSecondary={(s) => s.description}
      editHref={(s) => `/admin/audience/${s.id}`}
      toggleActiveActionFor={(s) => setAudienceSegmentActiveAction.bind(null, s.id)}
      deleteActionFor={(s) => deleteAudienceSegmentAction.bind(null, s.id)}
    />
  );
}
