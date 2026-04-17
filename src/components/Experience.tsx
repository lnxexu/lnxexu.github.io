import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      title: "Freelance Software Developer/System Analyst",
      company: "Self-Employed",
      location: "Remote",
      period: "2024 - 2025",
      description: [
        "Have done developing softwares for my clients (usually students) who needs help in their projects.",
        "Have done some reviews on such diagrams that involves the systems of the software."
      ],
      technologies: ["Java", "Python", "LucidChart", "NoSQL"]
    },
    {
      title: "Software Developer Intern",
      company: "ALTTOS Innovations Corporations",
      location: "Phase 4 Blk69, Brgy, Lot3 Deca Homes Rd, Tugbok, Davao City, Davao del Sur",
      period: "January 13, 2026 - March 25, 2026",
      description: [
        "Developing a cross-platform mobile application for the company's main product using React Native.",
        "Implementing efficient local data storage solutions using MMKV and Watermelon DB to enhance app performance and user experience.",
        "Collaborating with the backend team to integrate MongoDB databases, ensuring seamless data flow and synchronization within the application."
      ],
      technologies: ["React Native", "MMKV", "MongoDB", "Watermelon DB", "JSONSchema", "TypeScript","NestJS", "Next.js", "Redux"]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Science in Information Technology",
      school: "University of Immaculate Conception (Father Selga Campus)",
      location: "3J92+W3V, 297 A. Pichon St, Poblacion District, Davao City, Davao del Sur",
      period: "2021 - 2026",
      details: "Loyalty Awardee from the RVM institution (2015-2026), Dean's Lister (2025, 1st Semester), and Graduate in 2026."
    }
  ];

  const scrollToSectionWithOffset = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const header = document.querySelector("header") as HTMLElement | null;
    const headerHeight = header ? header.offsetHeight : 0;
    const targetY = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 4;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <section id="experience" className="py-2 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">Experience</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            My professional journey in software development, building products that make a difference
            and working with amazing teams along the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Experience Timeline */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl mb-8">Professional Experience</h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{exp.title}</CardTitle>
                    <div className="space-y-2 text-muted-foreground mt-2">
                      <div className="font-medium">{exp.company}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="truncate max-w-xs sm:max-w-[200px] md:max-w-[300px] lg:max-w-[250px] xl:max-w-[300px]" title={exp.location}>
                          {exp.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span className="truncate max-w-[120px]" title={exp.period}>
                          {exp.period}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {exp.description.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {exp.company === "ALTTOS Innovations Corporations" && (
                      <div className="border-t pt-4 mt-6" style={{ paddingTop: 13, cursor: "pointer" }}>
                        <button
                          onClick={() => {
                            scrollToSectionWithOffset("ryori");
                          }}
                          className="text-sm text-primary flex items-center gap-1 font-medium hover:text-primary/80 transition-colors duration-300"
                          style={{ cursor: "pointer" }}
                        >
                          <ExternalLink className="h-4 w-4" />
                          Scroll down to view the detailed Ryori project showcase
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div>
            <h3 className="text-2xl mb-8">Education</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{edu.degree}</CardTitle>
                    <div className="text-muted-foreground mt-2">
                      <div className="font-medium">{edu.school}</div>
                      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-sm mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 shrink-0" />
                          <span className="truncate max-w-xs sm:max-w-[200px] md:max-w-[300px] lg:max-w-[250px] xl:max-w-[300px]" title={edu.location}>
                            {edu.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-2 sm:mt-0">
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span className="truncate max-w-[120px]" title={edu.period}>
                            {edu.period}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {edu.details && <p className="text-sm text-muted-foreground">{edu.details}</p>}
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-medium">Cisco: Introduction to Cybersecurity</div>
                      <div className="text-muted-foreground">Cisco Network Academy • 2024</div>
                    </div>
                    <div>
                      <div className="font-medium">Artificial Intelligence For Teams Workshop</div>
                      <div className="text-muted-foreground">VJAL Institute • 2025</div>
                    </div>
                    <div>
                      <div className="font-medium">English for Effective Business Speaking</div>
                      <div className="text-muted-foreground">The Hong Kong University of Science and Technology • 2026</div>
                    </div>
                    <div>
                      <div className="font-medium">Frontend Development using React</div>
                      <div className="text-muted-foreground">Board Infinity • 2026</div>
                    </div>
                    <div>
                      <div className="font-medium">JavaScript for Web Development</div>
                      <div className="text-muted-foreground">Board Infinity • 2026</div>
                    </div>
                    <div>
                      <div className="font-medium">AWS Cloud Solutions Architect Professional Certificate</div>
                      <div className="text-muted-foreground">Amazon Web Services • 2026</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}