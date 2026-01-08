import { TrendingUp, Download, Users, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Active Members",
    description: "Growing community",
  },
  {
    icon: Download,
    value: "500+",
    label: "Premium Videos",
    description: "Updated daily",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Average Rating",
    description: "Based on reviews",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Satisfaction Rate",
    description: "Happy members",
  },
];

const Stats = () => {
  return (
    <section className="py-16 bg-primary/5 border-y border-primary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-foreground mb-0.5">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
