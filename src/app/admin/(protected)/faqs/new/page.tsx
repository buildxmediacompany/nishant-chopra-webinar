import { FaqForm } from "@/features/admin/faqs/faq-form";
import { createFaqAction } from "@/features/admin/faqs/actions";

export default function NewFaqPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-cream">New FAQ</h1>
      <div className="mt-8">
        <FaqForm onSubmit={createFaqAction} />
      </div>
    </div>
  );
}
