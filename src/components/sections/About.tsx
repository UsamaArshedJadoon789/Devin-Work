// Removed unused React import since we use JSX transform
import { motion } from "framer-motion"
import { ScrollFadeIn } from "../animations/PageAnimations"
import { GradientText } from "../ui/gradient-text"

const partnerLogos = [
  "/images/clients/attest.svg",
  "/images/clients/flodesk.svg",
  "/images/clients/hubspot.svg",
  "/images/clients/notion.svg",
  "/images/clients/shopify.svg",
  "/images/clients/webflow.svg"
]

export const About = (): JSX.Element => {
  return (
    <ScrollFadeIn>
      <section className="container">
        {/* Partner Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {partnerLogos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="w-32 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img 
                src={logo} 
                alt="Partner Logo" 
                className="max-w-full max-h-full object-contain"
              />
            </motion.div>
          ))}
        </div>

        {/* About Content */}
        <div className="mt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl font-bold motion-safe:animate-fade-in-down animate-duration-700">
              <GradientText>About Us</GradientText>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 max-w-4xl mx-auto"
          >
            <p className="text-2xl text-gray-300 leading-relaxed motion-safe:animate-fade-in motion-safe:animate-slide-in animate-delay-200">
              At <span className="text-accent">Gen Marketing</span> we are passionate about crafting impactful strategies that resonate with your audience. With a focus on innovation and creativity, we deliver tailored solutions that drive results and foster long-term growth for your brand. From brand development to campaign execution, we're committed to <span className="text-accent">helping you achieve your business objectives.</span>
            </p>
          </motion.div>
        </div>
      </section>
    </ScrollFadeIn>
  )
}
