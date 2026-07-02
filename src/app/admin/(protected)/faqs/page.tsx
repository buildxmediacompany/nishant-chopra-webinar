import { listFaqs } from "@/features/admin/faqs/queries";
import { deleteFaqAction, setFaqActiveAction } from "@/features/admin/faqs/actions";
import { SimpleResourceList } from "@/features/admin/components/simple-resource-list";

export default async function FaqsPage() {
  const items = await listFaqs();

  return (
    <SimpleResourceList
      title="FAQs"
      description="Frequently asked questions accordion."
      newHref="/admin/faqs/new"
      items={items}
      renderPrimary={(f) => f.question}
      renderSecondary={(f) => f.answer}
      editHref={(f) => `/admin/faqs/${f.id}`}
      toggleActiveActionFor={(f) => setFaqActiveAction.bind(null, f.id)}
      deleteActionFor={(f) => deleteFaqAction.bind(null, f.id)}
    />
  );
}
