"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminForm } from "@/features/admin/components/form-shell";
import { FormSection } from "@/features/admin/components/form-section";
import { InputFormField, TextareaFormField } from "@/features/admin/components/form-fields";
import type { ActionResult } from "@/features/admin/action-result";
import { testimonialFormSchema, type TestimonialFormValues } from "./schema";
import type { testimonials } from "@/db/schema";

type Testimonial = typeof testimonials.$inferSelect;

export function TestimonialForm({
  testimonial,
  onSubmit,
}: {
  testimonial?: Testimonial | null;
  onSubmit: (values: TestimonialFormValues) => Promise<ActionResult>;
}) {
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      name: testimonial?.name ?? "",
      location: testimonial?.location ?? "",
      quote: testimonial?.quote ?? "",
      rating: String(testimonial?.rating ?? 5),
      avatarUrl: testimonial?.avatarUrl ?? "",
      videoUrl: testimonial?.videoUrl ?? "",
      order: String(testimonial?.order ?? 0),
    },
  });

  return (
    <AdminForm
      form={form}
      action={onSubmit}
      backHref="/admin/testimonials"
      submitLabel={testimonial ? "Save changes" : "Create review"}
      successMessage={testimonial ? "Review saved" : "Review created"}
    >
      <FormSection title="Student" columns={2} description="Who left this review.">
        <InputFormField control={form.control} name="name" label="Name" required />
        <InputFormField control={form.control} name="location" label="Location" />
        <InputFormField control={form.control} name="avatarUrl" label="Avatar URL" full />
      </FormSection>

      <FormSection title="Review" description="Text review, or a video that replaces it.">
        <TextareaFormField control={form.control} name="quote" label="Quote" required />
        <InputFormField
          control={form.control}
          name="videoUrl"
          label="Video review URL"
          placeholder="https://youtu.be/… (Unlisted)"
          description="Paste an Unlisted YouTube link to show this review as a video instead of text."
        />
        <InputFormField
          control={form.control}
          name="rating"
          label="Rating (1–5)"
          type="number"
          required
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
