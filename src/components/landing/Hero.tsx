import { Button } from "@/components/ui/button";
import { Play, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/20" />
      
      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="text-sm font-medium text-primary">Premium Content Creator</span>
        </div>
        
        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Exclusive Content
          <br />
          <span className="text-primary">You Won't Find</span>
          <br />
          Anywhere Else
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Join thousands of members getting access to premium videos, behind-the-scenes content, and exclusive drops every week.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="text-lg px-8 py-6 gap-2">
            <Play className="w-5 h-5" />
            Watch Preview
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6">
            Join Now — $19/mo
          </Button>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-foreground">10K+</div>
            <div className="text-sm text-muted-foreground">Members</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-foreground">500+</div>
            <div className="text-sm text-muted-foreground">Videos</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-foreground">4.9★</div>
            <div className="text-sm text-muted-foreground">Rating</div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
