import { GradientText } from "../ui/gradient-text"

export const About = () => {
  return (
    <div className="min-h-screen bg-[#003344] py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="animate-fade-in animate-duration-700">
          <h1 className="text-5xl font-bold mb-6 text-white">
            <GradientText>About The Skyline Strategies</GradientText>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl animate-slide-up animate-delay-200">
            We are a team of SEO experts dedicated to helping SaaS companies grow their organic traffic and revenue through data-driven strategies.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mt-20 grid md:grid-cols-2 gap-12 items-center animate-fade-in animate-duration-700">
          <div className="bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-8 transition-all duration-500 hover:bg-secondary/70 hover:border-white/10 transform-gpu">
            <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              To empower SaaS businesses with sustainable growth through strategic SEO and content marketing that delivers measurable results.
            </p>
          </div>
          <div className="bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-8 transition-all duration-500 hover:bg-secondary/70 hover:border-white/10 transform-gpu">
            <h2 className="text-3xl font-bold mb-6 text-white">Our Vision</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              To be the leading SEO partner for innovative SaaS companies, helping them achieve their growth potential through organic search.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="mt-20 animate-fade-in animate-duration-700">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">
            <GradientText>Meet Our Team</GradientText>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div 
                key={index}
                className="bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-8 text-center transition-all duration-500 hover:scale-105 hover:bg-secondary/70 hover:border-white/10 transform-gpu"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-32 h-32 rounded-full bg-accent/20 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-2 text-white">Team Member</h3>
                <p className="text-gray-300">Position</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
