import { Card, CardContent } from "./card"
import { cn } from "@/lib/utils"
import { HTMLAttributes, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import anime from "animejs"

interface CardHoverProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHover = ({ children, className, ...props }: CardHoverProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const element = cardRef.current
    const timeline = anime.timeline({
      targets: element,
      duration: 300,
      easing: 'easeOutQuad',
      autoplay: false
    })

    timeline.add({
      scale: 1.05,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    })

    const enterHandler = () => timeline.play()
    const leaveHandler = () => timeline.reverse()

    element.addEventListener('mouseenter', enterHandler)
    element.addEventListener('mouseleave', leaveHandler)

    return () => {
      element.removeEventListener('mouseenter', enterHandler)
      element.removeEventListener('mouseleave', leaveHandler)
    }
  }, [])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        className={cn(
          "group bg-white/10 backdrop-blur border-none",
          className
        )}
        {...props}
      >
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  )
}
