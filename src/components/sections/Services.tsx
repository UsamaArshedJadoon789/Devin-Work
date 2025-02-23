import { type JSX } from "react"
import { CardHover } from "../ui/card-hover"
import { GradientText } from "../ui/gradient-text"
import "../../styles/animations.css"

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

import { ScrollFadeIn } from "../animations/PageAnimations"

export const Services = (): JSX.Element => (
  <ScrollFadeIn>
    <section className="container">
    <div className="text-center">
      <h2 className="text-5xl font-bold motion-safe:animate-fade-in-down animate-duration-700">
        <GradientText>Our Services</GradientText>
      </h2>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto motion-safe:animate-fade-in motion-safe:animate-slide-in animate-delay-200 animate-duration-500">
        Comprehensive SEO solutions for your business growth
      </p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <CardHover 
          key={service.title}
          className="group relative bg-secondary/50 backdrop-blur border border-white/5 rounded-xl transition-all duration-500 hover:scale-105 hover:bg-secondary/70 hover:border-accent/20 transform-gpu motion-safe:animate-fade-in motion-safe:animate-slide-in motion-safe:hover:animate-wiggle"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="relative">
            <div className="text-4xl transition-all duration-300 group-hover:scale-110 group-hover:animate-bounce transform-gpu">{service.icon}</div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 motion-safe:animate-ping"/>
          </div>
          <h3 className="text-2xl font-bold text-white transition-all duration-300 group-hover:text-accent group-hover:translate-y-1">{service.title}</h3>
          <p className="text-gray-300 text-lg leading-relaxed transition-colors duration-300 group-hover:text-white/90 motion-safe:animate-slide-in" style={{ animationDelay: `${index * 150 + 100}ms` }}>{service.description}</p>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2">
            <span className="text-accent motion-safe:group-hover:animate-pulse">Learn more</span>
            <span className="text-accent motion-safe:animate-bounce">→</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"/>
        </CardHover>
      ))}
    </div>
  </section>
  </ScrollFadeIn>
)
