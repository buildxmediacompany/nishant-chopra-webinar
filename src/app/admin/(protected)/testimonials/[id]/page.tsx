import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/features/admin/components/page-header";
import { getTestimonialById } from "@/features/admin/testimonials/queries";
import { updateTestimonialAction } from "@/features/admin/testimonials/actions";
import { TestimonialForm } from "@/features/admin/testimonials/testimonial-form";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await getTestimonialById(id);
  if (!testimonial) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Edit review"
        description={testimonial.name}
        backHref="/admin/testimonials"
        backLabel="Back to testimonials"
      />
      <TestimonialForm
        testimonial={testimonial}
        onSubmit={updateTestimonialAction.bind(null, id)}
      />
    </div>
  );
}
