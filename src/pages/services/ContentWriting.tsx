import React, { Fragment, type ReactNode } from "react"
import { HeroSection } from "../../components/sections/HeroSection"
import { ServiceCard } from "../../components/ui/ServiceCard"
import { FeaturesBanner } from "../../components/ui/FeaturesBanner"
import { ContactForm } from "../../components/ui/ContactForm"
import { FileText, Edit, Book, Globe, MessageSquare, Search } from "lucide-react"

export function ContentWritingPage(): ReactNode {
  const services = [
    { title: "Blog Writing", description: "Engaging blog posts and articles", icon: <FileText className="h-6 w-6" /> },
    { title: "SEO Content", description: "Search engine optimized content", icon: <Search className="h-6 w-6" /> },
    { title: "Technical Writing", description: "Documentation and guides", icon: <Book className="h-6 w-6" /> },
    { title: "Copywriting", description: "Marketing and promotional copy", icon: <Edit className="h-6 w-6" /> },
    { title: "Web Content", description: "Website and landing pages", icon: <Globe className="h-6 w-6" /> },
    { title: "Social Media Content", description: "Engaging social media posts", icon: <MessageSquare className="h-6 w-6" /> }
  ]

  return (
    <Fragment>
      <HeroSection
        title="CONTENT WRITING"
        subtitle="Create compelling content that engages your audience and drives conversions with our professional writing services."
      />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#0A3157]">
            Our Content Writing Services
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
          { text: "SEO Optimized", icon: <Search className="h-6 w-6" /> },
          { text: "Engaging Copy", icon: <Edit className="h-6 w-6" /> },
          { text: "Global Reach", icon: <Globe className="h-6 w-6" /> }
        ]}
      />
      <ContactForm />
    </Fragment>
  )
}
