export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-gray-800/50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 cinematic-gradient rounded-lg flex items-center justify-center">
                <i className="fas fa-play text-white text-lg"></i>
              </div>
              <span className="text-2xl font-bold text-white">Spectra Media</span>
            </div>
            <p className="text-[#A1A1AA] mb-4">
              Transforming creative visions into cinematic masterpieces for the film industry's most ambitious brands.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[#A1A1AA] hover:text-[#00D4FF] transition-colors duration-300">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-[#A1A1AA] hover:text-[#00D4FF] transition-colors duration-300">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-[#A1A1AA] hover:text-[#00D4FF] transition-colors duration-300">
                <i className="fab fa-vimeo text-xl"></i>
              </a>
              <a href="#" className="text-[#A1A1AA] hover:text-[#00D4FF] transition-colors duration-300">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-[#A1A1AA]">
              <li><a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">Commercial Production</a></li>
              <li><a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">Marketing Videos</a></li>
              <li><a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">Brand Films</a></li>
              <li><a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">Digital Content</a></li>
              <li><a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">Post-Production</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-[#A1A1AA]">
              <li><a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">Portfolio</a></li>
              <li><a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">Careers</a></li>
              <li><a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-[#A1A1AA]">
              <li><a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">Case Studies</a></li>
              <li><a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">Production Guide</a></li>
              <li><a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">Industry Insights</a></li>
              <li><a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">Press Kit</a></li>
              <li><a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">Client Portal</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-[#A1A1AA] mb-4 md:mb-0">
            © 2024 Spectra Media. All rights reserved.
          </div>
          <div className="flex gap-6 text-[#A1A1AA] text-sm">
            <a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-[#00D4FF] transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
