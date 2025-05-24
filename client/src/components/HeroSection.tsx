import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChevronDown, Play } from "lucide-react";

export default function HeroSection() {
  const { data: heroContent } = useQuery({
    queryKey: ["/api/content/hero"],
  });

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1125" 
          alt="Cinematic film production with dramatic lighting and camera equipment" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 video-overlay"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 hero-text-gradient animate-fade-in-up">
          {heroContent?.title || "Transforming Visions into"}
          <br />
          <span className="text-[#00D4FF]">
            {heroContent?.content || "Cinematic Success"}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-[#A1A1AA] mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          {heroContent?.subtitle || "Crafting compelling commercials, ads, and marketing videos for the Creative Film Industry with unparalleled artistic vision and technical excellence."}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <Button 
            onClick={scrollToPortfolio}
            className="bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
          >
            <Play className="w-5 h-5" />
            Watch Our Reel
          </Button>
          <Button 
            onClick={scrollToContact}
            variant="outline"
            className="border-2 border-white/20 hover:border-[#00D4FF] text-white hover:text-[#00D4FF] px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            Let's Create
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
}
