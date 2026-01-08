import { Button } from "@/components/ui/button";
import { Play, Star } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useTypingAnimation } from "@/hooks/use-typing-animation";
import VideoModal from "./VideoModal";
import heroBackground from "@/assets/hero-background.mp4";
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
      {/* Video background with scroll fade and Ken Burns effect */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: Math.max(0, 1 - scrollY / 500) }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ 
            animation: 'ken-burns 25s ease-in-out infinite',
          }}
        >
          <source src={heroBackground} type="video/mp4" />
        </video>
        
        {/* Vignette overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.7) 100%)'
          }}
        />
      </div>
      
      {/* Animated film grain overlay with scroll fade */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          animation: 'grain 0.5s steps(10) infinite',
          opacity: Math.max(0, 0.035 * (1 - scrollY / 500))
        }}
      />
      
      {/* Dark overlay with gradient fade - increases as video fades */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90 transition-opacity duration-300"
        style={{ opacity: Math.min(1, 0.7 + scrollY / 800) }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      
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
          <VideoModal />
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
