import { HeroSection } from "../components/ui/HeroSection"
import { ServiceCard } from "../components/ui/ServiceCard"
import { FeaturesBanner } from "../components/ui/FeaturesBanner"
import { ContactForm } from "../components/ui/ContactForm"
import { Code, Smartphone, Gamepad, LineChart, ShoppingCart, Video, Search, Briefcase, Database, Brain } from "lucide-react"
import { ReactNode } from "react"

export function HomePage() {
  const services = [
    { title: "Website Development", description: "Create stunning and functional websites", icon: <Code /> },
    { title: "App Development", description: "Build powerful mobile applications", icon: <Smartphone /> },
    { title: "Game Development", description: "Create engaging gaming experiences", icon: <Gamepad /> },
    { title: "Digital Marketing", description: "Boost your online presence", icon: <LineChart /> },
    { title: "Amazon Services", description: "Grow your Amazon business", icon: <ShoppingCart /> },
    { title: "Video Editing", description: "Professional video production", icon: <Video /> },
    { title: "Search Engine Platform", description: "Improve your search rankings", icon: <Search /> },
    { title: "Branding & Creative", description: "Build your brand identity", icon: <Briefcase /> },
    { title: "CRM Solutions", description: "Manage customer relationships", icon: <Database /> },
    { title: "ERP Development", description: "Streamline business operations", icon: <Brain /> }
  ]

  return (
    <>
      <HeroSection
        title="AUTOMATION IS A MUST FOR YOUR BRAND'S SUCCESS"
        subtitle="Transform your business with our cutting-edge solutions"
      />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">OUR SERVICES</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>
      <FeaturesBanner
        features={[
          { text: "AI-Driven Solution", icon: <Brain className="h-6 w-6" /> },
          { text: "High Security", icon: <Database className="h-6 w-6" /> },
          { text: "Leading Code", icon: <Code className="h-6 w-6" /> }
        ]}
      />
      <section className="py-20 bg-gray-50">
        <ContactForm />
      </section>
    </>
  )
}
