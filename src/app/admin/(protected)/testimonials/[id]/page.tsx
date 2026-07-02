import { notFound } from "next/navigation";
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
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-cream">Edit testimonial</h1>
      <div className="mt-8">
        <TestimonialForm testimonial={testimonial} onSubmit={updateTestimonialAction.bind(null, id)} />
      </div>
    </div>
  );
}
