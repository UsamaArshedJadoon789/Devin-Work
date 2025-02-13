import { HeroSection } from "../components/sections/HeroSection"
import { ServicesGrid } from "../components/sections/ServicesGrid"
import { AboutSection } from "../components/sections/AboutSection"
import { FeaturesBanner } from "../components/ui/FeaturesBanner"
import { ContactForm } from "../components/ui/ContactForm"
import { Fragment } from "react"

export function HomePage() {
  return (
    <Fragment>
      <HeroSection />
      <ServicesGrid />
      <AboutSection />
      <FeaturesBanner
        features={[
          { text: "AI-Driven Solution", icon: null },
          { text: "High Security", icon: null },
          { text: "Leading Code", icon: null }
        ]}
      />
      <ContactForm />
    </Fragment>
  )
export function HomePage() {
  return (
    <Fragment>
      <HeroSection />
      <ServicesGrid />
      <AboutSection />
      <FeaturesBanner
        features={[
          { text: "AI-Driven Solution", icon: null },
          { text: "High Security", icon: null },
          { text: "Leading Code", icon: null }
        ]}
      />
      <ContactForm />
    </Fragment>
  )
}
  ]

  return (
    <>
      <HeroSection
        title="AUTOMATION IS A MUST FOR YOUR BRAND'S SUCCESS"
        subtitle="Transform your business with our cutting-edge solutions"
      />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">OUR SERVICES</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>
      <FeaturesBanner
        features={[
          { text: "AI-Driven Solution", icon: <Brain className="h-6 w-6" /> },
          { text: "High Security", icon: <Database className="h-6 w-6" /> },
          { text: "Leading Code", icon: <Code className="h-6 w-6" /> }
        ]}
      />
      <section className="py-20 bg-gray-50">
        <ContactForm />
      </section>
    </>
  )
}
