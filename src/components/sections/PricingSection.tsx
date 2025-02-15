import React from "react"
import { Check } from "lucide-react"
import { Button } from "../ui/button"

interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
}

export function PricingSection() {
  const plans: PricingPlan[] = [
    {
      name: "Basic",
      price: "$99",
      description: "Perfect for small businesses and startups",
      features: [
        "Up to 5 pages",
        "Basic SEO optimization",
        "Mobile responsive design",
        "Contact form integration",
        "1 month free support"
      ]
    },
    {
      name: "Professional",
      price: "$199",
      description: "Ideal for growing businesses",
      features: [
        "Up to 10 pages",
        "Advanced SEO optimization",
        "Mobile responsive design",
        "Contact form integration",
        "3 months free support",
        "Custom domain setup",
        "Social media integration"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "$399",
      description: "For large businesses and organizations",
      features: [
        "Unlimited pages",
        "Premium SEO optimization",
        "Mobile responsive design",
        "Advanced form integration",
        "12 months free support",
        "Custom domain setup",
        "Social media integration",
        "E-commerce integration",
        "Custom features development"
      ]
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">Choose the plan that best fits your needs</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                plan.isPopular
                  ? "bg-[#0A2647] text-white shadow-xl scale-105 transform"
                  : "bg-white"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.isPopular ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <div className={`text-4xl font-bold mb-4 ${plan.isPopular ? "text-white" : "text-gray-900"}`}>
                  {plan.price}
                  <span className={`text-lg font-normal ${plan.isPopular ? "text-gray-300" : "text-gray-500"}`}>/month</span>
                </div>
                <p className={plan.isPopular ? "text-gray-300" : "text-gray-600"}>{plan.description}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className={`h-5 w-5 ${plan.isPopular ? "text-blue-400" : "text-blue-500"}`} />
                    <span className={plan.isPopular ? "text-gray-300" : "text-gray-600"}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full py-4 text-lg font-semibold ${
                  plan.isPopular
                    ? "bg-white text-[#0A2647] hover:bg-gray-100"
                    : "bg-[#0A2647] text-white hover:bg-[#0A3157]"
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
