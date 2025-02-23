import { type FC } from "react"
import { GradientText } from "../ui/gradient-text"

const posts = [
  {
    id: 1,
    title: "10 SEO Strategies for SaaS Growth",
    excerpt: "Learn the most effective SEO strategies specifically designed for SaaS companies.",
    category: "SEO",
    readTime: "5 min read",
    image: "/images/blog/seo-strategies.jpg"
  },
  {
    id: 2,
    title: "Content Marketing in 2024",
    excerpt: "Discover the latest trends and best practices in content marketing for maximum impact.",
    category: "Content",
    readTime: "7 min read",
    image: "/images/blog/content-marketing.jpg"
  },
  {
    id: 3,
    title: "Technical SEO Checklist",
    excerpt: "A comprehensive checklist to ensure your website's technical SEO is optimized.",
    category: "Technical",
    readTime: "6 min read",
    image: "/images/blog/technical-seo.jpg"
  }
]

export const Blog: FC = () => {
  return (
    <div className="min-h-screen bg-[#003344]">
      <div className="container">
        {/* Hero Section */}
        <section className="motion-safe:animate-fade-in animate-duration-700">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white">
              <GradientText>{"Blog & Insights"}</GradientText>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl motion-safe:animate-slide-up animate-delay-200">
              Expert insights and strategies to help you grow your organic traffic and revenue.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section>
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article 
                key={post.id}
                className="group bg-white/10 backdrop-blur border-none overflow-hidden rounded-xl transition-all duration-500 motion-safe:animate-fade-in transform-gpu hover:scale-105"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    {post.categories.map(category => (
                      <span 
                        key={category}
                        className="bg-white/20 px-2 py-1 rounded text-sm animate-bounce"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold group-hover:translate-y-1 transition-transform">{post.title}</h3>
                  <p className="text-gray-300 motion-safe:animate-slide-in" style={{ animationDelay: `${index * 150 + 100}ms` }}>{post.excerpt}</p>
                  <button className="text-accent hover:text-white transition-colors duration-300 group-hover:translate-x-2">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
