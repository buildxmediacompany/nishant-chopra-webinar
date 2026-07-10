"use server";

import { revalidatePath } from "next/cache";
import { runAction, runMutation, type ActionResult } from "@/features/admin/action-result";
import { testimonialFormSchema, type TestimonialFormValues } from "./schema";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  setTestimonialActive,
} from "./queries";

function revalidate() {
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function createTestimonialAction(
  values: TestimonialFormValues
): Promise<ActionResult> {
  return runAction(testimonialFormSchema, values, "Creating the review", async (parsed) => {
    await createTestimonial(parsed);
    revalidate();
    return { redirectTo: "/admin/testimonials" };
  });
}

export async function updateTestimonialAction(
  id: string,
  values: TestimonialFormValues
): Promise<ActionResult> {
  return runAction(testimonialFormSchema, values, "Saving the review", async (parsed) => {
    await updateTestimonial(id, parsed);
    revalidate();
    return { redirectTo: "/admin/testimonials" };
  });
}

export async function deleteTestimonialAction(id: string): Promise<ActionResult> {
  return runMutation("Deleting the review", async () => {
    await deleteTestimonial(id);
    revalidate();
  });
}

export async function setTestimonialActiveAction(
  id: string,
  isActive: boolean
): Promise<ActionResult> {
  return runMutation("Updating the review", async () => {
    await setTestimonialActive(id, isActive);
    revalidate();
  });
}
