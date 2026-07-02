"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { faqFormSchema, type FaqFormValues } from "./schema";
import { createFaq, updateFaq, deleteFaq, setFaqActive } from "./queries";

export async function createFaqAction(values: FaqFormValues) {
  const parsed = faqFormSchema.parse(values);
  await createFaq(parsed);
  revalidatePath("/admin/faqs");
  revalidatePath("/");
  redirect("/admin/faqs");
}

export async function updateFaqAction(id: string, values: FaqFormValues) {
  const parsed = faqFormSchema.parse(values);
  await updateFaq(id, parsed);
  revalidatePath("/admin/faqs");
  revalidatePath("/");
  redirect("/admin/faqs");
}

export async function deleteFaqAction(id: string) {
  "use server";
  await deleteFaq(id);
  revalidatePath("/admin/faqs");
  revalidatePath("/");
}

export async function setFaqActiveAction(id: string, isActive: boolean) {
  "use server";
  await setFaqActive(id, isActive);
  revalidatePath("/admin/faqs");
  revalidatePath("/");
}
