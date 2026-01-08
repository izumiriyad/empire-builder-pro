import { useState, useRef } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface VideoModalProps {
  thumbnailUrl?: string;
  videoUrl?: string;
}

const VideoModal = ({ 
  thumbnailUrl = "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1280&h=720&fit=crop",
  videoUrl = "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
}: VideoModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
          {/* Thumbnail overlay */}
          {!isPlaying && (
            <div 
              className="absolute inset-0 z-10 cursor-pointer group"
              onClick={handlePlay}
            >
              <img
                src={thumbnailUrl}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)]">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                </div>
              </div>
            </div>
          )}
          
          {/* Video player */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full"
            src={videoUrl}
            controls={isPlaying}
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
