import { Button } from "./ui/button";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  // Smooth scroll with header offset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      const header = document.querySelector('header');
      const headerHeight = header ? (header as HTMLElement).offsetHeight : 0;
      const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 4; // 4px gap
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <a
              href="#"
              className="text-xl font-medium"
              onClick={e => {
                e.preventDefault();
                const header = document.querySelector('header');
                const headerHeight = header ? (header as HTMLElement).offsetHeight : 0;
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // Optionally, offset for header height if needed
                if (headerHeight > 0) {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 10);
                }
              }}
            >
              Portfolio
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md transition-colors"
                  onClick={e => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com/lnxexu" className="text-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/kobe-j-corpuz-4645252a3/" className="text-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:kcorpuz_220000002183@uic.edu.ph" className="text-foreground hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border rounded-lg mt-2 mb-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-primary rounded-md transition-colors"
                  onClick={e => {
                    handleNavClick(e, item.href);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center space-x-4 px-3 py-2">
                <a href="https://github.com/lnxexu" className="text-foreground hover:text-primary transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/kobe-j-corpuz" className="text-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="mailto:kcorpuz_220000002183@uic.edu.ph" className="text-foreground hover:text-primary transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}