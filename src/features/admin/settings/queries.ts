import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import type { SettingsFormValues } from "./schema";

export async function getSiteSettings() {
  const [row] = await db.select().from(siteSettings).where(eq(siteSettings.id, 1)).limit(1);
  return row ?? null;
}

/**
 * Plain update, not an upsert — consistent with the project's
 * create/update-are-separate convention. `npm run db:seed` creates the
 * one settings row (id=1) up front, so this can assume it exists.
 */
export async function updateSiteSettings(values: SettingsFormValues) {
  await db.update(siteSettings).set(values).where(eq(siteSettings.id, 1));
}
