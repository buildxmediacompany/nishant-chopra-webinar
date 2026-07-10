import { AdminPageHeader } from "@/features/admin/components/page-header";
import { FaqForm } from "@/features/admin/faqs/faq-form";
import { createFaqAction } from "@/features/admin/faqs/actions";

export default function NewFaqPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader title="New FAQ" backHref="/admin/faqs" backLabel="Back to FAQs" />
      <FaqForm onSubmit={createFaqAction} />
    </div>
  );
}
