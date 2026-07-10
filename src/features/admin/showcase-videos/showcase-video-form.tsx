"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminForm } from "@/features/admin/components/form-shell";
import { FormSection } from "@/features/admin/components/form-section";
import { InputFormField } from "@/features/admin/components/form-fields";
import type { ActionResult } from "@/features/admin/action-result";
import { showcaseVideoFormSchema, type ShowcaseVideoFormValues } from "./schema";
import type { showcaseVideos } from "@/db/schema";

type ShowcaseVideo = typeof showcaseVideos.$inferSelect;

export function ShowcaseVideoForm({
  video,
  onSubmit,
}: {
  video?: ShowcaseVideo | null;
  onSubmit: (values: ShowcaseVideoFormValues) => Promise<ActionResult>;
}) {
  const form = useForm<ShowcaseVideoFormValues>({
    resolver: zodResolver(showcaseVideoFormSchema),
    defaultValues: {
      title: video?.title ?? "",
      videoUrl: video?.videoUrl ?? "",
      thumbnailUrl: video?.thumbnailUrl ?? "",
      order: String(video?.order ?? 0),
    },
  });

  return (
    <AdminForm
      form={form}
      action={onSubmit}
      backHref="/admin/showcase-videos"
      submitLabel={video ? "Save changes" : "Create video"}
      successMessage={video ? "Video saved" : "Video created"}
    >
      <FormSection title="Video" description="The performance visitors watch.">
        <InputFormField control={form.control} name="title" label="Title" required />
        <InputFormField
          control={form.control}
          name="videoUrl"
          label="Video URL"
          placeholder="https://youtu.be/… or https://vimeo.com/…"
          description="YouTube (watch, youtu.be, Shorts) and Vimeo links all work, including Unlisted ones."
          required
        />
      </FormSection>

      <FormSection title="Display" columns={2} description="How it appears in the video wall.">
        <InputFormField
          control={form.control}
          name="thumbnailUrl"
          label="Custom thumbnail URL"
          description="Defaults to the YouTube poster frame. Required for Vimeo, which has none."
        />
        <InputFormField
          control={form.control}
          name="order"
          label="Display order"
          type="number"
          required
          description="Lower numbers appear first."
        />
      </FormSection>
    </AdminForm>
  );
}
