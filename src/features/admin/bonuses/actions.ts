"use server";

import { revalidatePath } from "next/cache";
import { runAction, runMutation, type ActionResult } from "@/features/admin/action-result";
import { bonusFormSchema, type BonusFormValues } from "./schema";
import { createBonus, updateBonus, deleteBonus, setBonusActive } from "./queries";

function revalidate() {
  revalidatePath("/admin/bonuses");
  revalidatePath("/");
}

export async function createBonusAction(values: BonusFormValues): Promise<ActionResult> {
  return runAction(bonusFormSchema, values, "Creating the bonus", async (parsed) => {
    await createBonus(parsed);
    revalidate();
    return { redirectTo: "/admin/bonuses" };
  });
}

export async function updateBonusAction(
  id: string,
  values: BonusFormValues
): Promise<ActionResult> {
  return runAction(bonusFormSchema, values, "Saving the bonus", async (parsed) => {
    await updateBonus(id, parsed);
    revalidate();
    return { redirectTo: "/admin/bonuses" };
  });
}

export async function deleteBonusAction(id: string): Promise<ActionResult> {
  return runMutation("Deleting the bonus", async () => {
    await deleteBonus(id);
    revalidate();
  });
}

export async function setBonusActiveAction(
  id: string,
  isActive: boolean
): Promise<ActionResult> {
  return runMutation("Updating the bonus", async () => {
    await setBonusActive(id, isActive);
    revalidate();
  });
}
