import { HeroSection } from "../../components/sections/HeroSection"
import { ServiceCard } from "../../components/ui/ServiceCard"
import { FeaturesBanner } from "../../components/ui/FeaturesBanner"
import { ContactForm } from "../../components/ui/ContactForm"
import { Fragment } from "react"
import { Search, Globe, LineChart, Target, BarChart, Settings } from "lucide-react"

export function SearchEnginePlatformPage() {
  const services = [
    { title: "Technical SEO", description: "Website optimization and performance", icon: <Settings className="h-6 w-6" /> },
    { title: "On-Page SEO", description: "Content optimization and structure", icon: <Search className="h-6 w-6" /> },
    { title: "Off-Page SEO", description: "Link building and authority", icon: <Globe className="h-6 w-6" /> },
    { title: "Local SEO", description: "Local search optimization", icon: <Target className="h-6 w-6" /> },
    { title: "SEO Analytics", description: "Performance tracking and insights", icon: <LineChart className="h-6 w-6" /> },
    { title: "Competitor Analysis", description: "Market research and strategy", icon: <BarChart className="h-6 w-6" /> }
  ]

  return (
    <Fragment>
      <HeroSection
        title="SEARCH ENGINE PLATFORM"
        subtitle="Boost your online visibility and drive organic traffic with comprehensive search engine optimization solutions."
      />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#0A3157]">
            Our SEO Services
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
          { text: "Data Analytics", icon: <LineChart className="h-6 w-6" /> },
          { text: "Global Reach", icon: <Globe className="h-6 w-6" /> },
          { text: "ROI Focused", icon: <Target className="h-6 w-6" /> }
        ]}
      />
      <ContactForm />
    </Fragment>
  )
}
