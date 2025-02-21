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
  <section className="container mx-auto px-4 py-20">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">
        <GradientText>Our Services</GradientText>
      </h2>
      <p className="text-xl text-gray-300">Comprehensive SEO solutions for your business growth</p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {services.map((service) => (
        <CardHover key={service.title}>
          <div className="text-4xl mb-4">{service.icon}</div>
          <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
          <p className="text-gray-300">{service.description}</p>
        </CardHover>
      ))}
    </div>
  </section>
)
