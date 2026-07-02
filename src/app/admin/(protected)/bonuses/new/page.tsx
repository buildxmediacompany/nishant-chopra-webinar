import { BonusForm } from "@/features/admin/bonuses/bonus-form";
import { createBonusAction } from "@/features/admin/bonuses/actions";

export default function NewBonusPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-cream">New bonus</h1>
      <div className="mt-8">
        <BonusForm onSubmit={createBonusAction} />
      </div>
    </div>
  );
}
