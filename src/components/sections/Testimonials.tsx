import * as React from "react"
import { Card } from "../ui/card"
import { GradientText } from "../ui/gradient-text"
import { ParallaxBackground } from "../animations/PageAnimations"
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
    <ParallaxBackground>
      <section className="container py-32 transform-gpu">
      <div className="text-center mb-20">
        <h2 className="text-5xl font-bold mb-6 animate-fade-in">
          <GradientText>What Our Clients Say</GradientText>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-slide-up delay-100">
          Real results from real clients
        </p>
      </div>

      <div className="relative animate-slide-up delay-200">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 px-4"
            >
              <Card className="bg-secondary/50 backdrop-blur border border-white/5 text-white p-10 rounded-xl transition-all duration-500 hover:shadow-lg hover:border-white/10 hover:bg-secondary/70">
                <div className="flex flex-col md:flex-row gap-10 items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-800 border-2 border-accent/20 transition-transform duration-500 hover:scale-105">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
                    />
                  </div>
                  <div>
                    <p className="text-2xl leading-relaxed italic mb-8 transition-colors duration-300">{testimonial.quote}</p>
                    <div>
                      <p className="text-xl font-bold text-white mb-1 transition-colors duration-300">{testimonial.author}</p>
                      <p className="text-lg text-gray-400 transition-colors duration-300">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          className="absolute -left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/5 w-12 h-12 rounded-full transition-all duration-300 hover:scale-110"
          onClick={prevSlide}
        >
          <ChevronLeft size={24} className="transition-transform duration-300 hover:-translate-x-1" />
        </Button>
        <Button
          variant="ghost"
          className="absolute -right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/5 w-12 h-12 rounded-full transition-all duration-300 hover:scale-110"
          onClick={nextSlide}
        >
          <ChevronRight size={24} className="transition-transform duration-300 hover:translate-x-1" />
        </Button>
      </div>
    </section>
    </ParallaxBackground>
  )
}
