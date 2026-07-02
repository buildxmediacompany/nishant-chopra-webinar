import { TestimonialForm } from "@/features/admin/testimonials/testimonial-form";
import { createTestimonialAction } from "@/features/admin/testimonials/actions";

export default function NewTestimonialPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-cream">New testimonial</h1>
      <div className="mt-8">
        <TestimonialForm onSubmit={createTestimonialAction} />
      </div>
    </div>
  );
}
