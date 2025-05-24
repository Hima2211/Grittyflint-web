import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";

export default function PortfolioSection() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["/api/portfolio"],
  });

  const { data: portfolioContent } = useQuery({
    queryKey: ["/api/content/portfolio"],
  });

  const defaultProjects = [
    {
      id: 1,
      title: "Luxury Auto Campaign",
      client: "Mercedes-Benz",
      thumbnailUrl: "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Cinematic commercial showcasing luxury automotive excellence"
    },
    {
      id: 2,
      title: "Tech Startup Promo",
      client: "InnovateTech Solutions",
      thumbnailUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Dynamic brand video for cutting-edge technology company"
    },
    {
      id: 3,
      title: "Fashion Brand Film",
      client: "Avant-Garde Couture",
      thumbnailUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "High-fashion commercial with dramatic visual storytelling"
    },
    {
      id: 4,
      title: "Culinary Experience",
      client: "Michelin Star Restaurant",
      thumbnailUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Appetizing food commercial with artistic presentation"
    },
    {
      id: 5,
      title: "Music Video Epic",
      client: "Platinum Records Artist",
      thumbnailUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "High-energy music video with stunning visual effects"
    },
    {
      id: 6,
      title: "Corporate Documentary",
      client: "Fortune 500 Company",
      thumbnailUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Professional corporate story with authentic messaging"
    }
  ];

  const projectsToShow = projects?.length ? projects : defaultProjects;

  if (isLoading) {
    return (
      <section id="portfolio" className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-800 animate-pulse rounded mb-6"></div>
            <div className="h-6 bg-gray-800 animate-pulse rounded max-w-3xl mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-800 animate-pulse rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            {portfolioContent?.title || "Our Latest Creations"}
          </h2>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
            {portfolioContent?.subtitle || "Explore our most compelling work and see how we transform creative visions into award-winning visual experiences."}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsToShow.map((project) => (
            <div 
              key={project.id} 
              className="relative group cursor-pointer overflow-hidden rounded-xl"
            >
              <img 
                src={project.thumbnailUrl} 
                alt={project.title} 
                className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500" 
              />
              
              <div className="absolute inset-0 portfolio-overlay opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="text-center p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-white/90 mb-4">{project.client}</p>
                  <div className="flex items-center justify-center gap-4">
                    <Button 
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
                    >
                      <Info className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            className="border-2 border-[#00D4FF] text-[#00D4FF] hover:bg-[#00D4FF] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
