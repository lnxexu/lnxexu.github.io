import { Button } from "./ui/button";
import { ArrowDown, Download } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  // Smooth scroll with header offset
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      const header = document.querySelector('header');
      const headerHeight = header ? (header as HTMLElement).offsetHeight : 0;
      const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 4;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="mb-8">
            <ImageWithFallback 
              src="/Kobe_Corpuz.jpeg"
              alt="Profile Picture" 
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-border"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Full Stack Developer
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Passionate about creating exceptional digital experiences through clean code, 
            innovative solutions, and user-centered design. I transform ideas into reality 
            with modern technologies and best practices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="px-8">
              <a href="#contact" className="flex items-center gap-2" onClick={e => handleSmoothScroll(e, '#contact')}>
                Get In Touch
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <a href="/Corpuz_Resume.pdf" download>
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </a>
            </Button>
          </div>
          
          <div className="animate-bounce">
            <a href="#about" className="inline-block" onClick={e => handleSmoothScroll(e, '#about')}>
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}