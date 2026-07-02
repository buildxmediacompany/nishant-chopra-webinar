import "server-only";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { webinars } from "@/db/schema";
import type { WebinarFormValues } from "./schema";

export async function listWebinars() {
  return db.select().from(webinars).orderBy(desc(webinars.createdAt));
}

export async function getWebinarById(id: string) {
  const [webinar] = await db.select().from(webinars).where(eq(webinars.id, id)).limit(1);
  return webinar ?? null;
}

/** Converts the string-only form values into the DB's actual column types. */
function toDbValues(values: WebinarFormValues) {
  return {
    ...values,
    originalPricePaise: Number(values.originalPricePaise),
    offerPricePaise: Number(values.offerPricePaise),
    seatsLeftCount:
      values.seatsLeftCount && values.seatsLeftCount.length > 0
        ? Number(values.seatsLeftCount)
        : null,
    countdownTargetAt: values.countdownTargetAt ? new Date(values.countdownTargetAt) : null,
  };
}

export async function createWebinar(values: WebinarFormValues) {
  const [created] = await db.insert(webinars).values(toDbValues(values)).returning({
    id: webinars.id,
  });
  return created;
}

export async function updateWebinar(id: string, values: WebinarFormValues) {
  await db
    .update(webinars)
    .set({ ...toDbValues(values), updatedAt: new Date() })
    .where(eq(webinars.id, id));
}

export async function deleteWebinar(id: string) {
  await db.delete(webinars).where(eq(webinars.id, id));
}

/**
 * Neon's HTTP driver doesn't support interactive transactions, so this is
 * two sequential statements rather than an atomic transaction. Fine for a
 * low-traffic, single-operator admin action; switch to the neon-serverless
 * (websocket/Pool) driver first if you ever need this to be atomic.
 */
export async function setActiveWebinar(id: string) {
  await db.update(webinars).set({ isActive: false }).where(eq(webinars.isActive, true));
  await db.update(webinars).set({ isActive: true }).where(eq(webinars.id, id));
}
