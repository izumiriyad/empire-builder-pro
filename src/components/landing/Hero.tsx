import { Button } from "@/components/ui/button";
import { Play, Star, Lock, Crown, Zap } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useTypingAnimation } from "@/hooks/use-typing-animation";
import VideoModal from "./VideoModal";
import heroBackground from "@/assets/hero-background.mp4";
const BokehParticle = ({
  delay,
  duration,
  size,
  left,
  top,
  opacity,
  mouseX,
  mouseY,
  depth,
}: {
  delay: number;
  duration: number;
  size: number;
  left: number;
  top: number;
  opacity: number;
  mouseX: number;
  mouseY: number;
  depth: number;
}) => (
  <div
    className="absolute rounded-full pointer-events-none transition-transform duration-300 ease-out"
    style={{
      width: size,
      height: size,
      left: `${left}%`,
      top: `${top}%`,
      background: `radial-gradient(circle, hsl(var(--primary) / ${opacity}) 0%, transparent 70%)`,
      filter: `blur(${size / 8}px)`,
      animation: `bokeh-float ${duration}s ease-in-out ${delay}s infinite`,
      transform: `translate(${mouseX * depth}px, ${mouseY * depth}px)`,
    }}
  />
);

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const bokehParticles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        delay: Math.random() * 8,
        duration: 12 + Math.random() * 10,
        size: 40 + Math.random() * 120,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: 0.1 + Math.random() * 0.2,
        depth: 0.02 + Math.random() * 0.06, // Different parallax depth for each particle
      })),
    [],
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

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16"
    >
      {/* Video background with scroll fade and Ken Burns effect */}
      <div className="absolute inset-0 overflow-hidden" style={{ opacity: Math.max(0, 1 - scrollY / 500) }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{
            animation: "ken-burns 25s ease-in-out infinite",
          }}
        >
          <source src={heroBackground} type="video/mp4" />
        </video>

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.7) 100%)",
          }}
        />
      </div>

      {/* Animated film grain overlay with scroll fade */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          animation: "grain 0.5s steps(10) infinite",
          opacity: Math.max(0, 0.035 * (1 - scrollY / 500)),
        }}
      />

      {/* Dark overlay with gradient fade - increases as video fades */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90 transition-opacity duration-300"
        style={{ opacity: Math.min(1, 0.7 + scrollY / 800) }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />

      {/* Animated circles with scroll + mouse parallax */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${scrollY * 0.05 + mousePosition.x * 0.03}px, ${scrollY * 0.15 + mousePosition.y * 0.03}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${scrollY * -0.08 + mousePosition.x * -0.04}px, ${scrollY * 0.2 + mousePosition.y * 0.04}px)`,
        }}
      />

      {/* Additional parallax decorative elements */}
      <div
        className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary/3 rounded-full blur-2xl transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${scrollY * -0.12 + mousePosition.x * 0.05}px, ${scrollY * 0.1 + mousePosition.y * -0.03}px)`,
        }}
      />
      <div
        className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-secondary/10 rounded-full blur-2xl transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${scrollY * 0.1 + mousePosition.x * -0.02}px, ${scrollY * 0.25 + mousePosition.y * 0.05}px)`,
        }}
      />

      {/* Floating bokeh particles with mouse parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bokehParticles.map((particle) => (
          <BokehParticle key={particle.id} {...particle} mouseX={mousePosition.x} mouseY={mousePosition.y} />
        ))}
      </div>

      <div
        className="relative z-10 container mx-auto px-4 text-center transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x * -0.015}px, ${scrollY * 0.3 + mousePosition.y * -0.015}px)`,
          opacity: Math.max(0, 1 - scrollY / 600),
        }}
      >
        {/* Brand Logo */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-destructive rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg shadow-primary/30">
            LE
          </div>
          <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
            LeakEmpire
          </span>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-8">
          <Lock className="w-4 h-4 text-destructive" />
          <span className="text-sm font-medium text-destructive">18+ Exclusive Content</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          <span className="bg-gradient-to-r from-primary via-destructive to-primary bg-clip-text text-transparent">
            Exclusive. Unseen.
          </span>
          <br />
          <span className="text-foreground">
            {displayText}
            <span className="animate-pulse text-primary">|</span>
          </span>
          <br />
          <span className="text-muted-foreground">Empire-Level.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Premium content delivered directly to your Telegram. New drops weekly. Lifetime access.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-destructive hover:from-primary/90 hover:to-destructive/90 transition-all duration-300 shadow-lg shadow-destructive/30 hover:shadow-destructive/50 hover:scale-105"
            asChild
          >
            <a href="#pricing">
              <Crown className="w-5 h-5 mr-2" />
              Get Access Now
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] hover:border-primary hover:scale-105"
            asChild
          >
            <a href="https://t.me/joinLeakEmpire" target="_blank" rel="noopener noreferrer">
              <Zap className="w-5 h-5 mr-2" />
              Preview Channel (Free)
            </a>
          </Button>
        </div>

        {/* Video Preview */}
        <div className="mt-8">
          <VideoModal />
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto py-6 px-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-foreground">500+</div>
            <div className="text-sm text-muted-foreground">HD Videos</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-foreground">10K+</div>
            <div className="text-sm text-muted-foreground">Members</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-foreground">24/7</div>
            <div className="text-sm text-muted-foreground">New Content</div>
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
