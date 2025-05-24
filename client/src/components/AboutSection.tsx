import { useQuery } from "@tanstack/react-query";

export default function AboutSection() {
  const { data: aboutContent } = useQuery({
    queryKey: ["/api/content/about"],
  });

  const differentiators = [
    {
      icon: "fas fa-eye",
      title: "Creative Vision",
      description: "Pushing the boundaries of visual storytelling to deliver unforgettable results that captivate and convert.",
      gradient: "cinematic-gradient"
    },
    {
      icon: "fas fa-film",
      title: "Industry Expertise",
      description: "Deep understanding of the Creative Film Industry's unique needs and the latest production trends.",
      gradient: "cinematic-gradient-alt"
    },
    {
      icon: "fas fa-rocket",
      title: "Results-Driven",
      description: "Crafting content that not only looks stunning but achieves your strategic marketing objectives.",
      gradient: "bg-gradient-to-r from-[#8B5CF6] to-[#FF6B35]"
    },
    {
      icon: "fas fa-cogs",
      title: "Cutting-Edge Technology",
      description: "Utilizing the latest in film and post-production technology for superior quality and innovation.",
      gradient: "cinematic-gradient"
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-8">
              {aboutContent?.title || (
                <>
                  Why Partner with <span className="text-[#00D4FF]">Spectra Media</span>?
                </>
              )}
            </h2>
            <p className="text-xl text-[#A1A1AA] mb-12">
              {aboutContent?.subtitle || "We don't just create videos – we craft cinematic experiences that resonate with audiences and deliver measurable results for your brand."}
            </p>
            
            <div className="space-y-8">
              {differentiators.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${item.gradient} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                    <i className={`${item.icon} text-white`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-[#A1A1AA]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
              alt="Professional film crew in action with high-end camera equipment and dramatic lighting setup" 
              className="rounded-2xl shadow-2xl" 
            />
            
            <div className="absolute -bottom-8 -left-8 cinematic-gradient rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-black">500+</div>
              <div className="text-sm text-white/80">Projects Delivered</div>
            </div>
            
            <div className="absolute -top-8 -right-8 cinematic-gradient-alt rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-black">25+</div>
              <div className="text-sm text-white/80">Industry Awards</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
