import type { Variants } from "framer-motion"

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

export const scaleOnHover: Variants = {
  tap: { scale: 0.98 },
  hover: { y: -2 }
}

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 }
}

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 }
}
