import * as React from "react"
import { motion } from "framer-motion"
import { ScrollFadeIn } from "../animations/PageAnimations"
import { GradientText } from "../ui/gradient-text"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Event and Content Marketing for STU Travel",
    description: "Managed and promoted STU Travel's virtual event, attracting a global audience and increasing brand recognition in the travel and tourism sector.",
    image: "/images/portfolio/event-marketing.jpg",
    year: 2023
  },
  {
    id: 2,
    title: "Social Media Marketing for Maria Fashion",
    description: "Launched a highly engaging social media campaign for Maria Fashion, resulting in a 30% increase in brand awareness and a significant boost in online sales.",
    image: "/images/portfolio/social-marketing.jpg",
    year: 2023
  },
  {
    id: 3,
    title: "Content Marketing for GHI Health",
    description: "Developed and executed a content marketing strategy for GHI Health, creating valuable and informative content that positioned them as industry leaders.",
    image: "/images/portfolio/content-marketing.jpg",
    year: 2024
  },
  {
    id: 4,
    title: "Email Marketing Automation for JKL Fitness",
    description: "Set up personalized email marketing automation for JKL Fitness, resulting in higher customer engagement, increased conversions, and improved customer retention.",
    image: "/images/portfolio/email-marketing.jpg",
    year: 2024
  }
]

export const Portfolio = (): JSX.Element => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  return (
    <ScrollFadeIn>
      <section className="container">
        <div className="text-center">
          <h2 className="text-5xl font-bold motion-safe:animate-fade-in-down animate-duration-700">
            <GradientText>Portfolio</GradientText>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto motion-safe:animate-fade-in motion-safe:animate-slide-in animate-delay-200 animate-duration-500">
            Dive into our portfolio showcasing a diverse range of successful campaigns and projects.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="transform-gpu"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card 
                className="group bg-secondary/50 backdrop-blur border border-white/5 rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:bg-secondary/70 hover:border-accent/20"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500"
                      style={{
                        transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mt-2 motion-safe:animate-slide-in" style={{ animationDelay: `${index * 150 + 100}ms` }}>
                      {project.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-accent">Year: {project.year}</span>
                      <span className="text-accent motion-safe:group-hover:animate-bounce">→</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="group border-white/20 text-gray-300 hover:bg-accent hover:text-black hover:border-accent"
          >
            <span>See all our projects</span>
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </ScrollFadeIn>
  )
}
