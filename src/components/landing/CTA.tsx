import { Button } from "@/components/ui/button";
import { Check, Zap, UserCheck } from "lucide-react";
import { useState, useEffect } from "react";

const benefits = [
  "Lifetime access – pay once, enjoy forever",
  "Daily new exclusive drops",
  "No recurring fees or hidden costs",
  "Direct messaging access",
  "Special requests available",
];

const recentJoins = [
  { name: "John", location: "NYC" },
  { name: "Mike", location: "London" },
  { name: "Carlos", location: "Miami" },
  { name: "Alex", location: "Toronto" },
  { name: "James", location: "Sydney" },
  { name: "David", location: "Berlin" },
];

const CTA = () => {
  const [currentJoin, setCurrentJoin] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentJoin((prev) => (prev + 1) % recentJoins.length);
        setIsVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 max-w-md mx-auto mb-10 relative overflow-hidden shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)] animate-pulse [animation-duration:3s]">
            {/* Urgency indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse"></span>
              <span className="text-xs font-medium text-destructive">12 spots left</span>
            </div>
            
            <div className="text-sm text-muted-foreground mb-2">Lifetime Access</div>
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-2xl text-muted-foreground line-through">$49</span>
                <span className="text-5xl font-bold text-foreground">$19</span>
                <span className="text-muted-foreground">one-time</span>
              </div>
              <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                Save 61%
              </span>
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
            
            <div className="relative group">
              <Button size="lg" className="w-full text-lg py-6 relative overflow-hidden" asChild>
                <a href="https://t.me/joinleakempire" target="_blank" rel="noopener noreferrer">
                  Join Now
                  {/* Sparkle effects */}
                  <span className="absolute top-1 left-4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                  <span className="absolute top-3 right-6 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping [animation-delay:150ms]" />
                  <span className="absolute bottom-2 left-8 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping [animation-delay:300ms]" />
                  <span className="absolute bottom-3 right-4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping [animation-delay:75ms]" />
                  <span className="absolute top-2 left-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping [animation-delay:225ms]" />
                </a>
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              Secure payment • Instant access • Cancel anytime
            </p>
          </div>

          {/* Social proof notification */}
          <div 
            className={`flex items-center gap-2 justify-center mb-6 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <UserCheck className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">
                <span className="font-medium">{recentJoins[currentJoin].name}</span> from {recentJoins[currentJoin].location} just joined
              </span>
              <span className="text-xs text-muted-foreground">• 2m ago</span>
            </div>
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
