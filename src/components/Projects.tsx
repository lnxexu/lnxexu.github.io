import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "./ui/carousel";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Add CSS animations as a style block
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateY(-50%) translateX(-20px); }
    to { opacity: 1; transform: translateY(-50%) translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateY(-50%) translateX(20px); }
    to { opacity: 1; transform: translateY(-50%) translateX(0); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`;

export function Projects() {
  type Repo = {
    id: number;
    name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    html_url: string;
    homepage: string | null;
    topics?: string[];
    archived: boolean;
    fork: boolean;
  };

  const [repos, setRepos] = useState<Repo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [reposError, setReposError] = useState<string | null>(null);
  // For smooth exit transition
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const cacheKey = "gh_repos_lnxexu";
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        setRepos(JSON.parse(cached));
        setLoadingRepos(false);
        return;
      } catch {}
    }

    const controller = new AbortController();
    const token = (import.meta as any)?.env?.VITE_GITHUB_TOKEN as string | undefined;
    const headers: HeadersInit = token ? { Authorization: `token ${token}` } : {};

    async function load() {
      try {
        setLoadingRepos(true);
        setReposError(null);
        const res = await fetch(
          "https://api.github.com/users/lnxexu/repos?sort=updated&per_page=9",
          { headers, signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }
        const data: Repo[] = await res.json();
        const filtered = data
          .filter((r) => !r.archived && !r.fork)
          .slice(0, 9);
        setRepos(filtered);
        sessionStorage.setItem(cacheKey, JSON.stringify(filtered));
      } catch (e: any) {
        if (e?.name !== "AbortError") {
          setReposError(
            "Unable to load GitHub repositories right now. Please try again later."
          );
        }
      } finally {
        setLoadingRepos(false);
      }
    }
    load();
    return () => controller.abort();
  }, []);

  const highlightNames = ["togetha", "uvt", "spotifybootleg"];
  const highlightedRepos = highlightNames
    .map((n) => repos.find((r) => r.name.toLowerCase() === n))
    .filter(Boolean) as Repo[];
  const otherRepos = repos.filter(
    (r) => !highlightNames.includes(r.name.toLowerCase())
  );

  const uvtImages = [
    { src: "/uvt/login.png", alt: "UVT Login" },
    { src: "/uvt/dashboard.png", alt: "UVT Dashboard" },
    { src: "/uvt/pending-reports.png", alt: "UVT Pending Reports" },
    { src: "/uvt/report-violation.png", alt: "UVT Report Violation" },
    { src: "/uvt/account-management.png", alt: "UVT Account Management" },
    { src: "/uvt/reports.png", alt: "UVT Reports" },
    { src: "/uvt/student-violation-dashboard.png", alt: "UVT Student Violation Dashboard" },
  ];

  const togethaImages = [
    { src: "/togetha/intro.png", alt: "Togetha Landing" },
    { src: "/togetha/login.png", alt: "Togetha Login" },
    { src: "/togetha/dashboard.png", alt: "Togetha Dashboard" },
    { src: "/togetha/to-do.png", alt: "Togetha To-Do List" },
    { src: "/togetha/ai-chatbot.png", alt: "Togetha AI Chatbot" },
    { src: "/togetha/note-taking.png", alt: "Togetha Note Taking" },
    { src: "/togetha/settings.png", alt: "Togetha Profile" },
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<
    { src: string; alt: string }[] | null
  >(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxApi, setLightboxApi] = useState<CarouselApi | null>(null);

  const openPreview = (
    images: { src: string; alt: string }[],
    startIndex: number,
  ) => {
    setLightboxImages(images);
    setLightboxIndex(startIndex);
    setLightboxOpen(true);
    setExiting(false);
  };

  useEffect(() => {
    if (!lightboxApi) return;
    
    const onSelect = () => {
      setLightboxIndex(lightboxApi.selectedScrollSnap());
    };
    
    lightboxApi.on("select", onSelect);
    onSelect();
    
    return () => {
      lightboxApi.off("select", onSelect);
    };
  }, [lightboxApi]);

  function ShowcaseCarousel({
    images,
    interval = 3000,
    autoplayOnHover = true,
    onImageClick,
  }: {
    images: { src: string; alt: string }[];
    interval?: number;
    autoplayOnHover?: boolean;
    onImageClick?: (startIndex: number) => void;
  }) {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [index, setIndex] = useState(0);
    const [hovered, setHovered] = useState(false);
    
    function ProjectImage({ src, alt, imageIndex }: { src: string; alt: string; imageIndex: number }) {
      const [isPortrait, setIsPortrait] = useState(false);
      useEffect(() => {
        const img = new Image();
        img.onload = () => {
          setIsPortrait(img.naturalHeight > img.naturalWidth);
        };
        img.src = src;
      }, [src]);

      return (
        <div
          className={`relative w-full h-48 cursor-pointer overflow-hidden bg-muted/20 flex items-center justify-center`}
          style={
            isPortrait
              ? {
                  minWidth: 192,
                  minHeight: 192,
                  maxWidth: 256,
                  maxHeight: 256,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  // Prevent flicker by removing all transitions
                  transition: 'none',
                  willChange: 'auto',
                }
              : {}
          }
          onClick={() => {
            onImageClick?.(imageIndex);
          }}
        >
          <ImageWithFallback
            src={src}
            alt={alt}
            className={
              isPortrait
                ? "object-contain max-h-full max-w-full block"
                : "w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            }
            style={
              isPortrait
                ? {
                    display: 'block',
                    margin: 'auto',
                    maxHeight: '100%',
                    maxWidth: '100%',
                    width: 'auto',
                    height: 'auto',
                    // Remove all transform/hover/transitions for portrait
                    transition: 'none',
                    transform: 'none',
                    willChange: 'auto',
                    pointerEvents: 'none',
                  }
                : {}
            }
          />
        </div>
      );
    }

    useEffect(() => {
      if (!api) return;
      const onSelect = () => setIndex(api.selectedScrollSnap());
      api.on("select", onSelect);
      onSelect();
      return () => {
        api.off("select", onSelect);
      };
    }, [api]);

    useEffect(() => {
      if (!api) return;
      if (autoplayOnHover && !hovered) return;
      const id = setInterval(() => {
        api.scrollNext();
      }, interval);
      return () => clearInterval(id);
    }, [api, interval, hovered, autoplayOnHover]);

    return (
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {images.map((img, idx) => (
              <CarouselItem key={idx} className="w-full">
                <ProjectImage src={img.src} alt={img.alt} imageIndex={idx} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
        <div className="px-2 py-1 text-xs text-muted-foreground bg-background/70 backdrop-blur-sm border-t">
          {images[index]?.alt}
        </div>
      </div>
    );
  }
  
  const projectsData: {
    featured: boolean;
    image: string;
    alt: string;
    title: string;
    description: string;
    demo: string;
    github: string;
    technologies: string[];
  }[] = [];
  const featuredProjects = projectsData.filter((project) => project.featured);
  const otherProjects = projectsData.filter((project) => !project.featured);

  return (
    <>
      {/* Inject animation styles */}
      <style>{animationStyles}</style>
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {lightboxImages && lightboxOpen && (
          <div 
            className={`fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center min-h-screen transition-all duration-300 ease-in-out animate-in fade-in ${exiting ? 'animate-out fade-out' : ''}`}
            style={{ 
              zIndex: 2147483647, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              minHeight: '100vh',
              animation: exiting ? 'fadeOut 0.3s ease-in-out' : 'fadeIn 0.3s ease-in-out'
            }}
            onClick={() => {
              setExiting(true);
              setTimeout(() => setLightboxOpen(false), 300);
            }}
          >
            {/* Close button - High contrast */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExiting(true);
                setTimeout(() => setLightboxOpen(false), 300);
              }}
              style={{ 
                zIndex: 2147483647, 
                position: 'fixed', 
                top: 24, 
                right: 24,
                animation: 'fadeIn 0.4s ease-in-out 0.1s both'
              }}
              className="bg-white text-black hover:bg-gray-200 transition-all duration-200 hover:scale-110 rounded-full p-2 shadow-2xl border border-black"
              aria-label="Close preview"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Image counter / Pagination indicator */}
            <div style={{ 
              zIndex: 2147483646, 
              position: 'fixed', 
              top: 24, 
              left: '50%', 
              transform: 'translateX(-50%)',
              animation: 'fadeIn 0.4s ease-in-out 0.2s both'
            }} className="text-black text-base font-medium bg-white px-6 py-2.5 rounded-full shadow-lg border border-black transition-all duration-300">
              {lightboxIndex + 1} / {lightboxImages.length}
            </div>

            {/* Carousel container */}
            <div 
              className="relative w-full h-full flex items-center justify-center min-h-screen"
              style={{ 
                zIndex: 2147483645, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh',
                animation: 'scaleIn 0.4s ease-in-out 0.1s both'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Carousel
                opts={{ loop: true, startIndex: lightboxIndex }}
                className="w-full h-full flex items-center justify-center transition-all duration-300"
                setApi={setLightboxApi}
              >
                <CarouselContent className="h-full transition-transform duration-500 ease-in-out">
                  {lightboxImages.map((img, i) => (
                    <CarouselItem
                      key={i}
                      className="w-full h-full flex items-center justify-center p-8 transition-all duration-300"
                    >
                      <ImageWithFallback
                        src={img.src}
                        alt={img.alt}
                        className="object-contain transition-all duration-300 ease-in-out"
                        style={{
                          maxWidth: 'calc(100vw - 96px)',
                          maxHeight: 'calc(100vh - 96px)',
                          width: 'auto',
                          height: 'auto',
                          display: 'block',
                          margin: '0 auto',
                          background: 'transparent',
                          opacity: i === lightboxIndex ? 1 : 0.7,
                          transform: i === lightboxIndex ? 'scale(1)' : 'scale(0.95)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {/* Navigation buttons - High contrast */}
                {lightboxImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        lightboxApi?.scrollPrev();
                      }}
                      style={{ 
                        zIndex: 2147483646, 
                        position: 'fixed', 
                        left: 24, 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        animation: 'slideInLeft 0.4s ease-in-out 0.3s both'
                      }}
                      className="bg-white text-black hover:bg-gray-200 p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-2xl border border-black"
                      aria-label="Previous image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        lightboxApi?.scrollNext();
                      }}
                      style={{ 
                        zIndex: 2147483646, 
                        position: 'fixed', 
                        right: 24, 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        animation: 'slideInRight 0.4s ease-in-out 0.3s both'
                      }}
                      className="bg-white text-black hover:bg-gray-200 p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-2xl border border-black"
                      aria-label="Next image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </>
                )}
              </Carousel>

              {/* Pagination dots - High contrast */}
              {lightboxImages.length > 1 && (
                <div style={{ 
                  zIndex: 2147483646, 
                  position: 'fixed', 
                  bottom: 80, 
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  animation: 'fadeInUp 0.4s ease-in-out 0.4s both'
                }} className="flex gap-2">
                  {lightboxImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        lightboxApi?.scrollTo(idx);
                      }}
                      className={`transition-all duration-300 border border-black ${
                        idx === lightboxIndex
                          ? "w-8 h-2 bg-white transform scale-110"
                          : "w-2 h-2 bg-white/50 hover:bg-white/75 hover:scale-125"
                      } rounded-full`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Caption */}
              <div style={{ 
                zIndex: 2147483646, 
                position: 'fixed', 
                bottom: 24, 
                left: '50%', 
                padding: '0 1rem', 
                transform: 'translateX(-50%)',
                animation: 'fadeInUp 0.4s ease-in-out 0.5s both'
              }} className="text-black text-sm bg-white px-5 py-2.5 rounded-lg max-w-2xl text-center backdrop-blur-sm shadow-lg border border-black transition-all duration-300">
                {lightboxImages[lightboxIndex]?.alt}
                </div>
            </div>
          </div>
        )}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A selection of projects that showcase my skills and experience. Each project 
            demonstrates different aspects of modern web development and problem-solving.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {highlightedRepos.length > 0 ? (
            highlightedRepos.map((repo) => (
              <Card key={repo.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {repo.name.toLowerCase() === "uvt" ? (
                  <ShowcaseCarousel
                    images={uvtImages}
                    interval={2000}
                    onImageClick={(idx) => openPreview(uvtImages, idx)}
                  />
                ) : repo.name.toLowerCase() === "togetha" ? (
                  <ShowcaseCarousel
                    images={togethaImages}
                    interval={2000}
                    onImageClick={(idx) => openPreview(togethaImages, idx)}
                  />
                ) : (
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 bg-muted/20 flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">No preview available</span>
                    </div>
                    <div className="px-2 py-1 text-xs text-muted-foreground bg-background/70 backdrop-blur-sm border-t">
                      No preview available
                    </div>
                  </div>
                )}
                <CardHeader className="pt-1">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {repo.name}
                    <div className="flex items-center gap-2">
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        title="Source Code"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground">
                    {repo.language && (
                      <Badge variant="outline" className="text-xs">
                        {repo.language}
                      </Badge>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            featuredProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <ImageWithFallback 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Latest on GitHub */}
        <div className="mb-16">
          <h3 className="text-2xl mb-8 text-center">Latest on GitHub</h3>
          {loadingRepos ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-4">
                  <div className="h-6 w-40 bg-muted rounded mb-3" />
                  <div className="h-16 w-full bg-muted rounded mb-3" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-muted rounded" />
                    <div className="h-6 w-16 bg-muted rounded" />
                  </div>
                </Card>
              ))}
            </div>
          ) : reposError ? (
            <p className="text-center text-muted-foreground">{reposError}</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherRepos.map((repo) => (
                <Card key={repo.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      {repo.name}
                      <div className="flex items-center gap-2">
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          title="Source Code"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {repo.description || "No description provided."}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground">
                      {repo.language && (
                        <Badge variant="outline" className="text-xs">
                          {repo.language}
                        </Badge>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" />
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {repo.topics.slice(0, 6).map((t) => (
                          <Badge key={t} variant="outline" className="text-xs">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
    </>
  );
}