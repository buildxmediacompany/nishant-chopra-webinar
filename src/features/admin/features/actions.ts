"use server";

import { revalidatePath } from "next/cache";
import { runAction, runMutation, type ActionResult } from "@/features/admin/action-result";
import { featureFormSchema, type FeatureFormValues } from "./schema";
import { createFeature, updateFeature, deleteFeature, setFeatureActive } from "./queries";

function revalidate() {
  revalidatePath("/admin/features");
  revalidatePath("/");
}

export async function createFeatureAction(
  values: FeatureFormValues
): Promise<ActionResult> {
  return runAction(featureFormSchema, values, "Creating the highlight", async (parsed) => {
    await createFeature(parsed);
    revalidate();
    return { redirectTo: "/admin/features" };
  });
}

export async function updateFeatureAction(
  id: string,
  values: FeatureFormValues
): Promise<ActionResult> {
  return runAction(featureFormSchema, values, "Saving the highlight", async (parsed) => {
    await updateFeature(id, parsed);
    revalidate();
    return { redirectTo: "/admin/features" };
  });
}

export async function deleteFeatureAction(id: string): Promise<ActionResult> {
  return runMutation("Deleting the highlight", async () => {
    await deleteFeature(id);
    revalidate();
  });
}

export async function setFeatureActiveAction(
  id: string,
  isActive: boolean
): Promise<ActionResult> {
  return runMutation("Updating the highlight", async () => {
    await setFeatureActive(id, isActive);
    revalidate();
  });
}
