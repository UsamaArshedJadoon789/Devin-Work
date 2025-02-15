import React from "react"
import { Target, Award, Users } from "lucide-react"

export function AboutSection() {
  const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "/images/team/john-smith.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "Technical Director",
      image: "/images/team/sarah-johnson.jpg"
    },
    {
      name: "Michael Brown",
      role: "Marketing Head",
      image: "/images/team/michael-brown.jpg"
    }
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-24">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Target className="w-8 h-8 text-[#0A2647]" />
              <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              To empower businesses with cutting-edge digital solutions that drive growth, innovation, and success in the digital age.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Award className="w-8 h-8 text-[#0A2647]" />
              <h2 className="text-3xl md:text-4xl font-bold">Our Vision</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              To be the global leader in digital transformation, setting industry standards for innovation and excellence.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Users className="w-8 h-8 text-[#0A2647]" />
            <h2 className="text-3xl md:text-4xl font-bold">Our Team</h2>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Meet our talented team of professionals dedicated to delivering exceptional digital solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
