import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import VideoPreview from "@/components/landing/VideoPreview";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import StickyJoinButton from "@/components/landing/StickyJoinButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <VideoPreview />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <StickyJoinButton />
    </div>
  );
};

export default Index;
