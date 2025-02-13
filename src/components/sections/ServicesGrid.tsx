import { Database, Smartphone, Gamepad, LineChart, ShoppingCart, Video, Search, Briefcase, Code, Settings } from "lucide-react"
import { ServiceCard } from "../ui/ServiceCard"

export function ServicesGrid() {
  const services = [
    { title: "Website Development", description: "Create stunning and functional websites with modern technologies", icon: <Code className="h-6 w-6" />, link: "/services/website-development" },
    { title: "App Development", description: "Build powerful and scalable mobile applications", icon: <Smartphone className="h-6 w-6" />, link: "/services/app-development" },
    { title: "Game Development", description: "Create immersive gaming experiences", icon: <Gamepad className="h-6 w-6" />, link: "/services/game-development" },
    { title: "Digital Marketing", description: "Boost your online presence and reach", icon: <LineChart className="h-6 w-6" />, link: "/services/digital-marketing" },
    { title: "Amazon Services", description: "Grow and scale your Amazon business", icon: <ShoppingCart className="h-6 w-6" />, link: "/services/amazon-services" },
    { title: "Video Editing", description: "Professional video production and editing", icon: <Video className="h-6 w-6" />, link: "/services/video-editing" },
    { title: "Search Engine Platform", description: "Improve visibility and search rankings", icon: <Search className="h-6 w-6" />, link: "/services/search-engine-platform" },
    { title: "Branding & Creative", description: "Build a strong brand identity", icon: <Briefcase className="h-6 w-6" />, link: "/services/branding-creative" },
    { title: "CRM Solutions", description: "Streamline customer relationships", icon: <Database className="h-6 w-6" />, link: "/services/crm-solutions" },
    { title: "ERP Development", description: "Optimize business operations", icon: <Settings className="h-6 w-6" />, link: "/services/erp-development" }
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
