"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminForm } from "@/features/admin/components/form-shell";
import { FormSection } from "@/features/admin/components/form-section";
import {
  InputFormField,
  TextareaFormField,
  SelectFormField,
} from "@/features/admin/components/form-fields";
import { ICON_OPTIONS } from "@/features/webinar/components/icon-map";
import type { ActionResult } from "@/features/admin/action-result";
import { featureFormSchema, type FeatureFormValues } from "./schema";
import type { featureHighlights } from "@/db/schema";

type Feature = typeof featureHighlights.$inferSelect;

export function FeatureForm({
  feature,
  onSubmit,
}: {
  feature?: Feature | null;
  onSubmit: (values: FeatureFormValues) => Promise<ActionResult>;
}) {
  const form = useForm<FeatureFormValues>({
    resolver: zodResolver(featureFormSchema),
    defaultValues: {
      title: feature?.title ?? "",
      description: feature?.description ?? "",
      iconName: feature?.iconName ?? "Sparkles",
      order: String(feature?.order ?? 0),
    },
  });

  return (
    <AdminForm
      form={form}
      action={onSubmit}
      backHref="/admin/features"
      submitLabel={feature ? "Save changes" : "Create highlight"}
      successMessage={feature ? "Highlight saved" : "Highlight created"}
    >
      <FormSection title="Content" description="One reason the masterclass works.">
        <InputFormField control={form.control} name="title" label="Title" required />
        <TextareaFormField
          control={form.control}
          name="description"
          label="Description"
          required
        />
      </FormSection>

      <FormSection title="Display" columns={2} description="How it appears in the grid.">
        <SelectFormField
          control={form.control}
          name="iconName"
          label="Icon"
          required
          options={ICON_OPTIONS}
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
