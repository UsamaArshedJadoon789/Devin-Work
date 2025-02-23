import { HTMLMotionProps } from "framer-motion"

declare module "framer-motion" {
  export interface HTMLMotionProps<T> extends React.HTMLAttributes<T> {
    initial?: any
    animate?: any
    exit?: any
    transition?: any
    whileHover?: any
    whileTap?: any
    whileInView?: any
    viewport?: any
  }
}
