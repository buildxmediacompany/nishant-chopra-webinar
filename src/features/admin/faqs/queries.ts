import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { faqs } from "@/db/schema";
import type { FaqFormValues } from "./schema";

export async function listFaqs() {
  return db.select().from(faqs).orderBy(asc(faqs.order));
}

export async function getFaqById(id: string) {
  const [row] = await db.select().from(faqs).where(eq(faqs.id, id)).limit(1);
  return row ?? null;
}

function toDbValues(values: FaqFormValues) {
  return { ...values, order: Number(values.order) };
}

export async function createFaq(values: FaqFormValues) {
  const [created] = await db.insert(faqs).values(toDbValues(values)).returning({ id: faqs.id });
  return created;
}

export async function updateFaq(id: string, values: FaqFormValues) {
  await db.update(faqs).set(toDbValues(values)).where(eq(faqs.id, id));
}

export async function deleteFaq(id: string) {
  await db.delete(faqs).where(eq(faqs.id, id));
}

export async function setFaqActive(id: string, isActive: boolean) {
  await db.update(faqs).set({ isActive }).where(eq(faqs.id, id));
}
