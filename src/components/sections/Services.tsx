import { type JSX } from "react"
import { CardHover } from "../ui/card-hover"
import { GradientText } from "../ui/gradient-text"
import { motion } from "framer-motion"
import { staggerContainer, staggerItem } from "@/lib/animations"
import Reveal from "react-reveal/Fade"

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

export const Services = (): JSX.Element => (
  <motion.section 
    className="w-full py-32"
    initial="initial"
    animate="animate"
    variants={staggerContainer}
  >
    <Reveal bottom cascade>
      <div className="text-center mb-20 px-8">
        <motion.h2 
          className="text-5xl font-bold mb-6 max-w-4xl mx-auto"
          variants={staggerItem}
        >
          <GradientText>Our Services</GradientText>
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 max-w-2xl mx-auto"
          variants={staggerItem}
        >
          Comprehensive SEO solutions for your business growth
        </motion.p>
      </div>
    </Reveal>
    <motion.div 
      className="grid md:grid-cols-3 gap-8 px-8 w-full"
      variants={staggerContainer}
    >
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          variants={staggerItem}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: index * 0.1 }}
        >
          <CardHover 
            className="bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-8"
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
  </motion.section>
)
