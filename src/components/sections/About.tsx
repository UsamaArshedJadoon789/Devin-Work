import { GradientText } from "../ui/gradient-text"

export const About = () => {
  return (
    <div className="min-h-screen bg-[#003344] py-20">
      <div className="container">
        {/* Hero Section */}
        <section className="motion-safe:animate-fade-in-down">
          <h1 className="text-5xl font-bold mb-6 text-white">
            <GradientText>About The Skyline Strategies</GradientText>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl motion-safe:animate-slide-in animate-delay-200">
            We are a team of SEO experts dedicated to helping SaaS companies grow their organic traffic and revenue through data-driven strategies.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mt-20 grid md:grid-cols-2 gap-12">
          <div 
            className="group bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-8 transition-all duration-500 hover:scale-105 transform-gpu motion-safe:animate-fade-in"
            style={{ animationDelay: '0ms' }}
          >
            <div className="text-4xl mb-4">
              <span className="animate-ping">🎯</span>
            </div>
            <h2 className="text-3xl font-bold mb-6 text-white group-hover:translate-y-1 transition-transform">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed motion-safe:animate-slide-in">
              To empower SaaS businesses with sustainable growth through strategic SEO and content marketing that delivers measurable results.
            </p>
          </div>
          <div 
            className="group bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-8 transition-all duration-500 hover:scale-105 transform-gpu motion-safe:animate-fade-in"
            style={{ animationDelay: '200ms' }}
          >
            <div className="text-4xl mb-4">
              <span className="animate-pulse">🚀</span>
            </div>
            <h2 className="text-3xl font-bold mb-6 text-white group-hover:translate-y-1 transition-transform">Our Vision</h2>
            <p className="text-lg text-gray-300 leading-relaxed motion-safe:animate-slide-in">
              To be the leading SEO partner for innovative SaaS companies, helping them achieve their growth potential through organic search.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="mt-20">
          <h2 className="text-4xl font-bold mb-12 text-center text-white motion-safe:animate-fade-in">
            <GradientText>Meet Our Team</GradientText>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '👨‍💻', title: 'Technical Lead', role: 'SEO Expert' },
              { icon: '👩‍💼', title: 'Content Strategist', role: 'Content Manager' },
              { icon: '👨‍🎨', title: 'Creative Director', role: 'UI/UX Designer' }
            ].map((member, index) => (
              <div 
                key={index}
                className="group bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-8 text-center transition-all duration-500 hover:scale-105 transform-gpu motion-safe:animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl mb-4">
                  <span className="animate-bounce">{member.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:translate-y-1 transition-transform">{member.title}</h3>
                <p className="text-gray-300 motion-safe:animate-slide-in" style={{ animationDelay: `${index * 200 + 100}ms` }}>{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
