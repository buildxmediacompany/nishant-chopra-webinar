"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { featureFormSchema, type FeatureFormValues } from "./schema";
import { createFeature, updateFeature, deleteFeature, setFeatureActive } from "./queries";

export async function createFeatureAction(values: FeatureFormValues) {
  const parsed = featureFormSchema.parse(values);
  await createFeature(parsed);
  revalidatePath("/admin/features");
  revalidatePath("/");
  redirect("/admin/features");
}

export async function updateFeatureAction(id: string, values: FeatureFormValues) {
  const parsed = featureFormSchema.parse(values);
  await updateFeature(id, parsed);
  revalidatePath("/admin/features");
  revalidatePath("/");
  redirect("/admin/features");
}

export async function deleteFeatureAction(id: string) {
  "use server";
  await deleteFeature(id);
  revalidatePath("/admin/features");
  revalidatePath("/");
}

export async function setFeatureActiveAction(id: string, isActive: boolean) {
  "use server";
  await setFeatureActive(id, isActive);
  revalidatePath("/admin/features");
  revalidatePath("/");
}
