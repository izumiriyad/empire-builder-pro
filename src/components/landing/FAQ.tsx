import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What kind of content do you offer?",
    answer: "We offer exclusive premium content including high-quality videos, behind-the-scenes footage, and special drops that you won't find anywhere else. All content is curated and updated daily.",
  },
  {
    question: "Is my payment secure and anonymous?",
    answer: "Absolutely! We accept multiple payment methods including Bitcoin for complete anonymity. All transactions are encrypted and secure. Your privacy is our top priority.",
  },
  {
    question: "How do I access the premium content?",
    answer: "After completing your payment, you'll receive an instant invite link to our premium Telegram channel. Simply click the link and you'll have immediate access to all content.",
  },
  {
    question: "Is this really lifetime access?",
    answer: "Yes! Pay once and enjoy forever. There are no recurring fees, no monthly subscriptions, and no hidden charges. Your access never expires.",
  },
  {
    question: "What if I'm not satisfied?",
    answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with the content, contact us within 30 days for a full refund, no questions asked.",
  },
  {
    question: "How often is new content added?",
    answer: "We add fresh content every single day! Premium members get access to daily drops, plus surprise bonus content and early access to special releases.",
  },
  {
    question: "Can I make special requests?",
    answer: "Yes! Premium members can submit special content requests. While we can't guarantee every request, we do our best to accommodate our members' preferences.",
  },
  {
    question: "Is there a free trial available?",
    answer: "We offer a free channel with limited content so you can see our quality before committing. However, the premium vault contains exclusive content not available anywhere else.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
            <HelpCircle className="w-4 h-4" />
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our premium content platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
