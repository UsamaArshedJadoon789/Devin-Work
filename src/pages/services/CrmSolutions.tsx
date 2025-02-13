import { HeroSection } from "../../components/sections/HeroSection"
import { ServiceCard } from "../../components/ui/ServiceCard"
import { FeaturesBanner } from "../../components/ui/FeaturesBanner"
import { ContactForm } from "../../components/ui/ContactForm"
import { Fragment, type ReactNode } from "react"
import { Users, Database, MessageSquare, BarChart, Settings, Mail } from "lucide-react"

export function CrmSolutionsPage() {
  const services = [
    { title: "Contact Management", description: "Centralized customer data management", icon: <Users className="h-6 w-6" /> },
    { title: "Sales Automation", description: "Streamline sales processes and tasks", icon: <Database className="h-6 w-6" /> },
    { title: "Customer Support", description: "Integrated support and ticketing", icon: <MessageSquare className="h-6 w-6" /> },
    { title: "Analytics & Reporting", description: "Customer insights and reporting", icon: <BarChart className="h-6 w-6" /> },
    { title: "Workflow Automation", description: "Automated business processes", icon: <Settings className="h-6 w-6" /> },
    { title: "Email Integration", description: "Seamless email communication", icon: <Mail className="h-6 w-6" /> }
  ]

  return (
    <Fragment>
      <HeroSection
        title="CRM SOLUTIONS"
        subtitle="Streamline customer relationships and boost business efficiency with our comprehensive CRM solutions."
      />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#0A3157]">
            Our CRM Services
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
          { text: "Data Insights", icon: <BarChart className="h-6 w-6" /> },
          { text: "Automation", icon: <Settings className="h-6 w-6" /> },
          { text: "Integration", icon: <Database className="h-6 w-6" /> }
        ]}
      />
      <ContactForm />
    </Fragment>
  )
}
