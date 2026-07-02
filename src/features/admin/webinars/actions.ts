"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { webinarFormSchema, type WebinarFormValues } from "./schema";
import {
  createWebinar,
  updateWebinar,
  deleteWebinar,
  setActiveWebinar,
} from "./queries";

// Values arrive already validated client-side by react-hook-form + zodResolver;
// re-validating here is defense-in-depth against a caller that bypasses the form.

export async function createWebinarAction(values: WebinarFormValues) {
  const parsed = webinarFormSchema.parse(values);
  const created = await createWebinar(parsed);
  revalidatePath("/admin/webinars");
  revalidatePath("/");
  redirect(`/admin/webinars/${created.id}?saved=1`);
}

export async function updateWebinarAction(id: string, values: WebinarFormValues) {
  const parsed = webinarFormSchema.parse(values);
  await updateWebinar(id, parsed);
  revalidatePath("/admin/webinars");
  revalidatePath("/");
  redirect(`/admin/webinars/${id}?saved=1`);
}

export async function deleteWebinarAction(id: string) {
  "use server";
  await deleteWebinar(id);
  revalidatePath("/admin/webinars");
  revalidatePath("/");
}

export async function setActiveWebinarAction(id: string) {
  "use server";
  await setActiveWebinar(id);
  revalidatePath("/admin/webinars");
  revalidatePath("/");
}
