"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { screenshotFormSchema, type ScreenshotFormValues } from "./schema";
import {
  createScreenshot,
  updateScreenshot,
  deleteScreenshot,
  setScreenshotActive,
} from "./queries";

export async function createScreenshotAction(values: ScreenshotFormValues) {
  const parsed = screenshotFormSchema.parse(values);
  await createScreenshot(parsed);
  revalidatePath("/admin/testimonial-screenshots");
  revalidatePath("/");
  redirect("/admin/testimonial-screenshots");
}

export async function updateScreenshotAction(id: string, values: ScreenshotFormValues) {
  const parsed = screenshotFormSchema.parse(values);
  await updateScreenshot(id, parsed);
  revalidatePath("/admin/testimonial-screenshots");
  revalidatePath("/");
  redirect("/admin/testimonial-screenshots");
}

export async function deleteScreenshotAction(id: string) {
  "use server";
  await deleteScreenshot(id);
  revalidatePath("/admin/testimonial-screenshots");
  revalidatePath("/");
}

export async function setScreenshotActiveAction(id: string, isActive: boolean) {
  "use server";
  await setScreenshotActive(id, isActive);
  revalidatePath("/admin/testimonial-screenshots");
  revalidatePath("/");
}
