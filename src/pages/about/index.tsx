import React from 'react'
import { Users, Target, Award } from 'lucide-react'

export default function AboutPage() {
  const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "/team/john-smith.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "Technical Director",
      image: "/team/sarah-johnson.jpg"
    },
    {
      name: "Michael Brown",
      role: "Marketing Head",
      image: "/team/michael-brown.jpg"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Company Overview */}
      <section className="bg-gradient-to-br from-[#0A2647] to-[#0A3157] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center">About Us</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto text-center">
            The Skyline Strategies is a leading digital solutions provider, helping businesses transform their digital presence with innovative technology solutions.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-8 h-8 text-[#0A2647]" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700">
                To empower businesses with cutting-edge digital solutions that drive growth, innovation, and success in the digital age.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Award className="w-8 h-8 text-[#0A2647]" />
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700">
                To be the global leader in digital transformation, setting industry standards for innovation and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12 justify-center">
            <Users className="w-8 h-8 text-[#0A2647]" />
            <h2 className="text-3xl md:text-4xl font-bold text-center">Our Team</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
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

      {/* Contact Information */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0A2647] to-[#0A3157] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Get in Touch</h2>
          <p className="text-xl mb-6">We'd love to hear from you</p>
          <div className="max-w-lg mx-auto">
            <p className="mb-4">Email: contact@theskylinestrategies.com</p>
            <p className="mb-4">Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Business Street, Tech City, TC 12345</p>
          </div>
        </div>
      </section>
    </div>
  )
}
