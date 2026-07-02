import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { testimonialScreenshots } from "@/db/schema";
import type { ScreenshotFormValues } from "./schema";

export async function listScreenshots() {
  return db.select().from(testimonialScreenshots).orderBy(asc(testimonialScreenshots.order));
}

export async function getScreenshotById(id: string) {
  const [row] = await db
    .select()
    .from(testimonialScreenshots)
    .where(eq(testimonialScreenshots.id, id))
    .limit(1);
  return row ?? null;
}

function toDbValues(values: ScreenshotFormValues) {
  return { ...values, order: Number(values.order) };
}

export async function createScreenshot(values: ScreenshotFormValues) {
  const [created] = await db
    .insert(testimonialScreenshots)
    .values(toDbValues(values))
    .returning({ id: testimonialScreenshots.id });
  return created;
}

export async function updateScreenshot(id: string, values: ScreenshotFormValues) {
  await db
    .update(testimonialScreenshots)
    .set(toDbValues(values))
    .where(eq(testimonialScreenshots.id, id));
}

export async function deleteScreenshot(id: string) {
  await db.delete(testimonialScreenshots).where(eq(testimonialScreenshots.id, id));
}

export async function setScreenshotActive(id: string, isActive: boolean) {
  await db.update(testimonialScreenshots).set({ isActive }).where(eq(testimonialScreenshots.id, id));
}
