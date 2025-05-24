export default function Footer() {
  return (
    <footer className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-16 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-4xl font-light mb-6">GrittyFlint</h3>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Creating compelling visual narratives that elevate brands and connect with audiences through the art of storytelling.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-6">Contact</h4>
            <div className="space-y-4">
              <div>
                <p className="text-white">hello@grittyflint.com</p>
              </div>
              <div>
                <p className="text-white">+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="text-white">Los Angeles, CA</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-6">Services</h4>
            <div className="space-y-3">
              <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">Commercial Production</p>
              <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">Brand Films</p>
              <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">Documentary</p>
              <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">Music Videos</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-800">
          <div className="flex space-x-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">
              Vimeo
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">
              Twitter
            </a>
          </div>
          
          <div className="text-right">
            <p className="text-gray-500 text-sm">
              © 2024 GrittyFlint. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}