import { HeroSection } from "../../components/sections/HeroSection"
import { ServiceCard } from "../../components/ui/ServiceCard"
import { FeaturesBanner } from "../../components/ui/FeaturesBanner"
import { ContactForm } from "../../components/ui/ContactForm"
import { Fragment } from "react"
import { Palette, Image, Layout, Type, Briefcase, Megaphone } from "lucide-react"

export function BrandingCreativePage() {
  const services = [
    { title: "Brand Identity", description: "Develop unique brand identity and guidelines", icon: <Briefcase className="h-6 w-6" /> },
    { title: "Logo Design", description: "Professional and memorable logo creation", icon: <Palette className="h-6 w-6" /> },
    { title: "Visual Design", description: "Engaging visual content and graphics", icon: <Image className="h-6 w-6" /> },
    { title: "UI/UX Design", description: "User-centered interface design", icon: <Layout className="h-6 w-6" /> },
    { title: "Brand Strategy", description: "Strategic brand positioning and messaging", icon: <Megaphone className="h-6 w-6" /> },
    { title: "Typography", description: "Custom typography and font selection", icon: <Type className="h-6 w-6" /> }
  ]

  return (
    <Fragment>
      <HeroSection
        title="BRANDING & CREATIVE"
        subtitle="Build a strong and memorable brand identity that resonates with your audience and drives business growth."
      />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#0A3157]">
            Our Branding Services
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
          { text: "Creative Design", icon: <Palette className="h-6 w-6" /> },
          { text: "Brand Strategy", icon: <Briefcase className="h-6 w-6" /> },
          { text: "Visual Impact", icon: <Image className="h-6 w-6" /> }
        ]}
      />
      <ContactForm />
    </Fragment>
  )
}
