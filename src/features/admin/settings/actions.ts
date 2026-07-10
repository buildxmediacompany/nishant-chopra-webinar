"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/features/admin/action-result";
import { settingsFormSchema, type SettingsFormValues } from "./schema";
import { updateSiteSettings } from "./queries";

export async function updateSettingsAction(
  values: SettingsFormValues
): Promise<ActionResult> {
  return runAction(settingsFormSchema, values, "Saving settings", async (parsed) => {
    await updateSiteSettings(parsed);
    revalidatePath("/admin/settings");
    revalidatePath("/");
  });
}
