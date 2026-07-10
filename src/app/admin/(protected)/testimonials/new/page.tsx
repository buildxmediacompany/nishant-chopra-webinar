import { AdminPageHeader } from "@/features/admin/components/page-header";
import { TestimonialForm } from "@/features/admin/testimonials/testimonial-form";
import { createTestimonialAction } from "@/features/admin/testimonials/actions";

export default function NewTestimonialPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="New review"
        backHref="/admin/testimonials"
        backLabel="Back to testimonials"
      />
      <TestimonialForm onSubmit={createTestimonialAction} />
    </div>
  );
}
