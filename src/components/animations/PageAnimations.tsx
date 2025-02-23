import { motion, type MotionProps, type Variants } from "framer-motion"
import { forwardRef } from "react"
import type { ReactNode, HTMLAttributes } from "react"

import { scrollReveal, optimizedFadeIn, microInteraction } from "./pageTransitions"

// Define animation props with performance optimizations
const fadeInProps = {
  ...optimizedFadeIn,
  whileInView: scrollReveal.visible,
  initial: scrollReveal.hidden,
  viewport: { once: true, margin: "-100px" }
} as const

const buttonProps = {
  ...microInteraction,
  transition: { type: "spring", stiffness: 200, damping: 10 }
} as const

// Create components
type ScrollFadeInProps = MotionProps & HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
}

type AnimatedButtonProps = MotionProps & HTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
}

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
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

export const staggerContainer: Variants = {
  animate: { transition: { staggerChildren: 0.1 } }
}

export const parallaxScroll: Variants = {
  initial: { y: 0 },
  animate: { y: 100 }
}

export const scaleOnHover: Variants = buttonProps

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 }
}

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 }
}
