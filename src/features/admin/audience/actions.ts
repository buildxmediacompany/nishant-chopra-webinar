"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { audienceFormSchema, type AudienceFormValues } from "./schema";
import {
  createAudienceSegment,
  updateAudienceSegment,
  deleteAudienceSegment,
  setAudienceSegmentActive,
} from "./queries";

export async function createAudienceSegmentAction(values: AudienceFormValues) {
  const parsed = audienceFormSchema.parse(values);
  await createAudienceSegment(parsed);
  revalidatePath("/admin/audience");
  revalidatePath("/");
  redirect("/admin/audience");
}

export async function updateAudienceSegmentAction(id: string, values: AudienceFormValues) {
  const parsed = audienceFormSchema.parse(values);
  await updateAudienceSegment(id, parsed);
  revalidatePath("/admin/audience");
  revalidatePath("/");
  redirect("/admin/audience");
}

export async function deleteAudienceSegmentAction(id: string) {
  "use server";
  await deleteAudienceSegment(id);
  revalidatePath("/admin/audience");
  revalidatePath("/");
}

export async function setAudienceSegmentActiveAction(id: string, isActive: boolean) {
  "use server";
  await setAudienceSegmentActive(id, isActive);
  revalidatePath("/admin/audience");
  revalidatePath("/");
}
