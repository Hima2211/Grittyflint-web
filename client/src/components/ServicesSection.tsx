import { useQuery } from "@tanstack/react-query";
import type { Service, ContentSection } from "@shared/schema";

export default function ServicesSection() {
  const { data: services } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: servicesContent } = useQuery<ContentSection>({
    queryKey: ["/api/content/services"],
  });

  const serviceItems = [
    {
      title: "Content Marketing",
      description: "Strategic content creation that drives engagement and builds lasting brand connections through compelling storytelling.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop"
    },
    {
      title: "Social Media Marketing", 
      description: "Dynamic social campaigns that amplify your message across all platforms with authentic brand voice.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop"
    },
    {
      title: "Email Marketing",
      description: "Personalized email campaigns that nurture leads and drive conversions through targeted messaging.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop"
    },
    {
      title: "Influencer Marketing",
      description: "Strategic partnerships with key influencers to expand reach and build authentic brand advocacy.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop"
    },
    {
      title: "Video Marketing",
      description: "Compelling video content that tells your story and engages audiences across all digital platforms.",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop"
    },
    {
      title: "Analytics & Reporting",
      description: "Data-driven insights that optimize campaign performance and maximize return on investment.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Services List */}
        <div className="space-y-6 mb-20">
          {(services && services.length > 0 ? services : serviceItems).map((service, index) => (
            <div key={service.id || index} className="flex items-center justify-between py-6 border-b border-gray-200 group">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-light text-black group-hover:text-gray-600 transition-colors duration-300">
                  {service.title}
                </h3>
              </div>
              <div className="flex items-center space-x-8">
                <p className="text-gray-600 max-w-md text-right hidden lg:block">
                  {service.description}
                </p>
                <div className="w-20 h-20 rounded-lg overflow-hidden">
                  <img
                    src={service.image || serviceItems[index % serviceItems.length].image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-purple-900 rounded-2xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-light mb-4">
              A new
            </h3>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto leading-relaxed">
              Ready to transform your brand's story? Let's create something extraordinary together that will captivate your audience and drive meaningful results.
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-purple-800 opacity-90"></div>
        </div>
      </div>
    </section>
  );
}
