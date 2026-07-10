"use server";

import { revalidatePath } from "next/cache";
import { runAction, runMutation, type ActionResult } from "@/features/admin/action-result";
import { showcaseVideoFormSchema, type ShowcaseVideoFormValues } from "./schema";
import {
  createShowcaseVideo,
  updateShowcaseVideo,
  deleteShowcaseVideo,
  setShowcaseVideoActive,
} from "./queries";

function revalidate() {
  revalidatePath("/admin/showcase-videos");
  revalidatePath("/");
}

export async function createShowcaseVideoAction(
  values: ShowcaseVideoFormValues
): Promise<ActionResult> {
  return runAction(showcaseVideoFormSchema, values, "Creating the video", async (parsed) => {
    await createShowcaseVideo(parsed);
    revalidate();
    return { redirectTo: "/admin/showcase-videos" };
  });
}

export async function updateShowcaseVideoAction(
  id: string,
  values: ShowcaseVideoFormValues
): Promise<ActionResult> {
  return runAction(showcaseVideoFormSchema, values, "Saving the video", async (parsed) => {
    await updateShowcaseVideo(id, parsed);
    revalidate();
    return { redirectTo: "/admin/showcase-videos" };
  });
}

export async function deleteShowcaseVideoAction(id: string): Promise<ActionResult> {
  return runMutation("Deleting the video", async () => {
    await deleteShowcaseVideo(id);
    revalidate();
  });
}

export async function setShowcaseVideoActiveAction(
  id: string,
  isActive: boolean
): Promise<ActionResult> {
  return runMutation("Updating the video", async () => {
    await setShowcaseVideoActive(id, isActive);
    revalidate();
  });
}
