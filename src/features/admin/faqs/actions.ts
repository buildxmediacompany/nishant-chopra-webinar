"use server";

import { revalidatePath } from "next/cache";
import { runAction, runMutation, type ActionResult } from "@/features/admin/action-result";
import { faqFormSchema, type FaqFormValues } from "./schema";
import { createFaq, updateFaq, deleteFaq, setFaqActive } from "./queries";

function revalidate() {
  revalidatePath("/admin/faqs");
  revalidatePath("/");
}

export async function createFaqAction(values: FaqFormValues): Promise<ActionResult> {
  return runAction(faqFormSchema, values, "Creating the FAQ", async (parsed) => {
    await createFaq(parsed);
    revalidate();
    return { redirectTo: "/admin/faqs" };
  });
}

export async function updateFaqAction(
  id: string,
  values: FaqFormValues
): Promise<ActionResult> {
  return runAction(faqFormSchema, values, "Saving the FAQ", async (parsed) => {
    await updateFaq(id, parsed);
    revalidate();
    return { redirectTo: "/admin/faqs" };
  });
}

export async function deleteFaqAction(id: string): Promise<ActionResult> {
  return runMutation("Deleting the FAQ", async () => {
    await deleteFaq(id);
    revalidate();
  });
}

export async function setFaqActiveAction(
  id: string,
  isActive: boolean
): Promise<ActionResult> {
  return runMutation("Updating the FAQ", async () => {
    await setFaqActive(id, isActive);
    revalidate();
  });
}
