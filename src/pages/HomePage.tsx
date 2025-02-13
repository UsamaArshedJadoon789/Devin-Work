import { HeroSection } from "../components/sections/HeroSection"
import { ServicesGrid } from "../components/sections/ServicesGrid"
import { FeaturesBanner } from "../components/ui/FeaturesBanner"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection 
        title="Transform Your Digital Presence" 
        subtitle="We help businesses grow with innovative digital solutions and cutting-edge technology."
      />
      <ServicesGrid />
      <FeaturesBanner />
    </div>
  )
}
