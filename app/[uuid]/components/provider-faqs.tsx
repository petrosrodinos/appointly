import { getFaqs } from "@/features/faq/services/faq.services";
import type { Account } from "@/features/account/interfaces/account.interfaces";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface ProviderFaqsProps {
  provider: Account;
}

const ProviderFaqs = async ({ provider }: ProviderFaqsProps) => {
  let faqsData;
  try {
    faqsData = await getFaqs({
      account_uuid: provider.uuid,
      page: 1,
      limit: 50,
      search: "",
      order_by: "order",
      order_direction: "asc",
    });
  } catch (error) {
    return null;
  }

  if (!faqsData?.data || faqsData?.data?.length === 0) return null;

  return (
    <section className="bg-card rounded-xl md:rounded-2xl shadow-lg border border-border overflow-hidden">
      <header className="p-4 md:p-8 border-b border-border flex items-center gap-2 md:gap-3">
        <HelpCircle className="w-5 h-5 md:w-8 md:h-8 text-purple-600 dark:text-purple-400" />
        <h2 className="text-lg md:text-3xl font-bold">Frequently Asked Questions</h2>
      </header>
      <div className="p-3 md:p-6 bg-muted/30">
        <Card className="border-none shadow-none bg-transparent">
          <Accordion type="single" collapsible className="w-full">
            {faqsData?.data.map((faq) => (
              <AccordionItem key={faq.uuid} value={faq.uuid} className="border-border">
                <AccordionTrigger className="text-left text-sm md:text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-xs md:text-base leading-relaxed whitespace-pre-line">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  );
};

export default ProviderFaqs;
