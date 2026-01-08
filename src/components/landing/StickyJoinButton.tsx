import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

const StickyJoinButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero section (approximately viewport height)
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <Button
        size="lg"
        className="text-lg px-8 py-6 gap-2 shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:scale-105"
        asChild
      >
        <a href="https://t.me/joinleakempire" target="_blank" rel="noopener noreferrer">
          <Zap className="w-5 h-5" />
          Join Now — $19
        </a>
      </Button>
    </div>
  );
};

export default StickyJoinButton;
