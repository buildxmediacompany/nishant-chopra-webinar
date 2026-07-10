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
import { audienceFormSchema, type AudienceFormValues } from "./schema";
import type { audienceSegments } from "@/db/schema";

type AudienceSegment = typeof audienceSegments.$inferSelect;

export function AudienceForm({
  segment,
  onSubmit,
}: {
  segment?: AudienceSegment | null;
  onSubmit: (values: AudienceFormValues) => Promise<ActionResult>;
}) {
  const form = useForm<AudienceFormValues>({
    resolver: zodResolver(audienceFormSchema),
    defaultValues: {
      title: segment?.title ?? "",
      description: segment?.description ?? "",
      iconName: segment?.iconName ?? "Mic",
      order: String(segment?.order ?? 0),
    },
  });

  return (
    <AdminForm
      form={form}
      action={onSubmit}
      backHref="/admin/audience"
      submitLabel={segment ? "Save changes" : "Create segment"}
      successMessage={segment ? "Segment saved" : "Segment created"}
    >
      <FormSection title="Content" description="One kind of person this masterclass is for.">
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
