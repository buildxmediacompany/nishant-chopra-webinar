import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import type { TestimonialFormValues } from "./schema";

export async function listTestimonials() {
  return db.select().from(testimonials).orderBy(asc(testimonials.order));
}

export async function getTestimonialById(id: string) {
  const [row] = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
  return row ?? null;
}

/** Empty optional inputs are stored as NULL, so `videoUrl` stays falsy. */
const nullIfBlank = (v: string | undefined) => (v && v.trim() !== "" ? v.trim() : null);

function toDbValues(values: TestimonialFormValues) {
  return {
    ...values,
    rating: Number(values.rating),
    order: Number(values.order),
    location: nullIfBlank(values.location),
    avatarUrl: nullIfBlank(values.avatarUrl),
    videoUrl: nullIfBlank(values.videoUrl),
  };
}

export async function createTestimonial(values: TestimonialFormValues) {
  const [created] = await db
    .insert(testimonials)
    .values(toDbValues(values))
    .returning({ id: testimonials.id });
  return created;
}

export async function updateTestimonial(id: string, values: TestimonialFormValues) {
  await db.update(testimonials).set(toDbValues(values)).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id: string) {
  await db.delete(testimonials).where(eq(testimonials.id, id));
}

export async function setTestimonialActive(id: string, isActive: boolean) {
  await db.update(testimonials).set({ isActive }).where(eq(testimonials.id, id));
}
