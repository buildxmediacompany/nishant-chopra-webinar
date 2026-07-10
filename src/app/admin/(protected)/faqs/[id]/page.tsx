import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/features/admin/components/page-header";
import { getFaqById } from "@/features/admin/faqs/queries";
import { updateFaqAction } from "@/features/admin/faqs/actions";
import { FaqForm } from "@/features/admin/faqs/faq-form";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = await getFaqById(id);
  if (!faq) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Edit FAQ"
        description={faq.question}
        backHref="/admin/faqs"
        backLabel="Back to FAQs"
      />
      <FaqForm faq={faq} onSubmit={updateFaqAction.bind(null, id)} />
    </div>
  );
}
