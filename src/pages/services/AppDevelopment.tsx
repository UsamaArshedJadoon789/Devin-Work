import { HeroSection } from "../../components/ui/HeroSection"
import { ServiceCard } from "../../components/ui/ServiceCard"
import { FeaturesBanner } from "../../components/ui/FeaturesBanner"
import { ContactForm } from "../../components/ui/ContactForm"
import { ReactNode } from "react"

export function AppDevelopmentPage() {
  return (
    <>
      <HeroSection
        title="APP DEVELOPMENT"
        subtitle="Custom app development services to bring your ideas to life with innovative, user-friendly, and scalable solutions."
      />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Our App Development Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Service cards will be added in the implementation phase */}
          </div>
        </div>
      </section>
      <FeaturesBanner
        features={[
          { text: "AI-Driven Solution", icon: null },
          { text: "High Security", icon: null },
          { text: "Leading Code", icon: null }
        ]}
      />
      <section className="py-20 bg-gray-50">
        <ContactForm />
      </section>
    </>
  )
}
