import { Fragment, type ReactNode } from "react"
import { Lightbulb, Users, Target } from "lucide-react"

export function AboutUsPage(): ReactNode {
  const values = [
    { title: "INNOVATION", description: "Driving digital transformation with cutting-edge solutions", icon: <Lightbulb className="h-8 w-8 text-[#0A2647]" /> },
    { title: "COLLABORATION", description: "Working together to achieve exceptional results", icon: <Users className="h-8 w-8 text-[#0A2647]" /> },
    { title: "USER-CENTRICITY", description: "Putting users at the heart of every solution", icon: <Target className="h-8 w-8 text-[#0A2647]" /> }
  ]

  return (
    <Fragment>
      <section className="bg-gradient-to-br from-[#0A2647] to-[#0A3157] text-white pt-24 pb-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight tracking-wide relative">
                WHO WE ARE
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-50 transform skew-x-12"></span>
              </h1>
              <p className="text-2xl text-gray-200 mb-12">
                A new generation of digital transformation
              </p>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute -top-4 -right-4 w-full h-full bg-white/5 rounded-lg transform rotate-3"></div>
              <div className="relative aspect-square bg-white/10 rounded-lg flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg"></div>
                <img src="/team-illustration.svg" alt="Team Illustration" className="w-4/5 h-4/5 object-contain relative z-10" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-br from-[#0A2647] to-[#0A3157] transform -skew-y-3"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-br from-[#0A2647] to-[#0A3157] transform -skew-y-2 opacity-75"></div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#0A3157]">
            OUR VALUES
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0A2647] to-[#0A3157] rounded-full flex items-center justify-center mb-6 mx-auto transform -rotate-12">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform rotate-12">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-[#0A2647]">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#0A2647] to-[#0A3157] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl italic mb-8">
              "Our legacy is built on innovation, collaboration, and a relentless commitment to excellence in everything we do."
            </blockquote>
            <div className="font-bold text-xl mb-2">SHAHZAIB CHISHTY</div>
            <div className="text-gray-300">Co-Founder & CEO</div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#0A3157]">
            OUR TEAM
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#0A2647] to-[#0A3157] rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative p-6 bg-white rounded-2xl">
                  <div className="aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-[#0A2647] to-[#0A3157] opacity-10"></div>
                  </div>
                  <h3 className="text-lg font-bold text-[#0A2647] mb-1">Team Member {member}</h3>
                  <p className="text-sm text-gray-600">Position {member}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  )
}
