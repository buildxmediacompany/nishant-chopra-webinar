import { listTestimonials } from "@/features/admin/testimonials/queries";
import {
  deleteTestimonialAction,
  setTestimonialActiveAction,
} from "@/features/admin/testimonials/actions";
import { SimpleResourceList } from "@/features/admin/components/simple-resource-list";

export default async function TestimonialsPage() {
  const items = await listTestimonials();

  return (
    <SimpleResourceList
      title="Testimonials"
      description='Quote cards shown in "Hear From Our Students".'
      newHref="/admin/testimonials/new"
      items={items}
      renderPrimary={(t) => `${t.name}${t.location ? ` · ${t.location}` : ""}`}
      renderSecondary={(t) => t.quote}
      editHref={(t) => `/admin/testimonials/${t.id}`}
      toggleActiveActionFor={(t) => setTestimonialActiveAction.bind(null, t.id)}
      deleteActionFor={(t) => deleteTestimonialAction.bind(null, t.id)}
    />
  );
}
