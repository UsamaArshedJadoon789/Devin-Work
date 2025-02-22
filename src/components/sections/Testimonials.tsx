import * as React from "react"
import { Card } from "../ui/card"
import { GradientText } from "../ui/gradient-text"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { staggerContainer, staggerItem, createBurst, velocityAnimate } from "@/lib/animations"
import { ThreeScene } from "../ThreeScene"

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
  const burstRefs = React.useRef<any[]>([])

  const nextSlide = () => {
    const button = document.querySelector('.next-button') as HTMLElement;
    if (button) {
      const burst = createBurst(
        button.getBoundingClientRect().left + button.offsetWidth / 2,
        button.getBoundingClientRect().top + button.offsetHeight / 2,
        { color: '#4B5563', radius: 40 }
      );
      burstRefs.current.push(burst);
      burst.play();
    }
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    const button = document.querySelector('.prev-button') as HTMLElement;
    if (button) {
      const burst = createBurst(
        button.getBoundingClientRect().left + button.offsetWidth / 2,
        button.getBoundingClientRect().top + button.offsetHeight / 2,
        { color: '#4B5563', radius: 40 }
      );
      burstRefs.current.push(burst);
      burst.play();
    }
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  React.useEffect(() => {
    // Add hover animations to testimonial cards
    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        velocityAnimate(card as HTMLElement, {
          scale: 1.02,
          boxShadowBlur: 30,
          opacity: 0.95
        }, {
          duration: 300,
          easing: 'easeOutCubic',
          queue: false
        });
      });

      card.addEventListener('mouseleave', () => {
        velocityAnimate(card as HTMLElement, {
          scale: 1,
          boxShadowBlur: 0,
          opacity: 1
        }, {
          duration: 200,
          easing: 'easeOutQuad',
          queue: false
        });
      });
    });

    return () => {
      burstRefs.current.forEach(burst => burst.pause());
      cards.forEach(card => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, [currentSlide]);

  // Cleanup function to remove all event listeners and animations
  React.useEffect(() => {
    return () => {
      burstRefs.current.forEach(burst => burst.pause());
    };
  }, []);

  return (
    <motion.section 
      className="w-full py-32 relative bg-[#0A0A0A] overflow-hidden"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <div className="absolute inset-0 z-0">
        <ThreeScene color="#4B5563" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1923]/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('/images/noise/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />
      </div>
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 px-8"
        >
          <motion.h2 
            className="text-5xl font-bold mb-6"
            variants={staggerItem}
          >
            <GradientText>What Our Clients Say</GradientText>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            variants={staggerItem}
          >
            Real results from real clients
          </motion.p>
        </motion.div>

        <motion.div 
          className="relative px-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              className="flex"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Card className="bg-secondary/50 backdrop-blur border border-white/5 text-white p-10 rounded-xl testimonial-card">
                <div className="flex flex-col md:flex-row gap-10 items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-800 border-2 border-accent/20">
                    <img
                      src={testimonials[currentSlide].image}
                      alt={testimonials[currentSlide].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-2xl leading-relaxed italic mb-8">{testimonials[currentSlide].quote}</p>
                    <div>
                      <p className="text-xl font-bold text-white mb-1">{testimonials[currentSlide].author}</p>
                      <p className="text-lg text-gray-400">{testimonials[currentSlide].role} at {testimonials[currentSlide].company}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Button
            variant="ghost"
            className="absolute -left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/5 w-12 h-12 rounded-full prev-button"
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            variant="ghost"
            className="absolute -right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/5 w-12 h-12 rounded-full next-button"
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}
