import { listBonuses } from "@/features/admin/bonuses/queries";
import { deleteBonusAction, setBonusActiveAction } from "@/features/admin/bonuses/actions";
import { SimpleResourceList } from "@/features/admin/components/simple-resource-list";
import { formatPaise } from "@/lib/utils";

export default async function BonusesPage() {
  const items = await listBonuses();

  return (
    <SimpleResourceList
      title="Bonuses"
      description='The "Special Webinar Bonuses" stack.'
      newHref="/admin/bonuses/new"
      items={items}
      renderPrimary={(b) => `${b.title} — ${formatPaise(b.valuePaise)}`}
      renderSecondary={(b) => b.description ?? ""}
      editHref={(b) => `/admin/bonuses/${b.id}`}
      toggleActiveActionFor={(b) => setBonusActiveAction.bind(null, b.id)}
      deleteActionFor={(b) => deleteBonusAction.bind(null, b.id)}
    />
  );
}
