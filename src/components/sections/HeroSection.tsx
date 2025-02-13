import React from "react"
import { Clock, Zap, LineChart, BarChart, Users } from "lucide-react"
import { Button } from "../ui/button"
import { HeroFeatureCard } from "../ui/HeroFeatureCard"

interface HeroSectionProps {
  title: string
  subtitle: string
}

export function HeroSection({ title, subtitle }: HeroSectionProps) {
  const features = [
    { icon: <Clock className="h-6 w-6 md:h-7 md:w-7" />, text: "24/7 Efficiency" },
    { icon: <Zap className="h-6 w-6 md:h-7 md:w-7" />, text: "Save Time" },
    { icon: <LineChart className="h-6 w-6 md:h-7 md:w-7" />, text: "Data-Driven Decision" },
    { icon: <BarChart className="h-6 w-6 md:h-7 md:w-7" />, text: "Personalized Overview" },
    { icon: <Users className="h-6 w-6 md:h-7 md:w-7" />, text: "Work Engagement" }
  ]

  return (
    <section className="bg-gradient-to-br from-[#0A2647] to-[#0A3157] text-white py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 lg:mb-8 leading-tight tracking-wide">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-10 lg:mb-12">
              {subtitle}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10 lg:mb-12">
              {features.map((feature, index) => (
                <HeroFeatureCard key={index} {...feature} />
              ))}
            </div>
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-white text-[#0A2647] hover:bg-blue-50 text-base md:text-lg py-4 md:py-6 px-6 md:px-12 shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
            >
              GET STARTED
            </Button>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute -top-4 -right-4 w-full h-full bg-white/5 rounded-lg transform hover:rotate-2 transition-transform duration-300"></div>
            <div className="relative aspect-square bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg"></div>
              <img 
                src="/hero-illustration.svg" 
                alt="Hero Illustration" 
                className="w-3/4 md:w-4/5 h-3/4 md:h-4/5 object-contain relative z-10 transform hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3">
              <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-white"></div>
              <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-white/50"></div>
              <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-white/50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
