import { type JSX } from "react"
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

export const Services = (): JSX.Element => (
  <section className="container mx-auto px-4 py-32">
    <div className="text-center mb-20">
      <h2 className="text-5xl font-bold mb-6 animate-fade-in animate-duration-700">
        <GradientText>Our Services</GradientText>
      </h2>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in animate-slide-up animate-delay-200 animate-duration-500">
        Comprehensive SEO solutions for your business growth
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <CardHover 
          key={service.title}
          className="bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-8 transition-all duration-500 hover:scale-105 hover:bg-secondary/70 hover:border-white/10 transform-gpu animate-fade-in animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="text-4xl mb-6 transition-transform duration-300 group-hover:scale-110 transform-gpu">{service.icon}</div>
          <h3 className="text-2xl font-bold mb-3 text-white transition-colors duration-300">{service.title}</h3>
          <p className="text-gray-300 text-lg leading-relaxed transition-colors duration-300">{service.description}</p>
        </CardHover>
      ))}
    </div>
  </section>
)
