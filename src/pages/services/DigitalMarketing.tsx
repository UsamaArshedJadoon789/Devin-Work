import { HeroSection } from "../../components/sections/HeroSection"
import { ServiceCard } from "../../components/ui/ServiceCard"
import { FeaturesBanner } from "../../components/ui/FeaturesBanner"
import { ContactForm } from "../../components/ui/ContactForm"
import { Fragment } from "react"
import { LineChart, Search, Mail, Share2, Target, BarChart } from "lucide-react"

export function DigitalMarketingPage() {
  const services = [
    { title: "SEO Optimization", description: "Improve search engine rankings and visibility", icon: <Search className="h-6 w-6" /> },
    { title: "Social Media Marketing", description: "Engage and grow your social presence", icon: <Share2 className="h-6 w-6" /> },
    { title: "Email Marketing", description: "Targeted email campaigns and automation", icon: <Mail className="h-6 w-6" /> },
    { title: "PPC Advertising", description: "Results-driven paid advertising", icon: <Target className="h-6 w-6" /> },
    { title: "Analytics & Reporting", description: "Data-driven marketing insights", icon: <LineChart className="h-6 w-6" /> },
    { title: "Conversion Optimization", description: "Improve conversion rates and ROI", icon: <BarChart className="h-6 w-6" /> }
  ]

  return (
    <Fragment>
      <HeroSection
        title="DIGITAL MARKETING"
        subtitle="Drive growth and engagement with data-driven digital marketing strategies that deliver measurable results."
      />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#0A3157]">
            Our Digital Marketing Services
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
          { text: "Data-Driven", icon: <LineChart className="h-6 w-6" /> },
          { text: "ROI Focused", icon: <Target className="h-6 w-6" /> },
          { text: "Multi-Channel", icon: <Share2 className="h-6 w-6" /> }
        ]}
      />
      <ContactForm />
    </Fragment>
  )
}
