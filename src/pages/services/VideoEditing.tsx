import { HeroSection } from "../../components/sections/HeroSection"
import { ServiceCard } from "../../components/ui/ServiceCard"
import { FeaturesBanner } from "../../components/ui/FeaturesBanner"
import { ContactForm } from "../../components/ui/ContactForm"
import { Fragment } from "react"
import { Video, Film, Camera, Music, Play, Settings } from "lucide-react"

export function VideoEditingPage() {
  const services = [
    { title: "Commercial Video Editing", description: "Professional commercial and promotional videos", icon: <Video className="h-6 w-6" /> },
    { title: "Film Post-Production", description: "Comprehensive film editing and effects", icon: <Film className="h-6 w-6" /> },
    { title: "Motion Graphics", description: "Dynamic motion graphics and animations", icon: <Camera className="h-6 w-6" /> },
    { title: "Sound Design", description: "Professional audio editing and mixing", icon: <Music className="h-6 w-6" /> },
    { title: "Content Creation", description: "Social media and marketing content", icon: <Play className="h-6 w-6" /> },
    { title: "Color Grading", description: "Professional color correction and grading", icon: <Settings className="h-6 w-6" /> }
  ]

  return (
    <Fragment>
      <HeroSection
        title="VIDEO EDITING"
        subtitle="Transform your raw footage into compelling visual stories with professional video editing and post-production."
      />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#0A3157]">
            Our Video Editing Services
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
          { text: "Professional Quality", icon: <Film className="h-6 w-6" /> },
          { text: "Fast Turnaround", icon: <Play className="h-6 w-6" /> },
          { text: "Creative Effects", icon: <Camera className="h-6 w-6" /> }
        ]}
      />
      <ContactForm />
    </Fragment>
  )
}
