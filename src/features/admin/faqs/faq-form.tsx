"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminForm } from "@/features/admin/components/form-shell";
import { FormSection } from "@/features/admin/components/form-section";
import { InputFormField, TextareaFormField } from "@/features/admin/components/form-fields";
import type { ActionResult } from "@/features/admin/action-result";
import { faqFormSchema, type FaqFormValues } from "./schema";
import type { faqs } from "@/db/schema";

type Faq = typeof faqs.$inferSelect;

export function FaqForm({
  faq,
  onSubmit,
}: {
  faq?: Faq | null;
  onSubmit: (values: FaqFormValues) => Promise<ActionResult>;
}) {
  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: {
      question: faq?.question ?? "",
      answer: faq?.answer ?? "",
      order: String(faq?.order ?? 0),
    },
  });

  return (
    <AdminForm
      form={form}
      action={onSubmit}
      backHref="/admin/faqs"
      submitLabel={faq ? "Save changes" : "Create FAQ"}
      successMessage={faq ? "FAQ saved" : "FAQ created"}
    >
      <FormSection title="Content" description="What visitors read in the accordion.">
        <InputFormField control={form.control} name="question" label="Question" required />
        <TextareaFormField control={form.control} name="answer" label="Answer" required />
      </FormSection>

      <FormSection title="Display" description="Where this sits among the other questions.">
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
