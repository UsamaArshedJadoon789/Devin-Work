import { motion, type MotionProps } from "framer-motion"
import { forwardRef } from "react"
import type { ReactNode, HTMLAttributes } from "react"

import { scrollReveal, microInteraction } from "./pageTransitions"

// Define animation props with performance optimizations
const fadeInProps = {
  initial: "hidden",
  whileInView: "visible",
  variants: scrollReveal,
  viewport: { once: true, margin: "-100px" },
  transition: { type: "spring", stiffness: 200, damping: 20 }
} as const

const buttonProps = {
  initial: "initial",
  whileHover: "whileHover",
  whileTap: "whileTap",
  variants: microInteraction,
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
