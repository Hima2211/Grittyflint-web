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
    <section id="portfolio" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-24">
          <div className="flex items-start justify-between">
            <div className="max-w-2xl">
              <h2 className="text-6xl md:text-7xl font-light text-black mb-8 leading-none">
                Our Work
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                A collection of projects that showcase our passion for creating meaningful digital experiences and memorable brand stories.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-2">Featured Projects</p>
                <p className="text-3xl font-light text-black">2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.map((project, index) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="aspect-[4/3] relative overflow-hidden rounded-lg mb-6">
                  {project.thumbnailUrl && (
                    <>
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-light text-black group-hover:text-gray-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm uppercase tracking-wider">
                    {project.category || "Video Production"}
                  </p>
                  {project.description && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">Portfolio content will be displayed here once projects are added through the admin panel.</p>
          </div>
        )}
      </div>
    </section>
  );
}
