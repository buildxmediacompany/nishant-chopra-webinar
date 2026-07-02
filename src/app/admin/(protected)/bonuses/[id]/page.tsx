import { notFound } from "next/navigation";
import { getBonusById } from "@/features/admin/bonuses/queries";
import { updateBonusAction } from "@/features/admin/bonuses/actions";
import { BonusForm } from "@/features/admin/bonuses/bonus-form";

export default async function EditBonusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bonus = await getBonusById(id);
  if (!bonus) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-cream">Edit bonus</h1>
      <div className="mt-8">
        <BonusForm bonus={bonus} onSubmit={updateBonusAction.bind(null, id)} />
      </div>
    </div>
  );
}
