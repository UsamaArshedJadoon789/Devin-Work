import { Clock, Zap, LineChart, Users, Brain, ChartBar } from "lucide-react"
import { Button } from "../ui/button"
import { HeroFeatureCard } from "../ui/HeroFeatureCard"

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export function HeroSection({ title, subtitle }: HeroSectionProps) {
  const features = [
    { icon: <Clock className="h-7 w-7" />, text: "24/7 Efficiency" },
    { icon: <Zap className="h-7 w-7" />, text: "Save Time" },
    { icon: <LineChart className="h-7 w-7" />, text: "Data-Driven Decision" },
    { icon: <ChartBar className="h-7 w-7" />, text: "Personalized Overview" },
    { icon: <Users className="h-7 w-7" />, text: "Work Engagement" }
  ]

  return (
    <section className="bg-gradient-to-br from-[#0A2647] to-[#0A3157] text-white py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight tracking-wide">
              {title}
            </h1>
            <p className="text-xl text-gray-200 mb-12">
              {subtitle}
            </p>
            <div className="grid grid-cols-2 gap-6 mb-12">
              {features.map((feature, index) => (
                <HeroFeatureCard key={index} {...feature} />
              ))}
            </div>
            <Button size="lg" className="bg-white text-[#0A2647] hover:bg-blue-50 text-lg py-6 px-12 shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
              GET STARTED
            </Button>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute -top-4 -right-4 w-full h-full bg-white/5 rounded-lg"></div>
            <div className="relative aspect-square bg-white/10 rounded-lg flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg"></div>
              <img src="/hero-illustration.svg" alt="Hero Illustration" className="w-4/5 h-4/5 object-contain relative z-10" />
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
              <div className="w-3 h-3 rounded-full bg-white"></div>
              <div className="w-3 h-3 rounded-full bg-white/50"></div>
              <div className="w-3 h-3 rounded-full bg-white/50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
