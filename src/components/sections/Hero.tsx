import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import type { FC } from "react"
import { motion } from "framer-motion"
import { staggerContainer, staggerItem, presets } from "@/lib/animations"
import anime from 'animejs'
import { useEffect, useRef } from "react"
import { ThreeScene } from "../ThreeScene"
import { motion, AnimatePresence } from "framer-motion"

export const Hero: FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (heroRef.current) {
      anime({
        targets: heroRef.current.querySelectorAll('.animate-fade-in'),
        ...presets.fadeUp,
        delay: anime.stagger(100)
      });
    }
  }, []);

  return (
    <motion.section 
      ref={heroRef}
      className="relative min-h-screen w-full bg-[#0A0A0A] overflow-hidden flex flex-col"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#0F1923]/10 via-transparent to-transparent"
        variants={staggerItem}
      />
      <motion.div 
        className="absolute inset-0 bg-[url('/images/noise/noise.png')] opacity-5 mix-blend-overlay pointer-events-none"
        variants={staggerItem}
      />
      <ThreeScene color="#C6F135" />
      
      <div className="w-full flex-1 flex items-center justify-center relative z-10">
        <div className="w-full px-8 relative">
          <div className="relative z-10 mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 lg:mb-8 text-white leading-[1.1] animate-fade-in">
              We Build SEO Revenue Engines For SaaS Brands
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 lg:mb-10 max-w-2xl animate-slide-up delay-100">
              Turn your SEO channel into a growth machine and significantly increase your pipeline and ARR.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-slide-up delay-200">
              <Button 
                className="w-full sm:w-auto bg-[#C6F135] hover:bg-[#D4F55C] text-black font-semibold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full transition-all duration-300"
              >
                Book a Strategy Call
              </Button>
              <Button 
                variant="ghost" 
                className="w-full sm:w-auto text-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full border border-white/20 transition-all duration-300"
              >
                Read stories &amp; opinions
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
            <div className="grid grid-cols-2 gap-4 p-6">
              <div className="space-y-4">
                <div className="bg-[#1A2730] rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <img src="/images/hero-grid/team-collaboration.jpg" alt="Team Collaboration" className="w-full h-32 object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="bg-[#1A2730] rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <img src="/images/hero-grid/data-analytics.jpg" alt="Data Analytics" className="w-full h-32 object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="space-y-4 mt-20">
                <div className="bg-[#1A2730] rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <img src="/images/hero-grid/seo-strategy.jpg" alt="SEO Strategy" className="w-full h-32 object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="bg-[#1A2730] rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <img src="/images/hero-grid/growth-chart.jpg" alt="Growth Chart" className="w-full h-32 object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
          </div>
        </div>

        <motion.div 
          className="absolute top-[45%] -right-[15%] w-[420px] rounded-2xl bg-[#0F1923] p-8 shadow-2xl"
          initial={{ x: 100, rotate: 3, opacity: 0 }}
          animate={{ x: 0, rotate: 3, opacity: 1 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <motion.div 
            className="flex items-center gap-4 mb-8"
            variants={staggerItem}
          >
            <motion.div 
              className="w-14 h-14 rounded-full bg-[#C6F135] flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </motion.div>
            <div>
              <motion.h3 
                className="text-white font-semibold text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >Turn your SEO into a</motion.h3>
              <motion.p 
                className="text-[#C6F135] font-bold text-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >Revenue Engine</motion.p>
            </div>
          </motion.div>
          <div className="space-y-6">
            <div className="bg-[#1A2730]/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/90 text-lg">Monthly Revenue</span>
                <span className="text-[#C6F135] text-lg font-semibold">+147%</span>
              </div>
              <div className="h-14 bg-[#1A2730] rounded-lg relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-[#C6F135] to-[#D4F55C] transition-all duration-300"></div>
              </div>
            </div>
            <div className="bg-[#1A2730]/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/90 text-lg">Organic Traffic</span>
                <span className="text-[#C6F135] text-lg font-semibold">+312%</span>
              </div>
              <div className="h-14 bg-[#1A2730] rounded-lg relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-4/5 bg-gradient-to-r from-[#C6F135] to-[#D4F55C] transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full py-16 mt-auto px-8">
        <motion.div 
          className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-12 items-center opacity-25 hover:opacity-35 transition-opacity duration-300"
          variants={staggerContainer}
        >
          {[
            { src: "/images/clients/hubspot.svg", alt: "HubSpot" },
            { src: "/images/clients/attest.svg", alt: "Attest" },
            { src: "/images/clients/flodesk.svg", alt: "Flodesk" },
            { src: "/images/clients/recruitee.svg", alt: "Recruitee" },
            { src: "/images/clients/testgorilla.svg", alt: "TestGorilla" },
            { src: "/images/clients/travelperk.svg", alt: "TravelPerk" }
          ].map((client, index) => (
            <motion.img
              key={client.alt}
              src={client.src}
              alt={client.alt}
              className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-110"
              variants={staggerItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
