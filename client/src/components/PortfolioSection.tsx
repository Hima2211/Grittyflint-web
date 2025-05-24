import { useQuery } from "@tanstack/react-query";
import type { PortfolioProject, ContentSection } from "@shared/schema";

export default function PortfolioSection() {
  const { data: projects } = useQuery<PortfolioProject[]>({
    queryKey: ["/api/portfolio"],
  });

  const { data: portfolioContent } = useQuery<ContentSection>({
    queryKey: ["/api/content/portfolio"],
  });

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-black mb-4 leading-tight">
            A showcase of<br />
            <span className="font-normal">stories we've helped<br />bring to life.</span>
          </h2>
        </div>

        {/* Portfolio Grid */}
        {projects && projects.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="break-inside-avoid relative overflow-hidden rounded-lg group cursor-pointer mb-4"
              >
                {project.thumbnailUrl && (
                  <>
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm font-medium">{project.title}</p>
                      <p className="text-white/80 text-xs">{project.category || "Video Production"}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">Portfolio content will be displayed here once projects are added through the admin panel.</p>
          </div>
        )}
      </div>
    </section>
  );
}
