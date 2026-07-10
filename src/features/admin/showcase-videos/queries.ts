import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { showcaseVideos } from "@/db/schema";
import type { ShowcaseVideoFormValues } from "./schema";

export async function listShowcaseVideos() {
  return db.select().from(showcaseVideos).orderBy(asc(showcaseVideos.order));
}

export async function getShowcaseVideoById(id: string) {
  const [row] = await db
    .select()
    .from(showcaseVideos)
    .where(eq(showcaseVideos.id, id))
    .limit(1);
  return row ?? null;
}

const nullIfBlank = (v: string | undefined) => (v && v.trim() !== "" ? v.trim() : null);

function toDbValues(values: ShowcaseVideoFormValues) {
  return {
    ...values,
    order: Number(values.order),
    thumbnailUrl: nullIfBlank(values.thumbnailUrl),
  };
}

export async function createShowcaseVideo(values: ShowcaseVideoFormValues) {
  const [created] = await db
    .insert(showcaseVideos)
    .values(toDbValues(values))
    .returning({ id: showcaseVideos.id });
  return created;
}

export async function updateShowcaseVideo(id: string, values: ShowcaseVideoFormValues) {
  await db.update(showcaseVideos).set(toDbValues(values)).where(eq(showcaseVideos.id, id));
}

export async function deleteShowcaseVideo(id: string) {
  await db.delete(showcaseVideos).where(eq(showcaseVideos.id, id));
}

export async function setShowcaseVideoActive(id: string, isActive: boolean) {
  await db.update(showcaseVideos).set({ isActive }).where(eq(showcaseVideos.id, id));
}
