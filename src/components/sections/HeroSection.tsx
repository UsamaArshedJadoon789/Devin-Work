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
    { icon: <Clock className="h-7 w-7" />, text: "24/7 Efficiency" },
    { icon: <Zap className="h-7 w-7" />, text: "Save Time" },
    { icon: <LineChart className="h-7 w-7" />, text: "Data-Driven Decision" },
    { icon: <BarChart className="h-7 w-7" />, text: "Personalized Overview" },
    { icon: <Users className="h-7 w-7" />, text: "Work Engagement" }
  ]

  return (
    <section className="bg-[#0A2647] text-white min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 pt-24 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1]">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              {subtitle}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {features.map((feature, index) => (
                <HeroFeatureCard key={index} {...feature} />
              ))}
            </div>
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-white text-[#0A2647] hover:bg-gray-100 text-lg py-5 px-14 rounded-xl shadow-lg transition-all duration-300 font-semibold"
            >
              GET STARTED
            </Button>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-white/5 rounded-xl"></div>
            <div className="relative aspect-square bg-white/10 rounded-xl flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <img 
                src="/hero-illustration.svg" 
                alt="Hero Illustration" 
                className="w-4/5 h-4/5 object-contain relative z-10" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
