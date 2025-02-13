import { HeroSection } from "../../components/sections/HeroSection"
import { ServiceCard } from "../../components/ui/ServiceCard"
import { FeaturesBanner } from "../../components/ui/FeaturesBanner"
import { ContactForm } from "../../components/ui/ContactForm"
import { Fragment } from "react"
import { Smartphone, Tablet, Cpu, Gauge, Shield, Cloud } from "lucide-react"

export function AppDevelopmentPage() {
  const services = [
    { title: "iOS App Development", description: "Native iOS apps for iPhone and iPad", icon: <Smartphone className="h-6 w-6" /> },
    { title: "Android App Development", description: "Native Android apps for all devices", icon: <Tablet className="h-6 w-6" /> },
    { title: "Cross-Platform Development", description: "Build once, run everywhere solutions", icon: <Cpu className="h-6 w-6" /> },
    { title: "App Performance", description: "Optimized for speed and efficiency", icon: <Gauge className="h-6 w-6" /> },
    { title: "App Security", description: "Secure data handling and encryption", icon: <Shield className="h-6 w-6" /> },
    { title: "Cloud Integration", description: "Seamless cloud service integration", icon: <Cloud className="h-6 w-6" /> }
  ]

  return (
    <Fragment>
      <HeroSection
        title="APP DEVELOPMENT"
        subtitle="Create powerful and intuitive mobile applications that transform user experiences and drive business growth."
      />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#0A3157]">
            Our App Development Services
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
          { text: "Native Performance", icon: <Gauge className="h-6 w-6" /> },
          { text: "Cross-Platform", icon: <Smartphone className="h-6 w-6" /> },
          { text: "Cloud-Enabled", icon: <Cloud className="h-6 w-6" /> }
        ]}
      />
      <ContactForm />
    </Fragment>
  )
}
