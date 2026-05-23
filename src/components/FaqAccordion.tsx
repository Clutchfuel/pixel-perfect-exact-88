import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/data/faq";

export function FaqAccordion({ items, idPrefix = "faq" }: { items: FaqItem[]; idPrefix?: string }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full divide-y divide-ink/10 border-y border-ink/10"
    >
      {items.map((item, i) => (
        <AccordionItem key={`${idPrefix}-${i}`} value={`${idPrefix}-${i}`} className="border-0">
          <AccordionTrigger className="py-5 text-left font-display text-lg font-extrabold tracking-display text-ink hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="pb-5 pr-8 text-base leading-relaxed text-muted-ink">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
