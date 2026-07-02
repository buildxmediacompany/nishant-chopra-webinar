import { SectionHeading } from "./section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection({
  faqs,
}: {
  faqs: { id: string; question: string; answer: string }[];
}) {
  if (faqs.length === 0) return null;

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-center font-utility text-xs uppercase tracking-[0.2em] text-cream-faint">
          Still Not Sure?
        </p>
        <SectionHeading title="Frequently Asked {gold}Questions{/gold}" />
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>
                {i + 1}. {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
