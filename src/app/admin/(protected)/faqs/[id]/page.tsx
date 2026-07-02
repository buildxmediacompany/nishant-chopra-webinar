import { notFound } from "next/navigation";
import { getFaqById } from "@/features/admin/faqs/queries";
import { updateFaqAction } from "@/features/admin/faqs/actions";
import { FaqForm } from "@/features/admin/faqs/faq-form";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = await getFaqById(id);
  if (!faq) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-cream">Edit FAQ</h1>
      <div className="mt-8">
        <FaqForm faq={faq} onSubmit={updateFaqAction.bind(null, id)} />
      </div>
    </div>
  );
}
