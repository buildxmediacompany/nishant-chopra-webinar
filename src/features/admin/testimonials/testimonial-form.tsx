"use client";

import { useState } from "react";
import { unstable_rethrow } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputFormField, TextareaFormField } from "@/features/admin/components/form-fields";
import { testimonialFormSchema, type TestimonialFormValues } from "./schema";
import type { testimonials } from "@/db/schema";

type Testimonial = typeof testimonials.$inferSelect;

export function TestimonialForm({
  testimonial,
  onSubmit,
}: {
  testimonial?: Testimonial | null;
  onSubmit: (values: TestimonialFormValues) => Promise<void>;
}) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      name: testimonial?.name ?? "",
      location: testimonial?.location ?? "",
      quote: testimonial?.quote ?? "",
      rating: String(testimonial?.rating ?? 5),
      avatarUrl: testimonial?.avatarUrl ?? "",
      order: String(testimonial?.order ?? 0),
    },
  });

  async function handleSubmit(values: TestimonialFormValues) {
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputFormField control={form.control} name="name" label="Name" required />
          <InputFormField control={form.control} name="location" label="Location" />
        </div>
        <TextareaFormField control={form.control} name="quote" label="Quote" required />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <InputFormField control={form.control} name="rating" label="Rating (1–5)" type="number" required />
          <InputFormField control={form.control} name="avatarUrl" label="Avatar URL" />
          <InputFormField control={form.control} name="order" label="Display order" type="number" required />
        </div>
        <div className="flex justify-end border-t border-stage-line pt-6">
          <Button type="submit" variant="gold" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving…" : testimonial ? "Save changes" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
