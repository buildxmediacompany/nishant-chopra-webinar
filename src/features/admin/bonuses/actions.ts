"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { bonusFormSchema, type BonusFormValues } from "./schema";
import { createBonus, updateBonus, deleteBonus, setBonusActive } from "./queries";

export async function createBonusAction(values: BonusFormValues) {
  const parsed = bonusFormSchema.parse(values);
  await createBonus(parsed);
  revalidatePath("/admin/bonuses");
  revalidatePath("/");
  redirect("/admin/bonuses");
}

export async function updateBonusAction(id: string, values: BonusFormValues) {
  const parsed = bonusFormSchema.parse(values);
  await updateBonus(id, parsed);
  revalidatePath("/admin/bonuses");
  revalidatePath("/");
  redirect("/admin/bonuses");
}

export async function deleteBonusAction(id: string) {
  "use server";
  await deleteBonus(id);
  revalidatePath("/admin/bonuses");
  revalidatePath("/");
}

export async function setBonusActiveAction(id: string, isActive: boolean) {
  "use server";
  await setBonusActive(id, isActive);
  revalidatePath("/admin/bonuses");
  revalidatePath("/");
}
