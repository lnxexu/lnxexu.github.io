import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "./ui/carousel";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [activeLightboxImages, setActiveLightboxImages] = useState<{ src: string; alt: string }[]>([]);

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
  const featuredRepos = highlightedRepos.length > 0 ? highlightedRepos : repos.slice(0, 3);
  const featuredRepoIds = new Set(featuredRepos.map((repo) => repo.id));
  const otherRepos = repos.filter(
    (r) => !featuredRepoIds.has(r.id)
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

  const openPreview = (
    images: { src: string; alt: string }[],
    startIndex: number,
  ) => {
    setActiveLightboxImages(images);
    setLightboxIndex(startIndex);
  };

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
  
  return (
    <>
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Lightbox
            open={lightboxIndex >= 0}
            close={() => setLightboxIndex(-1)}
            index={lightboxIndex}
            slides={activeLightboxImages}
            plugins={[Zoom]}
            animation={{
              fade: 250,
              swipe: 300,
            }}
            carousel={{
              finite: activeLightboxImages.length <= 5,
            }}
            styles={{
              container: {
                backgroundColor: "rgba(0, 0, 0, .8)",
                backdropFilter: "blur(4px)",
              },
            }}
          />
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A selection of projects that showcase my skills and experience. Each project 
            demonstrates different aspects of modern web development and problem-solving.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredRepos.length > 0 ? (
            featuredRepos.map((repo) => (
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
            <Card className="md:col-span-2 lg:col-span-3">
              <CardContent className="py-10 text-center text-muted-foreground">
                Featured repositories are unavailable right now.
              </CardContent>
            </Card>
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