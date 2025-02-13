import { HeroSection } from "../../components/sections/HeroSection"
import { ServiceCard } from "../../components/ui/ServiceCard"
import { FeaturesBanner } from "../../components/ui/FeaturesBanner"
import { ContactForm } from "../../components/ui/ContactForm"
import { Fragment } from "react"
import { ShoppingCart, Search, BarChart, Package, Shield, Settings } from "lucide-react"

export function AmazonServicesPage() {
  const services = [
    { title: "Account Management", description: "Professional Amazon account setup and management", icon: <ShoppingCart className="h-6 w-6" /> },
    { title: "Product Listing", description: "Optimized product listings and content", icon: <Package className="h-6 w-6" /> },
    { title: "SEO Optimization", description: "Amazon SEO and keyword optimization", icon: <Search className="h-6 w-6" /> },
    { title: "PPC Management", description: "Strategic Amazon advertising campaigns", icon: <BarChart className="h-6 w-6" /> },
    { title: "Brand Protection", description: "Brand registry and protection services", icon: <Shield className="h-6 w-6" /> },
    { title: "Performance Analytics", description: "Sales analytics and optimization", icon: <Settings className="h-6 w-6" /> }
  ]

  return (
    <Fragment>
      <HeroSection
        title="AMAZON SERVICES"
        subtitle="Maximize your success on Amazon with comprehensive marketplace solutions and strategic optimization."
      />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#0A3157]">
            Our Amazon Services
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
          { text: "Sales Growth", icon: <BarChart className="h-6 w-6" /> },
          { text: "Brand Security", icon: <Shield className="h-6 w-6" /> },
          { text: "Market Reach", icon: <ShoppingCart className="h-6 w-6" /> }
        ]}
      />
      <ContactForm />
    </Fragment>
  )
}
