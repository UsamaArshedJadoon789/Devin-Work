import { ScrollFadeIn } from "@/components/animations/PageAnimations"
import { Card, CardContent } from "@/components/ui/card"

export const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform Redesign",
      description: "Complete redesign and development of an e-commerce platform, resulting in 150% increase in conversion rates",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3",
      tags: ["E-commerce", "UI/UX", "Web Development"]
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Native iOS and Android app development for a fitness tracking platform with 50,000+ downloads",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3",
      tags: ["Mobile", "iOS", "Android"]
    },
    {
      id: 3,
      title: "Digital Marketing Campaign",
      description: "Comprehensive digital marketing strategy that increased organic traffic by 200%",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3",
      tags: ["Marketing", "SEO", "Analytics"]
    }
  ]

  return (
    <ScrollFadeIn>
      <section className="container mx-auto py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4 motion-safe:animate-fade-in-down animate-duration-700">
            Our Portfolio
          </h1>
          <p className="text-lg text-gray-300 motion-safe:animate-fade-in motion-safe:animate-slide-in animate-delay-200">
            Explore our successful projects
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id}
              className="group bg-white/10 backdrop-blur border-none text-white transform-gpu hover:scale-105 hover:rotate-3 transition-all duration-500 motion-safe:animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold mt-4 mb-2 group-hover:translate-y-1 transition-transform">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 motion-safe:animate-slide-in" style={{ animationDelay: `${index * 150 + 100}ms` }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-white/20 px-2 py-1 rounded text-sm hover:skew-x-6 transition-transform"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </ScrollFadeIn>
  )
}
