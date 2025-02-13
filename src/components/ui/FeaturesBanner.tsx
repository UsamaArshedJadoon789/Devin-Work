import { Shield, Clock, Users, Trophy } from "lucide-react"

export function FeaturesBanner() {
  const features = [
    {
      icon: <Shield className="w-8 h-8 md:w-10 md:h-10" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security for your business"
    },
    {
      icon: <Clock className="w-8 h-8 md:w-10 md:h-10" />,
      title: "24/7 Support",
      description: "Round-the-clock technical assistance"
    },
    {
      icon: <Users className="w-8 h-8 md:w-10 md:h-10" />,
      title: "Expert Team",
      description: "Skilled professionals at your service"
    },
    {
      icon: <Trophy className="w-8 h-8 md:w-10 md:h-10" />,
      title: "Quality Assured",
      description: "Best-in-class solutions delivered"
    }
  ]

  return (
    <section className="bg-gradient-to-br from-[#0A2647] to-[#0A3157] text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 mb-4 md:mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
