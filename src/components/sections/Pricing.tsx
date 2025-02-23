import { type ReactElement } from "react"
import { ScrollFadeIn } from "../animations/PageAnimations"
import { Card, CardContent } from "../ui/card"
import { GradientText } from "../ui/gradient-text"

export const Pricing = (): ReactElement => {
  const plans = [
    {
      title: "Starter",
      price: "$999",
      description: "Perfect for small businesses",
      features: [
        "Basic website development",
        "5 pages",
        "Mobile responsive",
        "Basic SEO setup",
        "Contact form",
        "1 month support"
      ]
    },
    {
      title: "Professional",
      price: "$2,499",
      description: "For growing businesses",
      features: [
        "Advanced website development",
        "10 pages",
        "Mobile responsive",
        "Advanced SEO setup",
        "Custom forms",
        "3 months support",
        "Social media integration"
      ],
      popular: true
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Custom website development",
        "Unlimited pages",
        "Advanced features",
        "Full SEO package",
        "Custom integrations",
        "12 months support",
        "Priority support"
      ]
    }
  ]

  return (
    <ScrollFadeIn>
      <section className="container mx-auto py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4 motion-safe:animate-fade-in-down animate-duration-700">
            <GradientText>Pricing Plans</GradientText>
          </h1>
          <p className="text-lg text-gray-300 motion-safe:animate-fade-in motion-safe:animate-slide-in animate-delay-200">
            Choose the perfect plan for your business needs
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={plan.title}
              className={`group relative bg-white/10 backdrop-blur border-none text-white transform-gpu hover:scale-105 transition-all duration-500 motion-safe:animate-fade-in ${
                plan.popular ? 'border-2 border-white' : ''
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-blue-900 px-4 py-1 rounded-full text-sm font-bold animate-pulse">
                  Most Popular
                </div>
              )}
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2 group-hover:translate-y-1 transition-transform">{plan.title}</h3>
                  <div className="text-4xl font-bold mb-4 motion-safe:animate-slide-in">{plan.price}</div>
                  <p className="text-gray-300 mb-6">{plan.description}</p>
                  <ul className="space-y-3 text-gray-300 text-left mb-8">
                    {plan.features.map((feature, i) => (
                      <li 
                        key={i}
                        className="group/item flex items-center gap-2 hover:translate-y-1 transition-transform"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <span className="text-accent group-hover/item:animate-bounce">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-white text-blue-900 hover:bg-blue-50 py-3 rounded-lg transition-all duration-300 transform-gpu hover:scale-105">
                    Get Started
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </ScrollFadeIn>
  )
}
