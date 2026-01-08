import { Play, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const videos = [
  {
    title: "Behind The Scenes",
    duration: "12:34",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&fit=crop",
    locked: false,
  },
  {
    title: "Exclusive Interview",
    duration: "24:15",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop",
    locked: true,
  },
  {
    title: "Weekly Drop #47",
    duration: "18:22",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop",
    locked: true,
  },
  {
    title: "Fan Q&A Session",
    duration: "32:10",
    thumbnail: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=600&h=400&fit=crop",
    locked: true,
  },
  {
    title: "Day In My Life",
    duration: "15:45",
    thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop",
    locked: false,
  },
  {
    title: "Premium Tutorial",
    duration: "45:00",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop",
    locked: true,
  },
];

const VideoPreview = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      id="content" 
      className="py-24 bg-secondary/30"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div 
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Latest Content
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Get instant access to hundreds of exclusive videos when you join
          </p>
        </div>
        
        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <Card 
              key={index} 
              className={`group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
            >
              <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {video.locked ? (
                      <div className="flex flex-col items-center gap-2">
                        <Lock className="w-8 h-8 text-primary" />
                        <span className="text-sm font-medium text-foreground">Members Only</span>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary-foreground ml-1" />
                      </div>
                    )}
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-background/80 rounded text-xs font-medium text-foreground">
                    {video.duration}
                  </div>
                  
                  {/* Lock indicator */}
                  {video.locked && (
                    <div className="absolute top-2 right-2">
                      <Lock className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoPreview;
