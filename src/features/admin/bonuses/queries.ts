import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { bonuses } from "@/db/schema";
import type { BonusFormValues } from "./schema";

export async function listBonuses() {
  return db.select().from(bonuses).orderBy(asc(bonuses.order));
}

export async function getBonusById(id: string) {
  const [row] = await db.select().from(bonuses).where(eq(bonuses.id, id)).limit(1);
  return row ?? null;
}

function toDbValues(values: BonusFormValues) {
  return { ...values, valuePaise: Number(values.valuePaise), order: Number(values.order) };
}

export async function createBonus(values: BonusFormValues) {
  const [created] = await db.insert(bonuses).values(toDbValues(values)).returning({ id: bonuses.id });
  return created;
}

export async function updateBonus(id: string, values: BonusFormValues) {
  await db.update(bonuses).set(toDbValues(values)).where(eq(bonuses.id, id));
}

export async function deleteBonus(id: string) {
  await db.delete(bonuses).where(eq(bonuses.id, id));
}

export async function setBonusActive(id: string, isActive: boolean) {
  await db.update(bonuses).set({ isActive }).where(eq(bonuses.id, id));
}
