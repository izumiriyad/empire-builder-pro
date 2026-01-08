import { useState } from "react";
import { Instagram, Twitter, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate subscription - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setEmail("");
    toast({
      title: "Subscribed!",
      description: "Thanks for subscribing to our newsletter.",
    });
  };

  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="mb-10 pb-10 border-b border-border">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest content tips and exclusive updates delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                maxLength={255}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Brand */}
          <div className="text-xl font-bold text-foreground">
            ContentHub
          </div>
          
          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            <a href="#" className="hover:text-foreground transition-colors">FAQ</a>
          </nav>
          
          {/* Social links */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ContentHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
