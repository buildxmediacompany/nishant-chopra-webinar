"use server";

import { revalidatePath } from "next/cache";
import { settingsFormSchema, type SettingsFormValues } from "./schema";
import { updateSiteSettings } from "./queries";

export async function updateSettingsAction(values: SettingsFormValues) {
  const parsed = settingsFormSchema.parse(values);
  await updateSiteSettings(parsed);
  revalidatePath("/admin/settings");
  revalidatePath("/");
}
