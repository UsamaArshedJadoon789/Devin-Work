import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"

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
