import { HeroSection } from "../../components/ui/HeroSection"
// import { ServiceCard } from "../../components/ui/ServiceCard" // Will be used in implementation phase
import { FeaturesBanner } from "../../components/ui/FeaturesBanner"
import { ContactForm } from "../../components/ui/ContactForm"
import { Fragment } from "react"

export function SearchEnginePlatformPage() {
  return (
    <Fragment>
      <HeroSection
        title="SEARCH ENGINE PLATFORM"
        subtitle="Comprehensive search engine optimization services to boost visibility, traffic, and rankings across major platforms."
      />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Our SEO Services</h2>
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
    </Fragment>
  )
}
