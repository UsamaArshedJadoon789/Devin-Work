import React from "react"
import { ServiceCard } from "../ui/ServiceCard"
import { Monitor, Smartphone, Gamepad, Megaphone, ShoppingCart, Video } from "lucide-react"

export function ServicesGrid() {
  const services = [
    {
      title: "Website Development",
      description: "Custom websites that drive results",
      icon: <Monitor className="w-6 h-6" />,
      link: "/services/website-development"
    },
    {
      title: "App Development",
      description: "Native and cross-platform mobile apps",
      icon: <Smartphone className="w-6 h-6" />,
      link: "/services/app-development"
    },
    {
      title: "Game Development",
      description: "Engaging gaming experiences",
      icon: <Gamepad className="w-6 h-6" />,
      link: "/services/game-development"
    },
    {
      title: "Digital Marketing",
      description: "Results-driven marketing strategies",
      icon: <Megaphone className="w-6 h-6" />,
      link: "/services/digital-marketing"
    },
    {
      title: "Amazon Services",
      description: "Complete Amazon business solutions",
      icon: <ShoppingCart className="w-6 h-6" />,
      link: "/services/amazon-services"
    },
    {
      title: "Video Editing",
      description: "Professional video production",
      icon: <Video className="w-6 h-6" />,
      link: "/services/video-editing"
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
          <p className="text-xl text-gray-600">We provide comprehensive digital solutions to help your business grow and succeed in the digital age.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              className="h-full hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
