import type { Variants } from "framer-motion"

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
      damping: 20
    }
  }
}

export const optimizedFadeIn: Variants = {
  initial: { 
    opacity: 0,
    willChange: "opacity, transform" 
  },
  animate: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.3
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
      damping: 20
    }
  },
  whileTap: { 
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  }
}
