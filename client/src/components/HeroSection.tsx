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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69fabf25b48f40b3f50b80b3e8da96736&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-thin text-white leading-tight tracking-wider uppercase">
          <span className="block">
            {heroContent?.title || "PEAK STUDIO"}
          </span>
        </h1>
      </div>
      
      {/* Bottom Left Text */}
      <div className="absolute bottom-8 left-8 z-10">
        <div className="text-white/80 text-sm uppercase tracking-wide">
          <div>Ready to find your next</div>
          <div>ideal template</div>
        </div>
      </div>
      
      {/* Bottom Right Text */}
      <div className="absolute bottom-8 right-8 z-10">
        <div className="text-center text-white/80 text-sm uppercase tracking-wide">
          <div>PEAK</div>
          <div>DIGITAL STUDIO</div>
        </div>
      </div>
    </section>
  );
}
