import { Briefcase, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 px-4 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Briefcase className="h-6 w-6 text-blue-600" />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by Your Friends at Firebase.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm">© {new Date().getFullYear()} ResumeFlow</p>
          <div className="flex items-center space-x-2">
            <a href="#" target="_blank" rel="noreferrer">
              <Twitter className="h-5 w-5 hover:text-blue-600 transition-colors" />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5 hover:text-blue-600 transition-colors" />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <Linkedin className="h-5 w-5 hover:text-blue-600 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
