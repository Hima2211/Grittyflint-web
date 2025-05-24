import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";

export default function ServicesSection() {
  const { data: services, isLoading } = useQuery({
    queryKey: ["/api/services"],
  });

  const { data: servicesContent } = useQuery({
    queryKey: ["/api/content/services"],
  });

  const defaultServices = [
    {
      id: 1,
      title: "Commercials & Broadcast Ads",
      description: "Captivating narratives designed for maximum impact on any screen, from traditional broadcast to digital platforms.",
      iconClass: "fas fa-video"
    },
    {
      id: 2,
      title: "Marketing & Brand Videos",
      description: "Engaging content that tells your brand's story and creates authentic connections with your target audience.",
      iconClass: "fas fa-bullhorn"
    },
    {
      id: 3,
      title: "Digital Content & Clips",
      description: "Dynamic short-form videos optimized for social media platforms and digital marketing campaigns.",
      iconClass: "fas fa-mobile-alt"
    },
    {
      id: 4,
      title: "Post-Production & VFX",
      description: "Cutting-edge post-production services and visual effects that bring your creative vision to life.",
      iconClass: "fas fa-magic"
    }
  ];

  const servicesToShow = services?.length ? services : defaultServices;

  if (isLoading) {
    return (
      <section id="services" className="py-24 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-800 animate-pulse rounded mb-6"></div>
            <div className="h-6 bg-gray-800 animate-pulse rounded max-w-3xl mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-800 animate-pulse rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            {servicesContent?.title || "Our Expertise in Motion"}
          </h2>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
            {servicesContent?.subtitle || "We specialize in creating cinematic content that captivates audiences and drives exceptional results for brands in the creative industry."}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesToShow.map((service, index) => (
            <Card 
              key={service.id} 
              className="bg-[#0A0A0A]/50 backdrop-blur-sm border border-gray-800/50 rounded-xl hover:bg-[#0A0A0A]/70 transition-all duration-300 transform hover:scale-105 hover:border-[#00D4FF]/50 group"
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                  index === 0 ? 'cinematic-gradient' :
                  index === 1 ? 'cinematic-gradient-alt' :
                  index === 2 ? 'bg-gradient-to-r from-[#8B5CF6] to-[#FF6B35]' :
                  'cinematic-gradient'
                }`}>
                  <i className={`${service.iconClass || 'fas fa-video'} text-2xl text-white`}></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#00D4FF] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[#A1A1AA] group-hover:text-white transition-colors duration-300">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
