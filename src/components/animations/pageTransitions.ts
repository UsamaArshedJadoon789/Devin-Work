import { type Variants } from "framer-motion"

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const staggerContainer: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0
  }
}

export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05
  },
  tap: { scale: 0.95 }
}

export const slideInFromLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0
  }
}

export const slideInFromRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0
  }
}

export const microInteraction: Variants = {
  tap: { scale: 0.98 },
  hover: { 
    y: -2
  }
}

// Performance optimized animations with will-change
export const optimizedFadeIn: Variants = {
  initial: { 
    opacity: 0,
    willChange: "opacity, transform" 
  },
  animate: {
    opacity: 1
  },
  exit: { 
    opacity: 0
  }
}

// Scroll-triggered animations
export const scrollReveal: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
    willChange: "opacity, transform"
  },
  visible: {
    opacity: 1,
    y: 0
  }
}
