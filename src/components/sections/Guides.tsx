import { GradientText } from "../ui/gradient-text"

const guides = [
  {
    id: 1,
    title: "Getting Started with SEO",
    description: "Learn the fundamentals of SEO and how to implement them effectively.",
    level: "Beginner",
    duration: "30 min"
  },
  {
    id: 2,
    title: "Advanced Keyword Research",
    description: "Master the art of finding high-value keywords for your content strategy.",
    level: "Advanced",
    duration: "45 min"
  },
  {
    id: 3,
    title: "Technical SEO Mastery",
    description: "Deep dive into technical SEO optimization techniques.",
    level: "Expert",
    duration: "60 min"
  }
]

export const Guides = () => {
  return (
    <div className="min-h-screen bg-[#003344] py-20">
      <div className="container mx-auto">
        {/* Hero Section */}
        <section className="animate-fade-in animate-duration-700 px-4 md:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6 text-white">
            <GradientText>SEO Guides</GradientText>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl animate-slide-up animate-delay-200">
            Comprehensive guides to help you master SEO and content marketing.
          </p>
        </section>

        {/* Guides List */}
        <section className="mt-20 px-4 md:px-6 lg:px-8">
          <div className="space-y-8 animate-fade-in animate-duration-700">
            {guides.map((guide, index) => (
              <div
                key={guide.id}
                className="bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-8 transition-all duration-500 hover:bg-secondary/70 hover:border-white/10 transform-gpu"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-accent">{guide.level}</span>
                  <span className="text-gray-400">{guide.duration}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white transition-colors duration-300">{guide.title}</h3>
                <p className="text-gray-300 mb-6 transition-colors duration-300">{guide.description}</p>
                <button className="text-accent hover:text-white transition-colors duration-300 group inline-flex items-center gap-2">
                  Start Learning
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
