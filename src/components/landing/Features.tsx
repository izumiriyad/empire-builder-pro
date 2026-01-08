import { Shield, Zap, Users, Lock, Gift, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Daily Fresh Content",
    description: "New exclusive drops added every single day. Never run out of premium content to enjoy.",
  },
  {
    icon: Shield,
    title: "100% Private & Secure",
    description: "Your privacy is our priority. All payments and access are completely anonymous.",
  },
  {
    icon: Users,
    title: "Active Community",
    description: "Join 10,000+ like-minded members sharing tips, recommendations, and exclusive finds.",
  },
  {
    icon: Lock,
    title: "Lifetime Access",
    description: "Pay once and get unlimited access forever. No recurring fees or hidden charges.",
  },
  {
    icon: Gift,
    title: "Exclusive Bonus Drops",
    description: "Premium members get surprise bonus content and early access to special releases.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated team is always available to help you with any questions or requests.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've built the ultimate platform for premium content lovers. Here's what makes us different.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
