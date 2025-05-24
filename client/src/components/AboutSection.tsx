import { useQuery } from "@tanstack/react-query";
import type { ContentSection } from "@shared/schema";

export default function AboutSection() {
  const { data: aboutContent } = useQuery<ContentSection>({
    queryKey: ["/api/content/about"],
  });

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Testimonials Section */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-6">TESTIMONIALS</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" 
                  alt="Client" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-sm">John Smith</p>
                  <p className="text-xs text-gray-500">Creative Director</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                "The team delivered exceptional results that exceeded our expectations."
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" 
                  alt="Client" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-sm">Sarah Johnson</p>
                  <p className="text-xs text-gray-500">Marketing Lead</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                "Working with GrittyFlint was a game-changer for our campaign."
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                  alt="Client" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-sm">Mike Davis</p>
                  <p className="text-xs text-gray-500">Brand Manager</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                "Professional, creative, and results-driven video production."
              </p>
            </div>
          </div>
        </div>

        {/* Latest News Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-light text-black mb-12">latest news /</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Row 1 */}
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=250&fit=crop" 
                alt="News" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <p className="text-xs text-gray-500 mb-2">May 15, 2024</p>
                <h3 className="font-medium text-sm mb-2">Behind the Scenes: Our Latest Commercial Production</h3>
                <p className="text-xs text-gray-600">An inside look at the creative process behind our award-winning automotive commercial.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=250&fit=crop" 
                alt="News" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <p className="text-xs text-gray-500 mb-2">May 10, 2024</p>
                <h3 className="font-medium text-sm mb-2">New Equipment Upgrade: Cinematic Excellence</h3>
                <p className="text-xs text-gray-600">Investing in cutting-edge technology to deliver even more stunning visual narratives.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=250&fit=crop" 
                alt="News" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <p className="text-xs text-gray-500 mb-2">May 5, 2024</p>
                <h3 className="font-medium text-sm mb-2">Documentary Series Wins Film Festival Award</h3>
                <p className="text-xs text-gray-600">Our latest documentary project receives recognition at the International Film Festival.</p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1518985384788-abcd8763e11c?w=400&h=250&fit=crop" 
                alt="News" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <p className="text-xs text-gray-500 mb-2">April 28, 2024</p>
                <h3 className="font-medium text-sm mb-2">Client Spotlight: Fashion Brand Transformation</h3>
                <p className="text-xs text-gray-600">How we helped a luxury fashion brand redefine their visual identity through video.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=250&fit=crop" 
                alt="News" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <p className="text-xs text-gray-500 mb-2">April 20, 2024</p>
                <h3 className="font-medium text-sm mb-2">The Future of Video Marketing Trends</h3>
                <p className="text-xs text-gray-600">Our predictions for the evolving landscape of video content and marketing strategies.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1489599184881-02d5411f71e9?w=400&h=250&fit=crop" 
                alt="News" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <p className="text-xs text-gray-500 mb-2">April 15, 2024</p>
                <h3 className="font-medium text-sm mb-2">Music Video Production: Creative Collaboration</h3>
                <p className="text-xs text-gray-600">Exploring the collaborative process between artists and directors in music video creation.</p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=250&fit=crop" 
                alt="News" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <p className="text-xs text-gray-500 mb-2">April 10, 2024</p>
                <h3 className="font-medium text-sm mb-2">Post-Production Magic: Color Grading Insights</h3>
                <p className="text-xs text-gray-600">The art and science behind creating mood and atmosphere through color grading techniques.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=250&fit=crop" 
                alt="News" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <p className="text-xs text-gray-500 mb-2">April 5, 2024</p>
                <h3 className="font-medium text-sm mb-2">Location Scouting: Finding Perfect Settings</h3>
                <p className="text-xs text-gray-600">How we discover and secure stunning locations that enhance storytelling impact.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=250&fit=crop" 
                alt="News" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <p className="text-xs text-gray-500 mb-2">March 30, 2024</p>
                <h3 className="font-medium text-sm mb-2">Team Expansion: Welcome New Talent</h3>
                <p className="text-xs text-gray-600">Introducing our newest team members and their expertise in cinematography and editing.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quote Section */}
        <div className="mt-20 text-center">
          <p className="text-2xl md:text-3xl font-light text-gray-700 max-w-4xl mx-auto leading-relaxed">
            At our core, we are<br />
            storytellers. We believe that<br />
            every brand has a unique and<br />
            valuable story — it's about attention,<br />
            word of mouth, and meaning.
          </p>
        </div>
      </div>
    </section>
  );
}