import type { MotionProps } from "framer-motion"

export const fadeInUp: MotionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "tween", duration: 0.5 }
}

export const staggerContainer: MotionProps = {
  animate: { transition: { staggerChildren: 0.1 } }
}

export const parallaxScroll: MotionProps = {
  initial: { y: 0 },
  animate: { y: 100 },
  transition: { type: "spring", stiffness: 200, damping: 10 }
}

export const scaleOnHover: MotionProps = {
  initial: { scale: 1 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 200, damping: 10 }
}

export const fadeInLeft: MotionProps = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { type: "tween", duration: 0.5 }
}

export const fadeInRight: MotionProps = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { type: "tween", duration: 0.5 }
}
