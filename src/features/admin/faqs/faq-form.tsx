"use client";

import { useState } from "react";
import { unstable_rethrow } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputFormField, TextareaFormField } from "@/features/admin/components/form-fields";
import { faqFormSchema, type FaqFormValues } from "./schema";
import type { faqs } from "@/db/schema";

type Faq = typeof faqs.$inferSelect;

export function FaqForm({
  faq,
  onSubmit,
}: {
  faq?: Faq | null;
  onSubmit: (values: FaqFormValues) => Promise<void>;
}) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: {
      question: faq?.question ?? "",
      answer: faq?.answer ?? "",
      order: String(faq?.order ?? 0),
    },
  });

  async function handleSubmit(values: FaqFormValues) {
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
        <InputFormField control={form.control} name="question" label="Question" required />
        <TextareaFormField control={form.control} name="answer" label="Answer" required />
        <InputFormField control={form.control} name="order" label="Display order" type="number" required />
        <div className="flex justify-end border-t border-stage-line pt-6">
          <Button type="submit" variant="gold" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving…" : faq ? "Save changes" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
