import { motion } from "framer-motion"
import { forwardRef } from "react"
import type { ComponentPropsWithRef } from "react"

// Define animation props
const fadeInProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { type: "tween", duration: 0.5 },
  viewport: { once: true }
} as const

const buttonProps = {
  initial: { scale: 1 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 200, damping: 10 }
} as const

// Create components
type ScrollFadeInProps = ComponentPropsWithRef<typeof motion.div>
type AnimatedButtonProps = ComponentPropsWithRef<typeof motion.button>

export const ScrollFadeIn = forwardRef<HTMLDivElement, ScrollFadeInProps>((props, ref) => {
  const { className, children, ...rest } = props
  return (
    <motion.div
      ref={ref}
      initial={fadeInProps.initial}
      whileInView={fadeInProps.whileInView}
      transition={fadeInProps.transition}
      viewport={fadeInProps.viewport}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
})

ScrollFadeIn.displayName = "ScrollFadeIn"

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>((props, ref) => {
  const { className, children, ...rest } = props
  return (
    <motion.button
      ref={ref}
      initial={buttonProps.initial}
      whileHover={buttonProps.whileHover}
      whileTap={buttonProps.whileTap}
      transition={buttonProps.transition}
      className={className}
      {...rest}
    >
      {children}
    </motion.button>
  )
})

AnimatedButton.displayName = "AnimatedButton"

// Export animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "tween", duration: 0.5 }
} as const

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
} as const

export const parallaxScroll = {
  initial: { y: 0 },
  animate: { y: 100 },
  transition: { type: "spring", stiffness: 200, damping: 10 }
} as const

export const scaleOnHover = buttonProps

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { type: "tween", duration: 0.5 }
} as const

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { type: "tween", duration: 0.5 }
} as const
