import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play, Star, X } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useTypingAnimation } from "@/hooks/use-typing-animation";

const Particle = ({ delay, duration, size, left, initialTop }: { 
  delay: number; 
  duration: number; 
  size: number; 
  left: number;
  initialTop: number;
}) => (
  <div
    className="absolute rounded-full bg-primary/20 pointer-events-none"
    style={{
      width: size,
      height: size,
      left: `${left}%`,
      top: `${initialTop}%`,
      animation: `float-up ${duration}s ease-in-out ${delay}s infinite`,
    }}
  />
);

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 6,
      size: 4 + Math.random() * 8,
      left: Math.random() * 100,
      initialTop: 100 + Math.random() * 20,
    })), []
  );

  const { displayText } = useTypingAnimation({
    texts: ["You Won't Find", "You Can't Miss", "You Deserve"],
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseDuration: 2500,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16">
      {/* Background gradient with parallax */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/20"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      
      {/* Animated circles with parallax */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
        style={{ transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.15}px)` }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"
        style={{ transform: `translate(${scrollY * -0.08}px, ${scrollY * 0.2}px)` }}
      />
      
      {/* Additional parallax decorative elements */}
      <div 
        className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary/3 rounded-full blur-2xl"
        style={{ transform: `translate(${scrollY * -0.12}px, ${scrollY * 0.1}px)` }}
      />
      <div 
        className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-secondary/10 rounded-full blur-2xl"
        style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.25}px)` }}
      />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <Particle key={particle.id} {...particle} />
      ))}
      
      <div 
        className="relative z-10 container mx-auto px-4 text-center"
        style={{ transform: `translateY(${scrollY * 0.3}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="text-sm font-medium text-primary">Premium Content Creator</span>
        </div>
        
        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Exclusive Content
          <br />
          <span className="text-primary">
            {displayText}
            <span className="animate-pulse">|</span>
          </span>
          <br />
          Anywhere Else
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Join thousands of members getting access to premium videos, behind-the-scenes content, and exclusive drops every week.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 gap-2 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:scale-105"
              >
                <Play className="w-5 h-5" />
                Watch Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl p-0 bg-background border-border overflow-hidden">
              <div className="relative aspect-video w-full bg-black">
                <video
                  className="absolute inset-0 w-full h-full"
                  src="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
                  controls
                  autoPlay
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-6 transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] hover:border-primary hover:scale-105" 
            asChild
          >
            <a href="https://t.me/joinleakempire" target="_blank" rel="noopener noreferrer">
              Join Now — $19/mo
            </a>
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
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
