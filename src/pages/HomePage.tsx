import { HeroSection } from "../components/sections/HeroSection"
import { ServicesGrid } from "../components/sections/ServicesGrid"
import { AboutSection } from "../components/sections/AboutSection"
import { FeaturesBanner } from "../components/ui/FeaturesBanner"
import { ContactForm } from "../components/ui/ContactForm"
import { Fragment, type ReactNode } from "react"
import { Brain, Database, Code } from "lucide-react"

export function HomePage(): ReactNode {
  return (
    <Fragment>
      <HeroSection
        title="AUTOMATION IS A MUST FOR YOUR BRAND'S SUCCESS"
        subtitle="Transform your business with our cutting-edge solutions"
      />
      <ServicesGrid />
      <AboutSection />
      <FeaturesBanner
        features={[
          { text: "AI-Driven Solution", icon: <Brain className="h-6 w-6" /> },
          { text: "High Security", icon: <Database className="h-6 w-6" /> },
          { text: "Leading Code", icon: <Code className="h-6 w-6" /> }
        ]}
      />
      <ContactForm />
    </Fragment>
  )
}
