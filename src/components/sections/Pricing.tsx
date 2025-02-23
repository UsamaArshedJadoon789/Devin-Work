import { type ReactElement } from "react"
import { motion } from "framer-motion"
import { ScrollFadeIn } from "../animations/PageAnimations"
import { GradientText } from "../ui/gradient-text"
import { Button } from "../ui/button"
import { ArrowRight, Check } from "lucide-react"

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for early-stage SaaS companies looking to establish their SEO foundation.",
    price: "2,499",
    features: [
      "Technical SEO audit & optimization",
      "Keyword research & strategy",
      "Content optimization (5 pages)",
      "Monthly performance reports",
      "Email support"
    ],
    popular: false
  },
  {
    name: "Growth",
    description: "Ideal for scaling SaaS companies ready to accelerate their organic growth.",
    price: "4,999",
    features: [
      "Everything in Starter, plus:",
      "Advanced technical optimization",
      "Content strategy & creation (10 pages)",
      "Link building campaign",
      "Competitor analysis",
      "Weekly strategy calls",
      "Priority support"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    description: "Comprehensive solution for established SaaS companies seeking market dominance.",
    price: "Custom",
    features: [
      "Everything in Growth, plus:",
      "Custom SEO strategy",
      "Unlimited content optimization",
      "Advanced link building",
      "International SEO",
      "Dedicated SEO team",
      "24/7 priority support"
    ],
    popular: false
  }
]

export const Pricing = (): ReactElement => {
  return (
    <ScrollFadeIn>
      <section className="container mx-auto px-4 py-32">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 motion-safe:animate-fade-in">
            <GradientText>Simple, Transparent Pricing</GradientText>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto motion-safe:animate-slide-up animate-delay-100">
            Choose the perfect plan to accelerate your SaaS company's organic growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`
                relative transform-gpu rounded-2xl border
                ${plan.popular 
                  ? 'border-accent bg-accent/10' 
                  : 'border-white/10 bg-secondary/50'}
                backdrop-blur p-8 transition-all duration-300 hover:scale-105
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent px-4 py-1 rounded-full text-black text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-400">/month</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "default" : "outline"}
                size="lg"
                className={`
                  w-full justify-center
                  ${plan.popular 
                    ? 'bg-accent text-black hover:bg-accent/90' 
                    : 'border-white/20 text-gray-300 hover:bg-accent hover:text-black hover:border-accent'}
                `}
              >
                <span>Get Started</span>
                <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-xl text-gray-300 mb-8">
            Need a custom solution? Let's talk about your specific requirements.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-white/20 text-gray-300 hover:bg-accent hover:text-black hover:border-accent px-8"
          >
            <span>Contact Sales</span>
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>
    </ScrollFadeIn>
  )
}
