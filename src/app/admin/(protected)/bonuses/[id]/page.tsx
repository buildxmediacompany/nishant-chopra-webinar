import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/features/admin/components/page-header";
import { getBonusById } from "@/features/admin/bonuses/queries";
import { updateBonusAction } from "@/features/admin/bonuses/actions";
import { BonusForm } from "@/features/admin/bonuses/bonus-form";

export default async function EditBonusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bonus = await getBonusById(id);
  if (!bonus) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Edit bonus"
        description={bonus.title}
        backHref="/admin/bonuses"
        backLabel="Back to bonuses"
      />
      <BonusForm bonus={bonus} onSubmit={updateBonusAction.bind(null, id)} />
    </div>
  );
}
