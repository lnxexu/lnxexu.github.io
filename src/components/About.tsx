import { Card, CardContent } from "./ui/card";
import { Code, Lightbulb, Users, Target } from "lucide-react";

export function About() {
  const values = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code that stands the test of time."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Constantly learning new technologies and finding creative solutions to complex problems."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working effectively with cross-functional teams to deliver exceptional products."
    },
    {
      icon: Target,
      title: "Results",
      description: "Focused on delivering measurable impact and value through technology solutions."
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate developer with over 5 years of experience building web applications 
            and solving complex technical challenges. I love turning ideas into reality through code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl mb-6">My Journey</h3>
            <p className="text-muted-foreground mb-4">
              My journey in software development began during my senior-high days at University of Immaculate Conception (Bonifacio Campus), where I 
              discovered my passion for creating digital solutions. Since then, I've worked on 
              diverse projects ranging from small functional projects into mobile applications.
            </p>
            <p className="text-muted-foreground mb-4">
              I believe in the power of technology to solve real-world problems and improve people's 
              lives. Whether it's optimizing performance, enhancing user experience, or implementing 
              new features, I approach every challenge with curiosity and determination.
            </p>
            <p className="text-muted-foreground">
              When I'm not coding, you'll find me playing video games, playing in a band, or exploring new music. I also enjoy walking and spending time outdoors to recharge and find inspiration.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map((value, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <value.icon className="h-8 w-8 text-primary mb-4" />
                  <h4 className="mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}