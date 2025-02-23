import { GradientText } from "../ui/gradient-text"

export const CaseStudies = () => {
  const caseStudies = [
    {
      title: "SaaS Company Growth",
      metric: "250%",
      description: "Increase in organic traffic",
      duration: "6 months"
    },
    {
      title: "B2B Lead Generation",
      metric: "180%",
      description: "More qualified leads",
      duration: "12 months"
    },
    {
      title: "E-commerce Success",
      metric: "300%",
      description: "Revenue growth",
      duration: "9 months"
    }
  ]

  return (
    <div className="min-h-screen bg-[#003344] py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="animate-fade-in animate-duration-700">
          <h1 className="text-5xl font-bold mb-6 text-white">
            <GradientText>Our Success Stories</GradientText>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl animate-slide-up animate-delay-200">
            Discover how we've helped SaaS companies achieve remarkable growth through strategic SEO implementations.
          </p>
        </section>

        {/* Case Studies Grid */}
        <section className="mt-20 grid md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-8 animate-fade-in animate-slide-up transform-gpu"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl font-bold text-accent mb-4">{study.metric}</div>
              <h3 className="text-2xl font-bold mb-4 text-white">{study.title}</h3>
              <p className="text-gray-300 mb-4">{study.description}</p>
              <p className="text-sm text-gray-400">Timeline: {study.duration}</p>
              <button className="mt-6 text-accent hover:text-white transition-colors duration-300">
                Read Case Study →
              </button>
            </div>
          ))}
        </section>

        {/* Results Section */}
        <section className="mt-20 animate-fade-in animate-duration-700">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">
            <GradientText>Measurable Results</GradientText>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { metric: "500+", label: "Clients Served" },
              { metric: "10M+", label: "Monthly Organic Visits" },
              { metric: "$50M+", label: "Revenue Generated" }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 bg-secondary/50 backdrop-blur border border-white/5 rounded-xl transition-all duration-500 hover:scale-105 hover:bg-secondary/70 hover:border-white/10 transform-gpu"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold text-accent mb-2">{stat.metric}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
