import * as React from "react"
import { motion } from "framer-motion"
import { CardHover } from "../ui/card-hover"
import { GradientText } from "../ui/gradient-text"

const services = [
  {
    title: "SEO Strategy",
    description: "Drive organic growth with data-driven SEO strategies tailored for SaaS companies",
    icon: "🎯"
  },
  {
    title: "Content Marketing",
    description: "Create high-quality content that ranks and converts your target audience",
    icon: "📝"
  },
  {
    title: "Technical SEO",
    description: "Optimize your website's technical foundation for better search performance",
    icon: "⚙️"
  },
  {
    title: "Link Building",
    description: "Build high-quality backlinks that boost your domain authority",
    icon: "🔗"
  },
  {
    title: "Analytics & Reporting",
    description: "Track and measure your SEO performance with detailed analytics",
    icon: "📊"
  },
  {
    title: "Local SEO",
    description: "Dominate local search results and attract nearby customers",
    icon: "📍"
  }
]

export const Services: React.FC = () => (
  <section className="container mx-auto px-4 py-32">
    <div className="text-center mb-20">
      <h2 className="text-5xl font-bold mb-6 animate-fade-in">
        <GradientText>Our Services</GradientText>
      </h2>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-slide-up delay-100">
        Comprehensive SEO solutions for your business growth
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-8 animate-slide-up delay-200">
      {services.map((service) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <CardHover 
            className="bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-8"
          >
          <div className="text-4xl mb-6">{service.icon}</div>
          <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
          <p className="text-gray-300 text-lg leading-relaxed">{service.description}</p>
        </CardHover>
        </motion.div>
      ))}
    </div>
  </section>
)
