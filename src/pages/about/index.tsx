import React, { Fragment, type ReactNode } from "react"
import { Lightbulb, Users, Target } from "lucide-react"

export function AboutUsPage(): ReactNode {
  const values = [
    { title: "INNOVATION", description: "Driving digital transformation with cutting-edge solutions", icon: <Lightbulb className="h-8 w-8 text-[#0A2647]" /> },
    { title: "COLLABORATION", description: "Working together to achieve exceptional results", icon: <Users className="h-8 w-8 text-[#0A2647]" /> },
    { title: "USER-CENTRICITY", description: "Putting users at the heart of every solution", icon: <Target className="h-8 w-8 text-[#0A2647]" /> }
  ]

  return (
    <Fragment>
      <section className="bg-gradient-to-br from-[#0A2647] to-[#0A3157] text-white pt-24 pb-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight tracking-wide">
                WHO WE ARE
              </h1>
              <p className="text-2xl text-gray-200 mb-12">
                A new generation of digital transformation
              </p>
            </div>
            <div className="hidden lg:block">
              {/* Placeholder for team illustration */}
              <div className="aspect-square bg-white/10 rounded-lg"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-br from-[#0A2647] to-[#0A3157] transform -skew-y-3"></div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#0A2647]">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
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
    </Fragment>
  )
}
