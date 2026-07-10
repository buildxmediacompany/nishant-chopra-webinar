import { AdminPageHeader } from "@/features/admin/components/page-header";
import { BonusForm } from "@/features/admin/bonuses/bonus-form";
import { createBonusAction } from "@/features/admin/bonuses/actions";

export default function NewBonusPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader title="New bonus" backHref="/admin/bonuses" backLabel="Back to bonuses" />
      <BonusForm onSubmit={createBonusAction} />
    </div>
  );
}
