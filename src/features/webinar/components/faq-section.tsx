import { Section } from "./section";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
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
    <Section tone="raised" width="narrow" pad="lg">
      <SectionHeading
        eyebrow="Still not sure?"
        title="Frequently Asked {gold}Questions{/gold}"
      />
      {/* No card per question — a hairline is enough separation, and the
          generous vertical padding keeps the click targets large. */}
      <Reveal className="mt-12">
        <Accordion type="single" collapsible>
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-stage-line">
              <AccordionTrigger className="py-6 text-[15px]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
