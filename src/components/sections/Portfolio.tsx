import { useState } from "react"
import { motion } from "framer-motion"
import { ScrollFadeIn } from "../animations/PageAnimations"
import { GradientText } from "../ui/gradient-text"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Enterprise SaaS SEO Growth",
    description: "Increased organic traffic by 312% and generated 2.5x more qualified leads through strategic SEO optimization and content strategy.",
    image: "/images/portfolio/enterprise-saas.jpg",
    category: "SEO Strategy",
    metrics: {
      traffic: "+312%",
      leads: "2.5x",
      keywords: "+450"
    }
  },
  {
    id: 2,
    title: "B2B Software Platform Optimization",
    description: "Achieved first page rankings for 200+ high-intent keywords and doubled organic conversion rate through technical SEO improvements.",
    image: "/images/portfolio/b2b-software.jpg",
    category: "Technical SEO",
    metrics: {
      rankings: "200+",
      conversion: "2x",
      authority: "+45%"
    }
  },
  {
    id: 3,
    title: "SaaS Content Marketing Engine",
    description: "Built a scalable content strategy that drives 150k+ monthly organic visitors and generates consistent MQL pipeline.",
    image: "/images/portfolio/content-engine.jpg",
    category: "Content Strategy",
    metrics: {
      visitors: "150k+",
      engagement: "+85%",
      pipeline: "$2.1M"
    }
  },
  {
    id: 4,
    title: "Product-Led Growth SEO",
    description: "Optimized product-led funnel to capture high-intent search traffic, resulting in 3x increase in product signups from organic search.",
    image: "/images/portfolio/plg-seo.jpg",
    category: "Growth Strategy",
    metrics: {
      signups: "3x",
      retention: "+45%",
      revenue: "+127%"
    }
  },
  {
    id: 5,
    title: "Global SaaS Market Expansion",
    description: "Executed international SEO strategy across 6 markets, achieving top 3 rankings for core keywords in each region.",
    image: "/images/portfolio/global-expansion.jpg",
    category: "International SEO",
    metrics: {
      markets: "6",
      rankings: "Top 3",
      growth: "+225%"
    }
  },
  {
    id: 6,
    title: "Developer Platform Authority",
    description: "Built domain authority through strategic content and backlink acquisition, becoming the go-to resource in the developer tools space.",
    image: "/images/portfolio/dev-platform.jpg",
    category: "Link Building",
    metrics: {
      authority: "DA 75",
      backlinks: "10k+",
      referrals: "+180%"
    }
  }
]

const categories = ["All", "SEO Strategy", "Technical SEO", "Content Strategy", "Growth Strategy", "International SEO", "Link Building"]

export const Portfolio = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <ScrollFadeIn>
      <section className="container mx-auto px-4 py-32">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 motion-safe:animate-fade-in">
            <GradientText>Our Work</GradientText>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto motion-safe:animate-slide-up animate-delay-100">
            See how we've helped SaaS companies achieve exponential organic growth
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-6 py-2 rounded-full transition-all duration-300
                ${selectedCategory === category 
                  ? 'bg-accent text-black hover:bg-accent/90' 
                  : 'border-white/20 text-gray-300 hover:bg-accent hover:text-black hover:border-accent'}
              `}
            >
              {category}
            </Button>
          ))}
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="transform-gpu"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card 
                className="group bg-secondary/50 backdrop-blur border border-white/5 rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:bg-secondary/70 hover:border-accent/20"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500"
                      style={{
                        transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-accent/90 text-black px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mt-2">
                      {project.description}
                    </p>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-accent text-xl font-bold">{value}</div>
                          <div className="text-gray-400 text-sm capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="text-accent font-medium">View Case Study</span>
                      <ArrowRight className="text-accent motion-safe:group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-16">
          <Button 
            variant="outline" 
            size="lg"
            className="group border-white/20 text-gray-300 hover:bg-accent hover:text-black hover:border-accent px-8 py-4"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </ScrollFadeIn>
  )
}
