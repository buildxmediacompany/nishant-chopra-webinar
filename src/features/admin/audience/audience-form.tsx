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
import { audienceFormSchema, type AudienceFormValues } from "./schema";
import type { audienceSegments } from "@/db/schema";

type AudienceSegment = typeof audienceSegments.$inferSelect;

export function AudienceForm({
  segment,
  onSubmit,
}: {
  segment?: AudienceSegment | null;
  onSubmit: (values: AudienceFormValues) => Promise<void>;
}) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<AudienceFormValues>({
    resolver: zodResolver(audienceFormSchema),
    defaultValues: {
      title: segment?.title ?? "",
      description: segment?.description ?? "",
      iconName: segment?.iconName ?? "Mic",
      order: String(segment?.order ?? 0),
    },
  });

  async function handleSubmit(values: AudienceFormValues) {
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
        <TextareaFormField control={form.control} name="description" label="Description" required />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectFormField control={form.control} name="iconName" label="Icon" required options={ICON_OPTIONS} />
          <InputFormField control={form.control} name="order" label="Display order" type="number" required />
        </div>
        <div className="flex justify-end border-t border-stage-line pt-6">
          <Button type="submit" variant="gold" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving…" : segment ? "Save changes" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
