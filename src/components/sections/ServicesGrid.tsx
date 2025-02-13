import { Database, Smartphone, Gamepad, LineChart, ShoppingCart, Video, Search, Briefcase, Brain, Code } from "lucide-react"
import { ServiceCard } from "../ui/ServiceCard"


export function ServicesGrid() {
  const services = [
    { title: "Website Development", description: "Create stunning and functional websites", icon: <Code className="h-6 w-6" /> },
    { title: "App Development", description: "Build powerful mobile applications", icon: <Smartphone className="h-6 w-6" /> },
    { title: "Game Development", description: "Create engaging gaming experiences", icon: <Gamepad className="h-6 w-6" /> },
    { title: "Digital Marketing", description: "Boost your online presence", icon: <LineChart className="h-6 w-6" /> },
    { title: "Amazon Services", description: "Grow your Amazon business", icon: <ShoppingCart className="h-6 w-6" /> },
    { title: "Video Editing", description: "Professional video production", icon: <Video className="h-6 w-6" /> },
    { title: "Search Engine Platform", description: "Improve your search rankings", icon: <Search className="h-6 w-6" /> },
    { title: "Branding & Creative", description: "Build your brand identity", icon: <Briefcase className="h-6 w-6" /> },
    { title: "CRM Solutions", description: "Manage customer relationships", icon: <Database className="h-6 w-6" /> },
    { title: "ERP Development", description: "Streamline business operations", icon: <Brain className="h-6 w-6" /> }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#0A3157]">
          OUR SERVICES
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}
