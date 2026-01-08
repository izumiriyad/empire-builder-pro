import { MessageCircle, CreditCard, Unlock, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Join Our Telegram",
    description: "Click the join button to open our Telegram channel and connect with us.",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Choose Your Plan",
    description: "Select the lifetime access plan and complete your secure payment.",
  },
  {
    icon: Unlock,
    step: "03",
    title: "Get Instant Access",
    description: "Receive your premium access link immediately after payment confirmation.",
  },
  {
    icon: PartyPopper,
    step: "04",
    title: "Enjoy Premium Content",
    description: "Start enjoying daily exclusive drops and all premium benefits forever!",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started takes less than 2 minutes. Follow these simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/10" />
              )}
              
              <div className="relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group">
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
                  {step.step}
                </div>
                
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
