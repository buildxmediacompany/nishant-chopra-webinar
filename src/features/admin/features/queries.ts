import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { featureHighlights } from "@/db/schema";
import type { FeatureFormValues } from "./schema";

export async function listFeatures() {
  return db.select().from(featureHighlights).orderBy(asc(featureHighlights.order));
}

export async function getFeatureById(id: string) {
  const [row] = await db
    .select()
    .from(featureHighlights)
    .where(eq(featureHighlights.id, id))
    .limit(1);
  return row ?? null;
}

function toDbValues(values: FeatureFormValues) {
  return { ...values, order: Number(values.order) };
}

export async function createFeature(values: FeatureFormValues) {
  const [created] = await db
    .insert(featureHighlights)
    .values(toDbValues(values))
    .returning({ id: featureHighlights.id });
  return created;
}

export async function updateFeature(id: string, values: FeatureFormValues) {
  await db.update(featureHighlights).set(toDbValues(values)).where(eq(featureHighlights.id, id));
}

export async function deleteFeature(id: string) {
  await db.delete(featureHighlights).where(eq(featureHighlights.id, id));
}

export async function setFeatureActive(id: string, isActive: boolean) {
  await db.update(featureHighlights).set({ isActive }).where(eq(featureHighlights.id, id));
}
