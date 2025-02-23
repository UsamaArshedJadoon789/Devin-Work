import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"

// Animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
}

export const parallaxScroll = {
  initial: { y: 0 },
  animate: (offset: number) => ({
    y: offset,
    transition: { type: "spring", stiffness: 100 }
  })
}

export const scaleOnHover = {
  initial: { scale: 1 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
}

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
}

interface ScrollFadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
}

export type { ScrollFadeInProps, AnimatedButtonProps }
export function ScrollFadeIn({ children, ...props }: ScrollFadeInProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function AnimatedButton({ children, ...props }: AnimatedButtonProps): JSX.Element {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
