"use client";

import { useState } from "react";
import { unstable_rethrow } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputFormField } from "@/features/admin/components/form-fields";
import { screenshotFormSchema, type ScreenshotFormValues } from "./schema";
import type { testimonialScreenshots } from "@/db/schema";

type Screenshot = typeof testimonialScreenshots.$inferSelect;

export function ScreenshotForm({
  screenshot,
  onSubmit,
}: {
  screenshot?: Screenshot | null;
  onSubmit: (values: ScreenshotFormValues) => Promise<void>;
}) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ScreenshotFormValues>({
    resolver: zodResolver(screenshotFormSchema),
    defaultValues: {
      imageUrl: screenshot?.imageUrl ?? "",
      altText: screenshot?.altText ?? "Student review screenshot",
      order: String(screenshot?.order ?? 0),
    },
  });

  const imageUrl = form.watch("imageUrl");

  async function handleSubmit(values: ScreenshotFormValues) {
    setSubmitError(null);
    try {
      await onSubmit(values);
    } catch (err) {
      unstable_rethrow(err);
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        {submitError && (
          <p className="rounded-lg border border-sindoor/40 bg-sindoor-dim px-4 py-3 text-sm text-sindoor">
            {submitError}
          </p>
        )}
        <InputFormField
          control={form.control}
          name="imageUrl"
          label="Image URL"
          required
          description="Upload your screenshot to your own storage (S3/GCS/Cloudinary/etc) and paste the link here"
        />
        {imageUrl && (
          <div className="relative aspect-[5/4] w-full max-w-xs overflow-hidden rounded-lg border border-stage-line">
            {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary admin-provided URL, not worth remotePatterns config for a preview */}
            <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
          </div>
        )}
        <InputFormField control={form.control} name="altText" label="Alt text" required />
        <InputFormField control={form.control} name="order" label="Display order" type="number" required />
        <div className="flex justify-end border-t border-stage-line pt-6">
          <Button type="submit" variant="gold" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving…" : screenshot ? "Save changes" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
