import { type FC } from "react"
import { GradientText } from "../ui/gradient-text"

interface Post {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  categories: string[];
  readTime?: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: "10 SEO Strategies for SaaS Growth",
    excerpt: "Learn the most effective SEO strategies specifically designed for SaaS companies.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3",
    categories: ["SEO", "Strategy"]
  },
  {
    id: 2,
    title: "Content Marketing in 2024",
    excerpt: "Discover the latest trends and best practices in content marketing for maximum impact.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3",
    categories: ["Content", "Marketing"]
  },
  {
    id: 3,
    title: "Technical SEO Checklist",
    excerpt: "A comprehensive checklist to ensure your website's technical SEO is optimized.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3",
    categories: ["Technical", "SEO"]
  }
]

import { ScrollFadeIn } from "../animations/PageAnimations"

export const Blog: FC = () => {
  return (
    <ScrollFadeIn>
      <div className="min-h-screen bg-[#003344]">
      <div className="container">
        {/* Hero Section */}
        <section className="motion-safe:animate-fade-in animate-duration-700">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white">
              <GradientText>{"Blog &amp; Insights"}</GradientText>
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
    </ScrollFadeIn>
  )
}
