import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from "@/lib/utils";

// Page Transition Variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};

export function AnimatedPage({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

// Scroll Animation Component
export function ScrollFadeIn({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

// Button Hover Effect
import { ButtonHTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { Slot } from "@radix-ui/react-slot";

export interface AnimatedButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function AnimatedButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: AnimatedButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Comp>
    </motion.div>
  );
}

// Parallax Effect for Background
export function ParallaxBackground({ children }: { children: ReactNode }) {
  return (
    <motion.div
      style={{ backgroundAttachment: 'fixed' }}
      initial={{ backgroundPositionY: '0%' }}
      animate={{ backgroundPositionY: '50%' }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
