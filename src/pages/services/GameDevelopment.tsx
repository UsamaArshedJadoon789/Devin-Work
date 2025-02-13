import { HeroSection } from "../../components/sections/HeroSection"
import { ServiceCard } from "../../components/ui/ServiceCard"
import { FeaturesBanner } from "../../components/ui/FeaturesBanner"
import { ContactForm } from "../../components/ui/ContactForm"
import { Fragment } from "react"
import { Gamepad, Monitor, Code, Cpu, Zap, Users } from "lucide-react"

export function GameDevelopmentPage() {
  const services = [
    { title: "2D Game Development", description: "Create engaging 2D games and experiences", icon: <Gamepad className="h-6 w-6" /> },
    { title: "3D Game Development", description: "Immersive 3D game environments", icon: <Monitor className="h-6 w-6" /> },
    { title: "Game Engine Development", description: "Custom game engine solutions", icon: <Code className="h-6 w-6" /> },
    { title: "Game Optimization", description: "Performance and graphics optimization", icon: <Cpu className="h-6 w-6" /> },
    { title: "Multiplayer Integration", description: "Real-time multiplayer features", icon: <Users className="h-6 w-6" /> },
    { title: "Game Testing & QA", description: "Comprehensive testing and debugging", icon: <Zap className="h-6 w-6" /> }
  ]

  return (
    <Fragment>
      <HeroSection
        title="GAME DEVELOPMENT"
        subtitle="Create immersive and engaging gaming experiences that captivate players and deliver unforgettable entertainment."
      />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#0A3157]">
            Our Game Development Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>
      <FeaturesBanner
        features={[
          { text: "High Performance", icon: <Cpu className="h-6 w-6" /> },
          { text: "Cross Platform", icon: <Monitor className="h-6 w-6" /> },
          { text: "Multiplayer Ready", icon: <Users className="h-6 w-6" /> }
        ]}
      />
      <ContactForm />
    </Fragment>
  )
}
