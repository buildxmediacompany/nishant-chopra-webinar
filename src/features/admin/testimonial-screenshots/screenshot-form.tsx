"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminForm } from "@/features/admin/components/form-shell";
import { FormSection } from "@/features/admin/components/form-section";
import { InputFormField } from "@/features/admin/components/form-fields";
import type { ActionResult } from "@/features/admin/action-result";
import { screenshotFormSchema, type ScreenshotFormValues } from "./schema";
import type { testimonialScreenshots } from "@/db/schema";

type Screenshot = typeof testimonialScreenshots.$inferSelect;

export function ScreenshotForm({
  screenshot,
  onSubmit,
}: {
  screenshot?: Screenshot | null;
  onSubmit: (values: ScreenshotFormValues) => Promise<ActionResult>;
}) {
  const form = useForm<ScreenshotFormValues>({
    resolver: zodResolver(screenshotFormSchema),
    defaultValues: {
      imageUrl: screenshot?.imageUrl ?? "",
      altText: screenshot?.altText ?? "Student review screenshot",
      order: String(screenshot?.order ?? 0),
    },
  });

  const imageUrl = form.watch("imageUrl");

  return (
    <AdminForm
      form={form}
      action={onSubmit}
      backHref="/admin/testimonial-screenshots"
      submitLabel={screenshot ? "Save changes" : "Create screenshot"}
      successMessage={screenshot ? "Screenshot saved" : "Screenshot created"}
    >
      <FormSection
        title="Image"
        description="Upload the screenshot to your own storage (S3, GCS, Cloudinary) and paste the link."
      >
        <InputFormField control={form.control} name="imageUrl" label="Image URL" required />
        {imageUrl && (
          <div className="col-span-full">
            <div className="relative aspect-[5/4] w-full max-w-xs overflow-hidden rounded-lg border border-stage-line">
              {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary admin-provided URL, not worth remotePatterns config for a preview */}
              <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
            </div>
          </div>
        )}
        <InputFormField
          control={form.control}
          name="altText"
          label="Alt text"
          required
          description="Describes the screenshot for screen readers."
        />
      </FormSection>

      <FormSection title="Display">
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
