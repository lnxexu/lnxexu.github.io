import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin } from "lucide-react";

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
      period: "Present",
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
      period: "2021 - Present",
      details: ""
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
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
                    <CardTitle className="text-xl break-words max-w-full">{exp.title}</CardTitle>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground w-full">
                      <span className="font-medium break-words max-w-full">{exp.company}</span>
                      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-sm w-full">
                        <div className="flex items-center gap-1 min-w-0 max-w-full truncate">
                          <MapPin className="h-4 w-4 shrink-0" />
                          <span className="truncate block max-w-xs sm:max-w-[200px] md:max-w-[300px] lg:max-w-[250px] xl:max-w-[300px]" title={exp.location}>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-1 min-w-0">
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span className="truncate block max-w-[120px]" title={exp.period}>{exp.period}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground break-words">
                      {exp.description.map((item, itemIndex) => (
                        <li key={itemIndex} className="break-words max-w-full">{item}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs break-words max-w-full">
                          {tech}
                        </Badge>
                      ))}
                    </div>
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
                    <CardTitle className="text-lg break-words max-w-full">{edu.degree}</CardTitle>
                    <div className="text-muted-foreground">
                      <div className="font-medium break-words max-w-full">{edu.school}</div>
                      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-sm mt-1 w-full">
                        <div className="flex items-center gap-1 min-w-0 max-w-full truncate">
                          <MapPin className="h-4 w-4 shrink-0" />
                          <span className="truncate block max-w-xs sm:max-w-[200px] md:max-w-[300px] lg:max-w-[250px] xl:max-w-[300px]" title={edu.location}>{edu.location}</span>
                        </div>
                        <div className="flex items-center gap-1 min-w-0">
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span className="truncate block max-w-[120px]" title={edu.period}>{edu.period}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground break-words max-w-full">{edu.details}</p>
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