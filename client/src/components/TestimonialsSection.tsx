import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/testimonials"],
  });

  const { data: testimonialsContent } = useQuery({
    queryKey: ["/api/content/testimonials"],
  });

  const defaultTestimonials = [
    {
      id: 1,
      clientName: "Sarah Johnson",
      clientTitle: "Marketing Director",
      clientCompany: "TechFlow Industries",
      clientImageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
      quote: "Spectra Media transformed our brand campaign into a cinematic masterpiece. Their attention to detail and creative vision exceeded all our expectations.",
      rating: 5
    },
    {
      id: 2,
      clientName: "Michael Chen",
      clientTitle: "Creative Director",
      clientCompany: "Visionary Studios",
      clientImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
      quote: "Working with Spectra was a game-changer. They delivered a commercial that not only looked incredible but drove real business results.",
      rating: 5
    },
    {
      id: 3,
      clientName: "Emma Rodriguez",
      clientTitle: "Brand Manager",
      clientCompany: "Luxe Fashion House",
      clientImageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
      quote: "Their expertise in the film industry is unmatched. They understood our vision immediately and brought it to life beautifully.",
      rating: 5
    }
  ];

  const testimonialsToShow = testimonials?.length ? testimonials : defaultTestimonials;

  if (isLoading) {
    return (
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-800 animate-pulse rounded mb-6"></div>
            <div className="h-6 bg-gray-800 animate-pulse rounded max-w-3xl mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-800 animate-pulse rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            {testimonialsContent?.title || "What Our Clients Say"}
          </h2>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
            {testimonialsContent?.subtitle || "Trusted by industry leaders who rely on us to bring their creative visions to life with exceptional quality and professionalism."}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsToShow.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-gray-800/50 rounded-xl hover:bg-[#1A1A1A]/70 transition-all duration-300"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex text-[#00D4FF] text-xl">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-lg mb-6 text-[#A1A1AA]">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.clientImageUrl} 
                    alt={testimonial.clientName} 
                    className="w-12 h-12 rounded-full object-cover" 
                  />
                  <div>
                    <div className="font-semibold">{testimonial.clientName}</div>
                    <div className="text-sm text-[#A1A1AA]">
                      {testimonial.clientTitle}, {testimonial.clientCompany}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
