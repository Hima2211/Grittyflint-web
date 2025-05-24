import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`
        }}
      >
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
            <span className="block">
              {heroContent?.title || "Shaping bold brands"}
            </span>
            <span className="block text-white/90">
              {heroContent?.subtitle || "for the digital age."}
            </span>
          </h1>
          
          {/* CTA Button */}
          <div className="mt-8">
            <Button
              onClick={scrollToPortfolio}
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-6 py-3 text-base font-medium rounded-none uppercase tracking-wider transition-all duration-300"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Small Link in Bottom Right */}
      <div className="absolute bottom-8 right-8 z-10">
        <a 
          href="#about" 
          className="text-white/60 hover:text-white text-sm underline transition-colors duration-300"
        >
          Browse our selection of over<br />
          200+ top creative projects
        </a>
      </div>
    </section>
  );
}
