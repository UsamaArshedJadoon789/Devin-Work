import { HeroSection } from "../../components/sections/HeroSection"
import { ServiceCard } from "../../components/ui/ServiceCard"
import { FeaturesBanner } from "../../components/ui/FeaturesBanner"
import { ContactForm } from "../../components/ui/ContactForm"
import { Fragment } from "react"
import { Code, Layout, Smartphone, Globe, Shield, Zap } from "lucide-react"

export function WebsiteDevelopmentPage() {
  const services = [
    { title: "Custom Website Development", description: "Tailored solutions for your unique business needs", icon: <Code className="h-6 w-6" /> },
    { title: "Responsive Design", description: "Mobile-first approach for all screen sizes", icon: <Smartphone className="h-6 w-6" /> },
    { title: "E-commerce Solutions", description: "Secure and scalable online stores", icon: <Layout className="h-6 w-6" /> },
    { title: "CMS Integration", description: "Easy content management systems", icon: <Globe className="h-6 w-6" /> },
    { title: "Website Security", description: "Advanced security measures and SSL", icon: <Shield className="h-6 w-6" /> },
    { title: "Performance Optimization", description: "Fast loading and optimized code", icon: <Zap className="h-6 w-6" /> }
  ]

  return (
    <Fragment>
      <HeroSection
        title="WEBSITE DEVELOPMENT"
        subtitle="Create stunning and functional websites that drive growth and engagement for your business."
      />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#0A3157]">
            Our Website Development Services
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
          { text: "Modern Technologies", icon: <Code className="h-6 w-6" /> },
          { text: "Responsive Design", icon: <Smartphone className="h-6 w-6" /> },
          { text: "SEO Optimized", icon: <Globe className="h-6 w-6" /> }
        ]}
      />
      <ContactForm />
    </Fragment>
  )
}
