import { GradientText } from "../ui/gradient-text"

const tutorials = [
  {
    id: 1,
    title: "On-Page SEO Optimization",
    description: "Step-by-step tutorial on optimizing your web pages for search engines.",
    steps: 8,
    duration: "20 min"
  },
  {
    id: 2,
    title: "Content Optimization",
    description: "Learn how to optimize your content for both users and search engines.",
    steps: 6,
    duration: "15 min"
  },
  {
    id: 3,
    title: "Link Building Strategies",
    description: "Discover effective techniques for building quality backlinks.",
    steps: 10,
    duration: "25 min"
  }
]

export const Tutorials = () => {
  return (
    <div className="min-h-screen bg-[#003344] py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="animate-fade-in animate-duration-700">
          <h1 className="text-5xl font-bold mb-6 text-white">
            <GradientText>Step-by-Step Tutorials</GradientText>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl animate-slide-up animate-delay-200">
            Practical tutorials to help you implement SEO strategies effectively.
          </p>
        </section>

        {/* Tutorials Grid */}
        <section className="mt-20">
          <div className="space-y-8 animate-fade-in animate-duration-700">
            {tutorials.map((tutorial, index) => (
              <div
                key={tutorial.id}
                className="bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-8 transition-all duration-500 hover:bg-secondary/70 hover:border-white/10 transform-gpu"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-accent">{tutorial.steps} Steps</span>
                  <span className="text-gray-400">{tutorial.duration}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white transition-colors duration-300">{tutorial.title}</h3>
                <p className="text-gray-300 mb-6 transition-colors duration-300">{tutorial.description}</p>
                <div className="flex items-center justify-between">
                  <button className="text-accent hover:text-white transition-colors duration-300 group inline-flex items-center gap-2">
                    Start Tutorial
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                  <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-accent rounded-full transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
