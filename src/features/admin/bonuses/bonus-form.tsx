"use client";

import { useState } from "react";
import { unstable_rethrow } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  InputFormField,
  TextareaFormField,
  SelectFormField,
} from "@/features/admin/components/form-fields";
import { ICON_OPTIONS } from "@/features/webinar/components/icon-map";
import { bonusFormSchema, type BonusFormValues } from "./schema";
import type { bonuses } from "@/db/schema";

type Bonus = typeof bonuses.$inferSelect;

export function BonusForm({
  bonus,
  onSubmit,
}: {
  bonus?: Bonus | null;
  onSubmit: (values: BonusFormValues) => Promise<void>;
}) {
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  async function handleSubmit(values: BonusFormValues) {
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
        <InputFormField control={form.control} name="title" label="Title" required />
        <TextareaFormField control={form.control} name="description" label="Description" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <InputFormField
            control={form.control}
            name="valuePaise"
            label="Value (paise)"
            type="number"
            required
            description="₹1 = 100 paise"
          />
          <SelectFormField control={form.control} name="iconName" label="Icon" required options={ICON_OPTIONS} />
          <InputFormField control={form.control} name="order" label="Display order" type="number" required />
        </div>
        <div className="flex justify-end border-t border-stage-line pt-6">
          <Button type="submit" variant="gold" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving…" : bonus ? "Save changes" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
