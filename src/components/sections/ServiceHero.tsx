import React from "react"

interface ServiceHeroProps {
  title: string
  description: string
  image: string
}

export function ServiceHero({ title, description, image }: ServiceHeroProps) {
  return (
    <section className="bg-[#0A2647] text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{title}</h1>
            <p className="text-xl text-gray-300 leading-relaxed">{description}</p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-white/5 rounded-xl"></div>
            <img src={image} alt={title} className="w-full rounded-xl relative z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
