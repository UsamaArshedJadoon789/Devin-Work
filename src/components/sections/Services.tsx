// Removed unused React import since we use JSX transform
import { motion } from "framer-motion"
import { GradientText } from "../ui/gradient-text"
import { CardHover } from "../ui/card-hover"
import { ScrollFadeIn } from "../animations/PageAnimations"

const services = [
  {
    title: "SEO Strategy & Planning",
    description: "Data-driven SEO strategies tailored for SaaS companies. We analyze your market, competitors, and opportunities to create a comprehensive roadmap for organic growth.",
    image: "/images/services/seo-strategy.jpg",
    icon: "📊"
  },
  {
    title: "Technical SEO Optimization",
    description: "Enhance your website's technical foundation. We optimize site architecture, speed, mobile responsiveness, and crawlability to maximize search performance.",
    image: "/images/services/technical-seo.jpg",
    icon: "⚡"
  },
  {
    title: "Content Strategy & Creation",
    description: "Create high-quality, SEO-optimized content that ranks and converts. Our content strategies target your audience's search intent and business goals.",
    image: "/images/services/content-strategy.jpg",
    icon: "✍️"
  },
  {
    title: "Link Building & Authority",
    description: "Build high-quality backlinks that boost your domain authority. We focus on relevant, authoritative links that drive referral traffic and rankings.",
    image: "/images/services/link-building.jpg",
    icon: "🔗"
  },
  {
    title: "Analytics & Reporting",
    description: "Track and measure your SEO performance with detailed analytics. Get actionable insights and transparent reporting on your organic growth metrics.",
    image: "/images/services/analytics.jpg",
    icon: "📈"
  },
  {
    title: "Local SEO & Optimization",
    description: "Dominate local search results and attract nearby customers. Perfect for businesses targeting specific geographic areas or multiple locations.",
    image: "/images/services/local-seo.jpg",
    icon: "📍"
  }
]

export const Services = (): JSX.Element => (
  <ScrollFadeIn>
    <section className="container mx-auto px-4 py-32">
      <div className="text-center mb-20">
        <h2 className="text-5xl font-bold mb-6 motion-safe:animate-fade-in">
          <GradientText>Our Services</GradientText>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto motion-safe:animate-slide-up animate-delay-100">
          Comprehensive SEO solutions to skyrocket your organic growth
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="transform-gpu"
          >
            <CardHover 
              className="group relative bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-8 transition-all duration-500 hover:scale-105 hover:bg-secondary/70 hover:border-accent/20"
            >
              <div className="text-4xl mb-6 motion-safe:group-hover:animate-bounce">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-white transition-all duration-300 group-hover:text-accent">{service.title}</h3>
              <p className="text-gray-300 text-lg leading-relaxed transition-colors duration-300 group-hover:text-white/90">{service.description}</p>
              <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2">
                <span className="text-accent font-medium">Learn more</span>
                <span className="text-accent">→</span>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"/>
            </CardHover>
          </motion.div>
        ))}
      </div>
    </section>
  </ScrollFadeIn>
)
