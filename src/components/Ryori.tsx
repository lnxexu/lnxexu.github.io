import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Lightbulb,
  Target,
  Zap,
  Heart,
  Users,
  Code,
  ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface RyoriData {
  project: {
    name: string;
    company: string;
    location: string;
    role: string;
    period: string;
    type: string;
    ceo: string;
  };
  missionStatement: {
    primary: string;
    secondary: string;
  };
  visionStatement: string;
  coreValues: Array<{
    name: string;
    description: string;
  }>;
  audience: {
    primary: string[];
    secondary: string[];
  };
  features: string[];
  technologies: Record<string, string[]>;
  responsibilities?: string[];
  screenshots: string[];
}

export function Ryori() {
  const [ryoriData, setRyoriData] = useState<RyoriData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Load data from JSON file
  useEffect(() => {
    const controller = new AbortController();

    async function loadRyoriData() {
      setLoading(true);
      setLoadError(null);
      try {
        const response = await fetch("/ryori/data.json", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = (await response.json()) as RyoriData;
        setRyoriData(data);
      } catch (error: any) {
        if (error?.name !== "AbortError") {
          console.error("Error loading Ryori data:", error);
          setRyoriData(null);
          setLoadError("Unable to load project details right now.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadRyoriData();

    return () => controller.abort();
  }, [retryCount]);

  const valueIcons: Record<string, React.ReactNode> = {
    Innovation: <Zap className="w-6 h-6" />,
    Reliability: <Heart className="w-6 h-6" />,
    Simplicity: <Target className="w-6 h-6" />,
    Community: <Users className="w-6 h-6" />,
    Empowerment: <Lightbulb className="w-6 h-6" />,
  };

  const screenshots = (ryoriData?.screenshots ?? []).map((screenshot) => ({
    src: `/ryori/${screenshot}`,
    alt: screenshot.replace(/\.(png|jpg|jpeg)$/i, "").replace(/-/g, " "),
  }));
  const visibleScreenshots = screenshots.slice(0, 15);
  const tabTriggerClassName =
    "ryori-tab-trigger flex-none whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium text-muted-foreground transition-all sm:text-sm";

  if (loading) {
    return (
      <section id="ryori" className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto flex items-center justify-center py-20">
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
      </section>
    );
  }

  if (loadError || !ryoriData) {
    return (
      <section id="ryori" className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardContent className="py-14 text-center space-y-4">
              <p className="text-muted-foreground">{loadError ?? "Unable to load project details."}</p>
              <Button type="button" variant="outline" onClick={() => setRetryCount((count) => count + 1)}>
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }


  return (
    <section id="ryori" className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <div className="space-y-2">
              <CardTitle className="text-3xl md:text-4xl">
                {ryoriData.project.name}
              </CardTitle>
              <p className="text-muted-foreground">
                {ryoriData.project.company}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{ryoriData.project.type}</Badge>
                <Badge variant="outline">
                  <a href={`https://www.linkedin.com/in/francisalbores/`} target="_blank" rel="noopener noreferrer">
                    {ryoriData.project.ceo}
                  </a>
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <h3 className="text-lg font-semibold">About the Project</h3>
            <p className="text-muted-foreground leading-relaxed">
              A nationwide QR code ordering and POS system designed to enhance
              the dining experience for restaurants and their customers. This
              cross-platform mobile application streamlines operations,
              simplifies ordering, and empowers entrepreneurs in the food and
              beverage industry.
            </p>
          </CardContent>

          <CardContent>
            {/* Tabs for Different Sections */}
            <Tabs defaultValue="mission" className="space-y-6">
              <TabsList className="flex h-auto w-full gap-2 overflow-x-auto rounded-lg border border-border/60 bg-muted/50 p-1">
                <TabsTrigger value="mission" className={tabTriggerClassName}>Mission & Vision</TabsTrigger>
                <TabsTrigger value="values" className={tabTriggerClassName}>Values</TabsTrigger>
                <TabsTrigger value="features" className={tabTriggerClassName}>Features</TabsTrigger>
                <TabsTrigger value="audience" className={tabTriggerClassName}>Audience</TabsTrigger>
                <TabsTrigger value="tech" className={tabTriggerClassName}>Tech Stack</TabsTrigger>
                <TabsTrigger value="gallery" className={tabTriggerClassName}>Gallery</TabsTrigger>
              </TabsList>

          {/* Mission & Vision Tab */}
          <TabsContent value="mission" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Mission Statement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Primary Mission</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {ryoriData.missionStatement.primary}
                  </p>
                </div>
                <div className="border-t pt-4" style={{ paddingTop: 16 }}>
                  <h4 className="font-semibold mb-2">Secondary Mission</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {ryoriData.missionStatement.secondary}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Vision Statement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {ryoriData.visionStatement}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Core Values Tab */}
          <TabsContent value="values">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ryoriData.coreValues.map((value) => (
                <Card key={value.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="text-primary">
                        {valueIcons[value.name] || <Zap className="w-5 h-5" />}
                      </div>
                      {value.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ryoriData.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <ArrowRight className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audience Tab */}
          <TabsContent value="audience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Primary Audience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {ryoriData.audience.primary.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"> 
                  <Users className="w-5 h-5" />
                  Secondary Audience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {ryoriData.audience.secondary.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary-foreground mt-2 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tech Stack Tab */}
          <TabsContent value="tech" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(ryoriData.technologies).map(
                ([category, techs]) => (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg capitalize">
                        <Code className="w-5 h-5" />
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {techs.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Application Screenshots</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Explore the user interface and features of the Ryori application
                </p>
              </CardHeader>
              <CardContent>
                <div className="mx-auto rounded-xl bg-black/80 p-3" style={{ maxWidth: "64rem" }}>
                  <div
                    className="grid gap-2"
                    style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}
                  >
                    {visibleScreenshots.map((screenshot, index) => (
                      <div key={screenshot.src}>
                        <button
                          type="button"
                          className="group relative w-full overflow-hidden rounded-lg bg-black/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-ring"
                          style={{ border: "2px solid rgba(186, 168, 168, 0.18)" }}
                          onClick={() => setLightboxIndex(index)}
                          aria-label={`Open ${screenshot.alt}`}
                        >
                          <ImageWithFallback
                            src={screenshot.src}
                            alt={screenshot.alt}
                            className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            style={{ height: "175px" }}
                          />
                          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <Lightbox
                  open={lightboxIndex >= 0}
                  close={() => setLightboxIndex(-1)}
                  index={lightboxIndex}
                  slides={visibleScreenshots}
                  plugins={[Zoom]}
                  animation={{
                    fade: 250,
                    swipe: 300,
                  }}
                  carousel={{
                    finite: visibleScreenshots.length <= 5,
                  }}
                  styles={{
                    container: {
                      backgroundColor: "rgba(0, 0, 0, .8)",
                      backdropFilter: "blur(4px)",
                    },
                  }}
                />

                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Click any photo to open
                </p>
                {screenshots.length > visibleScreenshots.length && (
                  <p className="text-xs text-muted-foreground mt-1 text-center">
                    Total available screenshots: {screenshots.length}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
