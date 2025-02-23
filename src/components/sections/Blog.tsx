import { type ReactElement } from "react"
import { motion } from "framer-motion"
import { ScrollFadeIn } from "../animations/PageAnimations"
import { GradientText } from "../ui/gradient-text"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { ArrowRight, Clock, Tag } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Technical SEO for SaaS",
    description: "Learn how to optimize your SaaS platform's technical foundation for better search visibility and organic growth.",
    image: "/images/blog/technical-seo.jpg",
    category: "Technical SEO",
    readTime: "8 min read",
    date: "Feb 15, 2024"
  },
  {
    id: 2,
    title: "Content Strategy That Drives B2B SaaS Growth",
    description: "Discover how to create content that resonates with your target audience and drives qualified organic traffic.",
    image: "/images/blog/content-strategy.jpg",
    category: "Content Strategy",
    readTime: "6 min read",
    date: "Feb 10, 2024"
  },
  {
    id: 3,
    title: "Product-Led SEO: The New Growth Frontier",
    description: "Explore how to align your SEO strategy with product-led growth principles for maximum impact.",
    image: "/images/blog/product-led-seo.jpg",
    category: "Growth Strategy",
    readTime: "10 min read",
    date: "Feb 5, 2024"
  },
  {
    id: 4,
    title: "Building Authority in the SaaS Space",
    description: "Learn proven strategies for building domain authority and establishing thought leadership in your niche.",
    image: "/images/blog/authority-building.jpg",
    category: "Link Building",
    readTime: "7 min read",
    date: "Jan 30, 2024"
  },
  {
    id: 5,
    title: "International SEO for Global SaaS Expansion",
    description: "Master the art of international SEO to successfully expand your SaaS business into new markets.",
    image: "/images/blog/international-seo.jpg",
    category: "International SEO",
    readTime: "9 min read",
    date: "Jan 25, 2024"
  },
  {
    id: 6,
    title: "Measuring SEO Success in SaaS",
    description: "Discover the key metrics and KPIs that matter most for tracking and optimizing your SaaS SEO performance.",
    image: "/images/blog/seo-metrics.jpg",
    category: "Analytics",
    readTime: "5 min read",
    date: "Jan 20, 2024"
  }
]

export const Blog = (): ReactElement => {
  return (
    <ScrollFadeIn>
      <section className="container mx-auto px-4 py-32">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 motion-safe:animate-fade-in">
            <GradientText>Latest Insights</GradientText>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto motion-safe:animate-slide-up animate-delay-100">
            Expert strategies and actionable insights to help you grow your SaaS through SEO
          </p>
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
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="transform-gpu"
            >
              <Card 
                className="group bg-secondary/50 backdrop-blur border border-white/5 rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:bg-secondary/70 hover:border-accent/20"
              >
                <div className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-accent/90 text-black px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mt-2 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="text-accent font-medium">Read Article</span>
                      <ArrowRight className="text-accent motion-safe:group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
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
            <span>View All Articles</span>
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </ScrollFadeIn>
  )
}
