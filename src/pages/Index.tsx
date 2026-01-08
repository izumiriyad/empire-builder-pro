import Hero from "@/components/landing/Hero";
import VideoPreview from "@/components/landing/VideoPreview";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <VideoPreview />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
