"use server";

import { revalidatePath } from "next/cache";
import { runAction, runMutation, type ActionResult } from "@/features/admin/action-result";
import { webinarFormSchema, type WebinarFormValues } from "./schema";
import { createWebinar, updateWebinar, deleteWebinar, setActiveWebinar } from "./queries";

// Values arrive already validated client-side by react-hook-form + zodResolver;
// re-validating here is defense-in-depth against a caller that bypasses the form.

function revalidate() {
  revalidatePath("/admin/webinars");
  revalidatePath("/");
}

export async function createWebinarAction(
  values: WebinarFormValues
): Promise<ActionResult> {
  return runAction(webinarFormSchema, values, "Creating the webinar", async (parsed) => {
    const created = await createWebinar(parsed);
    revalidate();
    return { redirectTo: `/admin/webinars/${created.id}` };
  });
}

export async function updateWebinarAction(
  id: string,
  values: WebinarFormValues
): Promise<ActionResult> {
  return runAction(webinarFormSchema, values, "Saving the webinar", async (parsed) => {
    await updateWebinar(id, parsed);
    revalidate();
  });
}

export async function deleteWebinarAction(id: string): Promise<ActionResult> {
  return runMutation("Deleting the webinar", async () => {
    await deleteWebinar(id);
    revalidate();
  });
}

export async function setActiveWebinarAction(id: string): Promise<ActionResult> {
  return runMutation("Setting the webinar live", async () => {
    await setActiveWebinar(id);
    revalidate();
  });
}
