import type { Variants } from "framer-motion"

// Reduced motion variants that respect user preferences
const reducedMotion = {
  transition: { duration: 0 }
}

export const scrollReveal: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
    willChange: "opacity, transform"
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      "@media (prefers-reduced-motion: reduce)": reducedMotion
    }
  }
}

export const microInteraction: Variants = {
  initial: { scale: 1 },
  whileHover: { 
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
      "@media (prefers-reduced-motion: reduce)": reducedMotion
    }
  },
  whileTap: { 
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
      "@media (prefers-reduced-motion: reduce)": reducedMotion
    }
  }
}
