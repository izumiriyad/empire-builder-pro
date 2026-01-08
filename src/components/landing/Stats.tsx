import { TrendingUp, Download, Users, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Active Members",
    description: "Growing community",
  },
  {
    icon: Download,
    value: 500,
    suffix: "+",
    label: "Premium Videos",
    description: "Updated daily",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "/5",
    label: "Average Rating",
    description: "Based on reviews",
    decimals: 1,
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    description: "Happy members",
  },
];

const useCountUp = (end: number, duration: number = 2000, decimals: number = 0, shouldStart: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = easeOutQuart * end;
      
      setCount(Number(currentValue.toFixed(decimals)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, decimals, shouldStart]);

  return count;
};

const StatItem = ({ stat, isVisible, index }: { stat: typeof stats[0]; isVisible: boolean; index: number }) => {
  const count = useCountUp(stat.value, 2000 + index * 200, stat.decimals || 0, isVisible);

  const formatValue = (value: number) => {
    if (stat.decimals) {
      return value.toFixed(stat.decimals);
    }
    return value.toLocaleString();
  };

  return (
    <div className="text-center group">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
        <stat.icon className="w-6 h-6 text-primary" />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
        {formatValue(count)}{stat.suffix}
      </div>
      <div className="text-sm font-medium text-foreground mb-0.5">
        {stat.label}
      </div>
      <div className="text-xs text-muted-foreground">
        {stat.description}
      </div>
    </div>
  );
};

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-primary/5 border-y border-primary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} isVisible={isVisible} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
