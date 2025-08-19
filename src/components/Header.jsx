import { useState } from "react";
import { Menu, Briefcase, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/build", label: "Build Resume" },
    { href: "/about", label: "About" },
    // { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container mx-auto flex h-16 sm:h-20 items-center px-4 sm:px-6">
        {/* Logo Section */}
        <div className="flex items-center min-w-0 flex-shrink-0">
          <a href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg sm:rounded-xl group-hover:bg-blue-700 transition-colors duration-200 shadow-md">
              <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="hidden xs:block min-w-0">
              <span className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 whitespace-nowrap">
                Resume-Craft
              </span>
              <p className="text-xs text-gray-500 -mt-0.5 hidden sm:block">Professional Resumes</p>
            </div>
          </a>
        </div>

        {/* Desktop Navigation - Hidden on mobile and small screens */}
        <nav className="hidden md:flex items-center space-x-6 xl:space-x-8 ml-8 xl:ml-12">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-gray-600 hover:text-gray-900 font-medium transition-all duration-200 py-2 group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4 min-w-0">
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="/login"
              className="px-4 xl:px-5 py-2 xl:py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md whitespace-nowrap"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="px-4 xl:px-6 py-2 xl:py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button - Show on small screens only */}
          <button
            className="md:hidden p-2 sm:p-2.5 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-colors duration-200 flex-shrink-0"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Mobile/Tablet Menu Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            
            {/* Menu Panel - Pure white background */}
            <div className="fixed right-0 top-0 h-full w-full max-w-sm sm:w-80 bg-white z-50 md:hidden shadow-2xl animate-in slide-in-from-right duration-300">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white">
                <a href="/" className="flex items-center space-x-2 sm:space-x-3">
                  <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg sm:rounded-xl">
                    <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">Resume-Craft</span>
                </a>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-80px)] bg-white">
                {/* Navigation Links */}
                <div className="flex flex-col space-y-2 sm:space-y-4 mb-6 sm:mb-8">
                  {navLinks.map((link, index) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between p-3 sm:p-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg sm:rounded-xl transition-all duration-200 font-medium animate-in slide-in-from-right"
                      onClick={() => setIsMenuOpen(false)}
                      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                    >
                      <span className="text-sm sm:text-base">{link.label}</span>
                      <ChevronDown className="h-4 w-4 -rotate-90 text-gray-400" />
                    </a>
                  ))}
                </div>

                {/* Mobile Auth Buttons */}
                <div className="space-y-3 pt-4 sm:pt-6 border-t border-gray-200 animate-in slide-in-from-right" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
                  <a
                    href="/login"
                    className="block w-full text-center px-4 py-3 sm:py-4 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all duration-200 border border-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </a>
                  <a
                    href="/register"
                    className="block w-full text-center px-4 py-3 sm:py-4 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-lg sm:rounded-xl transition-all duration-200 shadow-lg active:scale-95"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Custom CSS for animations and responsive breakpoints */}
      <style jsx>{`
        @media (min-width: 475px) {
          .xs\\:block {
            display: block;
          }
        }
        
        @keyframes slide-in-from-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-in {
          animation-duration: 0.3s;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: both;
        }
        
        .slide-in-from-right {
          animation-name: slide-in-from-right;
        }
        
        .duration-300 {
          animation-duration: 0.3s;
        }
      `}</style>
    </header>
  );
}