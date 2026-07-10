"use server";

import { revalidatePath } from "next/cache";
import { runAction, runMutation, type ActionResult } from "@/features/admin/action-result";
import { screenshotFormSchema, type ScreenshotFormValues } from "./schema";
import {
  createScreenshot,
  updateScreenshot,
  deleteScreenshot,
  setScreenshotActive,
} from "./queries";

function revalidate() {
  revalidatePath("/admin/testimonial-screenshots");
  revalidatePath("/");
}

export async function createScreenshotAction(
  values: ScreenshotFormValues
): Promise<ActionResult> {
  return runAction(screenshotFormSchema, values, "Creating the screenshot", async (parsed) => {
    await createScreenshot(parsed);
    revalidate();
    return { redirectTo: "/admin/testimonial-screenshots" };
  });
}

export async function updateScreenshotAction(
  id: string,
  values: ScreenshotFormValues
): Promise<ActionResult> {
  return runAction(screenshotFormSchema, values, "Saving the screenshot", async (parsed) => {
    await updateScreenshot(id, parsed);
    revalidate();
    return { redirectTo: "/admin/testimonial-screenshots" };
  });
}

export async function deleteScreenshotAction(id: string): Promise<ActionResult> {
  return runMutation("Deleting the screenshot", async () => {
    await deleteScreenshot(id);
    revalidate();
  });
}

export async function setScreenshotActiveAction(
  id: string,
  isActive: boolean
): Promise<ActionResult> {
  return runMutation("Updating the screenshot", async () => {
    await setScreenshotActive(id, isActive);
    revalidate();
  });
}
