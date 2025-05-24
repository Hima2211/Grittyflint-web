import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

interface NavigationProps {
  showAdminLink?: boolean;
}

export default function Navigation({ showAdminLink }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-light text-white tracking-wider">GrittyFlint</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-white hover:text-[#00D4FF] transition-colors duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-[#A1A1AA] hover:text-[#00D4FF] transition-colors duration-300"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')} 
              className="text-[#A1A1AA] hover:text-[#00D4FF] transition-colors duration-300"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-[#A1A1AA] hover:text-[#00D4FF] transition-colors duration-300"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-[#A1A1AA] hover:text-[#00D4FF] transition-colors duration-300"
            >
              Contact
            </button>
            {showAdminLink && (
              <Link href="/admin">
                <Button variant="outline" size="sm" className="border-[#00D4FF] text-[#00D4FF] hover:bg-[#00D4FF] hover:text-white">
                  Admin
                </Button>
              </Link>
            )}
          </div>
          

          
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-white hover:text-[#00D4FF] transition-colors duration-300 text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-[#A1A1AA] hover:text-[#00D4FF] transition-colors duration-300 text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')} 
                className="text-[#A1A1AA] hover:text-[#00D4FF] transition-colors duration-300 text-left"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-[#A1A1AA] hover:text-[#00D4FF] transition-colors duration-300 text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-[#A1A1AA] hover:text-[#00D4FF] transition-colors duration-300 text-left"
              >
                Contact
              </button>
              {showAdminLink && (
                <Link href="/admin">
                  <span className="text-[#00D4FF] hover:text-[#00D4FF]/80 transition-colors duration-300">
                    Admin Dashboard
                  </span>
                </Link>
              )}

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
