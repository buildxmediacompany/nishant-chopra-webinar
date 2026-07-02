import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { audienceSegments } from "@/db/schema";
import type { AudienceFormValues } from "./schema";

export async function listAudienceSegments() {
  return db.select().from(audienceSegments).orderBy(asc(audienceSegments.order));
}

export async function getAudienceSegmentById(id: string) {
  const [row] = await db
    .select()
    .from(audienceSegments)
    .where(eq(audienceSegments.id, id))
    .limit(1);
  return row ?? null;
}

function toDbValues(values: AudienceFormValues) {
  return { ...values, order: Number(values.order) };
}

export async function createAudienceSegment(values: AudienceFormValues) {
  const [created] = await db
    .insert(audienceSegments)
    .values(toDbValues(values))
    .returning({ id: audienceSegments.id });
  return created;
}

export async function updateAudienceSegment(id: string, values: AudienceFormValues) {
  await db.update(audienceSegments).set(toDbValues(values)).where(eq(audienceSegments.id, id));
}

export async function deleteAudienceSegment(id: string) {
  await db.delete(audienceSegments).where(eq(audienceSegments.id, id));
}

export async function setAudienceSegmentActive(id: string, isActive: boolean) {
  await db.update(audienceSegments).set({ isActive }).where(eq(audienceSegments.id, id));
}
