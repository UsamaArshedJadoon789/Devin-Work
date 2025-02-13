import { HeroSection } from "../../components/sections/HeroSection"
import { ServiceCard } from "../../components/ui/ServiceCard"
import { FeaturesBanner } from "../../components/ui/FeaturesBanner"
import { ContactForm } from "../../components/ui/ContactForm"
import { Fragment, type ReactNode } from "react"
import { Database, Settings, LineChart, Users, Shield, Cloud } from "lucide-react"

export function ErpDevelopmentPage(): ReactNode {
  const services = [
    { title: "Business Process Automation", description: "Streamline operations and workflows", icon: <Settings className="h-6 w-6" /> },
    { title: "Data Management", description: "Centralized data organization", icon: <Database className="h-6 w-6" /> },
    { title: "Resource Planning", description: "Efficient resource allocation", icon: <Users className="h-6 w-6" /> },
    { title: "Analytics & Reporting", description: "Business intelligence insights", icon: <LineChart className="h-6 w-6" /> },
    { title: "Security & Compliance", description: "Enterprise-grade security", icon: <Shield className="h-6 w-6" /> },
    { title: "Cloud Integration", description: "Seamless cloud deployment", icon: <Cloud className="h-6 w-6" /> }
  ]

  return (
    <Fragment>
      <HeroSection
        title="ERP DEVELOPMENT"
        subtitle="Transform your business operations with comprehensive enterprise resource planning solutions."
      />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#0A3157]">
            Our ERP Services
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
          { text: "Process Automation", icon: <Settings className="h-6 w-6" /> },
          { text: "Data Security", icon: <Shield className="h-6 w-6" /> },
          { text: "Cloud Ready", icon: <Cloud className="h-6 w-6" /> }
        ]}
      />
      <ContactForm />
    </Fragment>
  )
}
