import { useQuery } from "@tanstack/react-query";
import type { Service, ContentSection } from "@shared/schema";

export default function ServicesSection() {
  const { data: services } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: servicesContent } = useQuery<ContentSection>({
    queryKey: ["/api/content/services"],
  });

  return (
    <section id="services" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-6xl md:text-7xl font-light text-black mb-8 leading-none">
              Services
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We specialize in creating compelling visual narratives that elevate brands and connect with audiences through the art of storytelling.
            </p>
          </div>
          <div className="lg:pt-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Our Approach</h3>
                <p className="text-gray-700">
                  Every project begins with understanding your story, your audience, and your goals. We combine creative vision with strategic thinking to deliver results that matter.
                </p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Process</h3>
                <p className="text-gray-700">
                  From concept development through post-production, we maintain close collaboration to ensure your vision is realized with the highest production value.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services List */}
        {services && services.length > 0 ? (
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={service.id} className="border-b border-gray-200 pb-16 last:border-b-0">
                <div className="grid lg:grid-cols-3 gap-12 items-start">
                  <div>
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-sm text-gray-400 font-mono">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-3xl font-light text-black">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {service.description || "Professional video production services tailored to your specific needs and creative vision."}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                        Pre-Production
                      </span>
                      <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                        Production
                      </span>
                      <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                        Post-Production
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            <div className="border-b border-gray-200 pb-16">
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                <div>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-sm text-gray-400 font-mono">01</span>
                    <h3 className="text-3xl font-light text-black">Commercial Production</h3>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    High-impact commercials that drive results and connect with your audience through compelling storytelling and premium production value.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                      Concept Development
                    </span>
                    <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                      Filming
                    </span>
                    <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                      Post-Production
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-16">
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                <div>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-sm text-gray-400 font-mono">02</span>
                    <h3 className="text-3xl font-light text-black">Brand Films</h3>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Compelling brand narratives that showcase your company's story, values, and vision with cinematic quality and emotional depth.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                      Brand Strategy
                    </span>
                    <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                      Storytelling
                    </span>
                    <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                      Distribution
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-16">
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                <div>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-sm text-gray-400 font-mono">03</span>
                    <h3 className="text-3xl font-light text-black">Documentary</h3>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Authentic documentaries that capture real stories with journalistic integrity and cinematic artistry to create lasting impact.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                      Research
                    </span>
                    <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                      Interviews
                    </span>
                    <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                      Editing
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                <div>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-sm text-gray-400 font-mono">04</span>
                    <h3 className="text-3xl font-light text-black">Music Videos</h3>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Creative music videos that bring artists' visions to life with innovative concepts, dynamic visuals, and memorable storytelling.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                      Creative Direction
                    </span>
                    <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                      Performance
                    </span>
                    <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                      Color Grading
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}