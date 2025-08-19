import { Briefcase, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          
          {/* Left Section - Brand */}
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-blue-600" />
            <p className="text-sm text-gray-600">
              Built by <span className="font-medium text-blue-600">Krishna Sarone</span>
            </p>
          </div>

          {/* Right Section - Social & Copyright */}
          <div className="flex items-center gap-6">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ResumeCraft
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a 
                href="https://x.com/KrishnaSarone" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                <Twitter className="h-4 w-4" />
              </a>
              
              <a 
                href="https://github.com/krisn2" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                <Github className="h-4 w-4" />
              </a>
              
              <a 
                href="https://www.linkedin.com/in/krishnasarone/" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}