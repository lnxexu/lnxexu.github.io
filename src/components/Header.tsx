import { Button } from "./ui/button";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const linkedInUrl = "https://www.linkedin.com/in/kobe-j-corpuz";
  const navItems = useMemo(
    () => [
      { href: "#about", label: "About" },
      { href: "#skills", label: "Skills" },
      { href: "#projects", label: "Projects" },
      { href: "#experience", label: "Experience" },
      { href: "#contact", label: "Contact" },
    ],
    [],
  );
  const [activeHref, setActiveHref] = useState(navItems[0]?.href ?? "");

  const getHeaderHeight = () => {
    const header = document.querySelector("header");
    return header instanceof HTMLElement ? header.offsetHeight : 0;
  };

  useEffect(() => {
    const updateActiveHref = () => {
      const headerHeight = getHeaderHeight();
      const scrollAnchor = window.scrollY + headerHeight + 12;
      let currentHref = navItems[0]?.href ?? "";

      for (const item of navItems) {
        const id = item.href.replace("#", "");
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollAnchor) {
          currentHref = item.href;
        }
      }

      const isNearPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (isNearPageBottom && navItems.length > 0) {
        currentHref = navItems[navItems.length - 1].href;
      }

      setActiveHref((previousHref) =>
        previousHref === currentHref ? previousHref : currentHref,
      );
    };

    updateActiveHref();
    window.addEventListener("scroll", updateActiveHref, { passive: true });
    window.addEventListener("resize", updateActiveHref);

    return () => {
      window.removeEventListener("scroll", updateActiveHref);
      window.removeEventListener("resize", updateActiveHref);
    };
  }, [navItems]);

  const getNavLinkClassName = (href: string, isMobile: boolean) => {
    const baseClassName = isMobile
      ? "header-nav-link block px-3 py-2 rounded-md transition-colors"
      : "header-nav-link px-3 py-2 rounded-md transition-colors";

    return `${baseClassName}${activeHref === href ? " is-active" : ""}`;
  };

  // Smooth scroll with header offset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      const headerHeight = getHeaderHeight();
      const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 4; // 4px gap
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveHref(href);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="shrink-0">
            <a
              href="#"
              className="text-xl font-medium"
              onClick={e => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveHref(navItems[0]?.href ?? "");
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
                  className={getNavLinkClassName(item.href, false)}
                  onClick={e => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com/lnxexu" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
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
                  className={getNavLinkClassName(item.href, true)}
                  onClick={e => {
                    handleNavClick(e, item.href);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center space-x-4 px-3 py-2">
                <a href="https://github.com/lnxexu" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
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