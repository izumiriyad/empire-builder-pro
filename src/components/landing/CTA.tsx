import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";

const benefits = [
  "Instant access to 500+ videos",
  "Weekly exclusive drops",
  "Behind-the-scenes content",
  "Direct messaging access",
  "Cancel anytime",
];

const CTA = () => {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Limited Time Offer</span>
          </div>
          
          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join today and get instant access to all exclusive content. No commitment, cancel anytime.
          </p>
          
          {/* Pricing card */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 max-w-md mx-auto mb-10">
            <div className="text-sm text-muted-foreground mb-2">Lifetime Access</div>
            <div className="flex items-baseline justify-center gap-1 mb-6">
              <span className="text-5xl font-bold text-foreground">$19</span>
              <span className="text-muted-foreground">one-time</span>
            </div>
            
            {/* Benefits list */}
            <ul className="space-y-3 mb-8 text-left">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <Button size="lg" className="w-full text-lg py-6" asChild>
              <a href="https://t.me/joinleakempire" target="_blank" rel="noopener noreferrer">
                Join Now
              </a>
            </Button>
            
            <p className="text-xs text-muted-foreground mt-4">
              Secure payment • Instant access • Cancel anytime
            </p>
          </div>
          
          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>🔒 SSL Secured</span>
            <span>💳 All cards accepted</span>
            <span>✓ Money-back guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
