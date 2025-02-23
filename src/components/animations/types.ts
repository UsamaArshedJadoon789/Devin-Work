import type { HTMLMotionProps, Variants } from "framer-motion"

export type ScrollFadeInProps = HTMLMotionProps<"div">
export type AnimatedButtonProps = HTMLMotionProps<"button">

export type AnimationVariant = {
  initial?: Variants["initial"]
  animate?: Variants["animate"]
  exit?: Variants["exit"]
  transition?: Variants["transition"]
  whileHover?: Variants["whileHover"]
  whileTap?: Variants["whileTap"]
  whileInView?: Variants["whileInView"]
  viewport?: { once?: boolean }
}
