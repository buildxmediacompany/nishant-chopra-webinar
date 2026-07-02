"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { testimonialFormSchema, type TestimonialFormValues } from "./schema";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  setTestimonialActive,
} from "./queries";

export async function createTestimonialAction(values: TestimonialFormValues) {
  const parsed = testimonialFormSchema.parse(values);
  await createTestimonial(parsed);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonialAction(id: string, values: TestimonialFormValues) {
  const parsed = testimonialFormSchema.parse(values);
  await updateTestimonial(id, parsed);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonialAction(id: string) {
  "use server";
  await deleteTestimonial(id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function setTestimonialActiveAction(id: string, isActive: boolean) {
  "use server";
  await setTestimonialActive(id, isActive);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
