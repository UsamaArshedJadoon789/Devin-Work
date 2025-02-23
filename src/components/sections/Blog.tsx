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

export const Blog = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#003344] py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="animate-fade-in animate-duration-700">
          <h1 className="text-5xl font-bold mb-6 text-white">
            <GradientText>Blog & Insights</GradientText>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl animate-slide-up animate-delay-200">
            Expert insights and strategies to help you grow your organic traffic and revenue.
          </p>
        </section>

        {/* Blog Grid */}
        <section className="mt-20">
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article 
                key={post.id}
                className="bg-secondary/50 backdrop-blur border border-white/5 rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:bg-secondary/70 hover:border-white/10 transform-gpu animate-fade-in animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video bg-accent/20" />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-accent text-sm">{post.category}</span>
                    <span className="text-gray-400 text-sm">{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white transition-colors duration-300">{post.title}</h3>
                  <p className="text-gray-300 mb-4 transition-colors duration-300">{post.excerpt}</p>
                  <button className="text-accent hover:text-white transition-colors duration-300">
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
