import * as React from "react"
import { motion } from "framer-motion"
import { GradientText } from "../ui/gradient-text"
import { CardHover } from "../ui/card-hover"
import { ScrollFadeIn } from "../animations/PageAnimations"

const services = [
  {
    title: "Brand Strategy and Development",
    description: "Empowering brands with innovative strategies for digital success. Elevate your online presence and engage your audience effectively.",
    image: "/images/services/brand-strategy.jpg"
  },
  {
    title: "Creative Digital Marketing",
    description: "Transform your brand's digital presence with our creative digital marketing solutions. From captivating content to targeted campaigns.",
    image: "/images/services/digital-marketing.jpg"
  },
  {
    title: "Marketing Analytics and Reporting",
    description: "Elevate your marketing strategy with our robust analytics and reporting services. Gain insights, track performance metrics for maximum ROI.",
    image: "/images/services/analytics.jpg"
  },
  {
    title: "Event and Content Marketing",
    description: "Engage your audience and create memorable experiences with our event and content marketing expertise.",
    image: "/images/services/content-marketing.jpg"
  }
]

export const Services = (): JSX.Element => (
  <ScrollFadeIn>
    <section className="container">
      <div className="text-center">
        <h2 className="motion-safe:animate-fade-in-down animate-duration-700">
          <GradientText>Our Services</GradientText>
        </h2>
        <p className="max-w-2xl mx-auto motion-safe:animate-fade-in motion-safe:animate-slide-in animate-delay-200 animate-duration-500">
          Explore our comprehensive range of services designed to amplify your brand's presence
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="transform-gpu"
          >
            <CardHover 
              className="group relative bg-secondary/50 backdrop-blur border border-white/5 rounded-xl transition-all duration-500 hover:scale-105 hover:bg-secondary/70 hover:border-accent/20 motion-safe:hover:animate-wiggle"
            >
              <div className="overflow-hidden rounded-t-xl">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white transition-all duration-300 group-hover:text-accent group-hover:translate-y-1">{service.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed transition-colors duration-300 group-hover:text-white/90 motion-safe:animate-slide-in" style={{ animationDelay: `${index * 150 + 100}ms` }}>{service.description}</p>
                <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2">
                  <span className="text-accent motion-safe:group-hover:animate-pulse">Learn more</span>
                  <span className="text-accent motion-safe:animate-bounce">→</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"/>
            </CardHover>
          </motion.div>
        ))}
      </div>
    </section>
  </ScrollFadeIn>
)
