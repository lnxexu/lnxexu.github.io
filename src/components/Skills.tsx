import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        "React", "TypeScript", "Next.js", "Vue.js", "MMKV", "Redux",
        "Watermelon DB", "JavaScript", "HTML5", "CSS3", "Responsive Design"
      ]
    },
    {
      title: "Backend",
      skills: [
        "Node.js", "Python", "Django", "FastAPI", "NoSQL",
        "PostgreSQL", "MongoDB", "Redis", "REST APIs", "GraphQL", "NestJS"
      ]
    },
    {
      title: "DevOps & Tools",
      skills: [
         "Git", "GitHub Actions", "Cypress", "Vite", "ESLint", "Prettier", "LucidChart"
      ]
    },
    {
      title: "Mobile & Other",
      skills: [
        "React Native", "Flutter", "Figma", "Agile", "Supabase", "Vercel", "Netlify", "Railway"
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">Skills & Technologies</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit built through years of experience and continuous learning. 
            I'm always exploring new technologies and expanding my skill set.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary" 
                      className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}