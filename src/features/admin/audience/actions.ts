"use server";

import { revalidatePath } from "next/cache";
import { runAction, runMutation, type ActionResult } from "@/features/admin/action-result";
import { audienceFormSchema, type AudienceFormValues } from "./schema";
import {
  createAudienceSegment,
  updateAudienceSegment,
  deleteAudienceSegment,
  setAudienceSegmentActive,
} from "./queries";

function revalidate() {
  revalidatePath("/admin/audience");
  revalidatePath("/");
}

export async function createAudienceSegmentAction(
  values: AudienceFormValues
): Promise<ActionResult> {
  return runAction(audienceFormSchema, values, "Creating the segment", async (parsed) => {
    await createAudienceSegment(parsed);
    revalidate();
    return { redirectTo: "/admin/audience" };
  });
}

export async function updateAudienceSegmentAction(
  id: string,
  values: AudienceFormValues
): Promise<ActionResult> {
  return runAction(audienceFormSchema, values, "Saving the segment", async (parsed) => {
    await updateAudienceSegment(id, parsed);
    revalidate();
    return { redirectTo: "/admin/audience" };
  });
}

export async function deleteAudienceSegmentAction(id: string): Promise<ActionResult> {
  return runMutation("Deleting the segment", async () => {
    await deleteAudienceSegment(id);
    revalidate();
  });
}

export async function setAudienceSegmentActiveAction(
  id: string,
  isActive: boolean
): Promise<ActionResult> {
  return runMutation("Updating the segment", async () => {
    await setAudienceSegmentActive(id, isActive);
    revalidate();
  });
}
