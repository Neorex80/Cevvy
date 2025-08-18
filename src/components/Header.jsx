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
      <div className="container mx-auto flex h-20 items-center px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-blue-600 rounded-xl group-hover:bg-blue-700 transition-colors duration-200 shadow-md">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                Resume-Craft
              </span>
              <p className="text-xs text-gray-500 -mt-0.5">Professional Resumes</p>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 ml-12">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-gray-600 hover:text-gray-900 font-medium transition-all duration-200 py-2 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="/login"
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Toggle Menu"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <a href="/" className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-600 rounded-xl">
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-gray-900">Resume-Craft</span>
                </a>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="p-6">
                <div className="flex flex-col space-y-4 mb-8">
                  {navLinks.map((link, index) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4 -rotate-90" />
                    </a>
                  ))}
                </div>

                {/* Mobile Auth Buttons */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <a
                    href="/login"
                    className="block w-full text-center px-4 py-3 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </a>
                  <a
                    href="/register"
                    className="block w-full text-center px-4 py-3 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-200 shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}