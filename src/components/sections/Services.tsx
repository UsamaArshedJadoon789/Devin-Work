import { type JSX } from "react"
import { CardHover } from "../ui/card-hover"
import { GradientText } from "../ui/gradient-text"
import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/animations"
import { ThreeScene } from "../ThreeScene"

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

export const Services = (): JSX.Element => {
  return (
  <motion.section 
    className="w-full py-32 relative bg-[#0A0A0A] overflow-hidden"
    initial="initial"
    animate="animate"
    variants={staggerContainer}
  >
    <div className="absolute inset-0 z-0">
      <ThreeScene color="#91AD29" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F1923]/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[url('/images/noise/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />
    </div>
    <div className="relative z-10">
      <div className="text-center mb-20 px-8">
        <motion.h2 
          className="text-5xl font-bold mb-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GradientText>Our Services</GradientText>
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Comprehensive SEO solutions for your business growth
        </motion.p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 px-8 w-full">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <CardHover 
              className="bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-8 service-card"
            >
              <motion.div 
                className="text-4xl mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-gray-300 text-lg leading-relaxed">{service.description}</p>
            </CardHover>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
  );
}
