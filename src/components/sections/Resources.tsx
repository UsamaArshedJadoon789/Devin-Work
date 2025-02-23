import { GradientText } from "../ui/gradient-text"

const resources = [
  {
    id: 1,
    title: "Complete SEO Guide 2024",
    description: "A comprehensive guide to SEO best practices and strategies.",
    type: "Guide",
    downloadType: "PDF"
  },
  {
    id: 2,
    title: "Content Calendar Template",
    description: "Plan and organize your content strategy effectively.",
    type: "Template",
    downloadType: "Excel"
  },
  {
    id: 3,
    title: "SEO Audit Checklist",
    description: "Step-by-step checklist for conducting thorough SEO audits.",
    type: "Checklist",
    downloadType: "PDF"
  }
]

export const Resources = () => {
  return (
    <div className="min-h-screen bg-[#003344] py-20">
      <div className="container mx-auto">
        {/* Hero Section */}
        <section className="animate-fade-in animate-duration-700 px-4 md:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6 text-white">
            <GradientText>Free Resources</GradientText>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl animate-slide-up animate-delay-200">
            Download our free resources to boost your SEO and content marketing efforts.
          </p>
        </section>

        {/* Resources Grid */}
        <section className="mt-20 px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div
                key={resource.id}
                className="bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-8 transition-all duration-500 hover:scale-105 hover:bg-secondary/70 hover:border-white/10 transform-gpu animate-fade-in animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-accent">{resource.type}</span>
                  <span className="text-gray-400">{resource.downloadType}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white transition-colors duration-300">{resource.title}</h3>
                <p className="text-gray-300 mb-6 transition-colors duration-300">{resource.description}</p>
                <button className="w-full bg-accent text-primary py-3 rounded-lg transition-all duration-300 hover:bg-accent/90 transform-gpu hover:scale-[1.02]">
                  Download Now
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
