import type { Variants, Transition } from "framer-motion"

declare module "framer-motion" {
  export interface HTMLMotionProps<T> extends React.HTMLAttributes<T> {
    initial?: Variants["initial"]
    animate?: Variants["animate"]
    exit?: Variants["exit"]
    transition?: Transition
    whileHover?: Variants["whileHover"]
    whileTap?: Variants["whileTap"]
    whileInView?: Variants["whileInView"]
    viewport?: { once?: boolean; margin?: string; amount?: number | "some" | "all" }
  }
}
