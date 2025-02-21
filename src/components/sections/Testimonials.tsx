import * as React from "react"
import { Card } from "../ui/card"
import { GradientText } from "../ui/gradient-text"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote: "The team at Skale transformed our SEO strategy completely. Our organic traffic has increased by 200% since working with them.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    image: "/images/testimonials/sarah.jpg"
  },
  {
    quote: "Their data-driven approach and deep understanding of SaaS SEO helped us achieve remarkable growth in a competitive market.",
    author: "Michael Chen",
    role: "CEO",
    company: "CloudTech",
    image: "/images/testimonials/michael.jpg"
  },
  {
    quote: "Working with Skale has been a game-changer. They delivered consistent results and exceptional ROI for our SEO investment.",
    author: "Emma Davis",
    role: "Growth Lead",
    company: "SaaSify",
    image: "/images/testimonials/emma.jpg"
  }
]

export const Testimonials = (): JSX.Element => {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          <GradientText>What Our Clients Say</GradientText>
        </h2>
        <p className="text-xl text-gray-300">Real results from real clients</p>
      </div>

      <div className="relative">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 px-4"
            >
              <Card className="bg-white/5 backdrop-blur border-none text-white p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-600">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xl italic mb-6">{testimonial.quote}</p>
                    <div>
                      <p className="font-bold">{testimonial.author}</p>
                      <p className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
          onClick={prevSlide}
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          variant="ghost"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
          onClick={nextSlide}
        >
          <ChevronRight size={24} />
        </Button>
      </div>
    </section>
  )
}
