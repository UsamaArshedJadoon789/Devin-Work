import { Clock, Zap, LineChart, Users, Brain } from "lucide-react"
import { Button } from "../ui/button"
import { HeroFeatureCard } from "../ui/HeroFeatureCard"
import { Fragment } from "react"

export function HeroSection() {
  const features = [
    { icon: <Clock className="h-7 w-7" />, text: "24/7 Efficiency" },
    { icon: <Zap className="h-7 w-7" />, text: "Save Time" },
    { icon: <LineChart className="h-7 w-7" />, text: "Data-Driven Decision" },
    { icon: <Users className="h-7 w-7" />, text: "Work Engagement" },
    { icon: <Brain className="h-7 w-7" />, text: "AI-Powered Solutions" }
  ]

  return (
    <section className="bg-gradient-to-br from-[#0A2647] to-[#0A3157] text-white py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              AUTOMATION IS A MUST FOR YOUR BRAND'S SUCCESS
            </h1>
            <p className="text-xl text-gray-200 mb-10">
              In today's tech-paced world, automation is key to staying competitive and efficient.
              Let us help you transform your business with cutting-edge automation solutions.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              {features.slice(0, 4).map((feature, index) => (
                <HeroFeatureCard key={index} {...feature} />
              ))}
            </div>
            <Button size="lg" className="bg-white text-[#0A2647] hover:bg-blue-50 text-lg py-6 px-12 shadow-lg hover:shadow-xl transition-all duration-300">
              GET STARTED
            </Button>
          </div>
          <div className="hidden md:block">
            {/* Placeholder for hero illustration */}
            <div className="aspect-square bg-white/10 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
