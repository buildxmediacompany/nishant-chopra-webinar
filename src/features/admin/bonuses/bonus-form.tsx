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
import { bonusFormSchema, type BonusFormValues } from "./schema";
import type { bonuses } from "@/db/schema";

type Bonus = typeof bonuses.$inferSelect;

export function BonusForm({
  bonus,
  onSubmit,
}: {
  bonus?: Bonus | null;
  onSubmit: (values: BonusFormValues) => Promise<ActionResult>;
}) {
  const form = useForm<BonusFormValues>({
    resolver: zodResolver(bonusFormSchema),
    defaultValues: {
      title: bonus?.title ?? "",
      valuePaise: String(bonus?.valuePaise ?? 0),
      description: bonus?.description ?? "",
      iconName: bonus?.iconName ?? "Gift",
      order: String(bonus?.order ?? 0),
    },
  });

  return (
    <AdminForm
      form={form}
      action={onSubmit}
      backHref="/admin/bonuses"
      submitLabel={bonus ? "Save changes" : "Create bonus"}
      successMessage={bonus ? "Bonus saved" : "Bonus created"}
    >
      <FormSection title="Content" description="What this bonus is and what it's worth.">
        <InputFormField control={form.control} name="title" label="Title" required />
        <TextareaFormField control={form.control} name="description" label="Description" />
        <InputFormField
          control={form.control}
          name="valuePaise"
          label="Value (paise)"
          type="number"
          required
          description="₹1 = 100 paise"
        />
      </FormSection>

      <FormSection title="Display" columns={2} description="How it appears in the bonus stack.">
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
