import { listFeatures } from "@/features/admin/features/queries";
import { deleteFeatureAction, setFeatureActiveAction } from "@/features/admin/features/actions";
import { SimpleResourceList } from "@/features/admin/components/simple-resource-list";

export default async function FeaturesPage() {
  const items = await listFeatures();

  return (
    <SimpleResourceList
      title="Why It Works"
      description='The "Why This Workshop Is a Game-Changer" grid.'
      newHref="/admin/features/new"
      items={items}
      renderPrimary={(f) => f.title}
      renderSecondary={(f) => f.description}
      editHref={(f) => `/admin/features/${f.id}`}
      toggleActiveActionFor={(f) => setFeatureActiveAction.bind(null, f.id)}
      deleteActionFor={(f) => deleteFeatureAction.bind(null, f.id)}
    />
  );
}
