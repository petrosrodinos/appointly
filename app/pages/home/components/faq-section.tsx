import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FaqSection = () => {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Everything you need to know about Appointly</p>
        </header>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does the multi-tenant system work?</AccordionTrigger>
              <AccordionContent>Each business gets their own branded booking site with custom domain, colors, logo, and content. Your customers will only see your brand, not Appointly's branding. You have complete control over the look and feel of your booking experience.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I integrate with my existing website?</AccordionTrigger>
              <AccordionContent>Yes! You can embed our booking widget into your existing website, or use our booking site as a standalone solution. We also provide API access for custom integrations.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What payment methods do you support?</AccordionTrigger>
              <AccordionContent>We support all major payment methods including credit cards, PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through our PCI-compliant payment processor.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How does the automated messaging work?</AccordionTrigger>
              <AccordionContent>You can set up automated email and SMS messages for appointment confirmations, reminders, follow-ups, and more. Messages are sent based on triggers you define, and you can customize the content and timing for each message type.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Is there a mobile app?</AccordionTrigger>
              <AccordionContent>Yes! We have mobile apps for both iOS and Android that allow you to manage your business on the go. Your customers can also book appointments through our mobile-optimized web interface.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>What kind of support do you offer?</AccordionTrigger>
              <AccordionContent>We offer email support for all plans, priority support for Professional plans, and dedicated support for Enterprise customers. We also have a comprehensive knowledge base and video tutorials to help you get started.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
