import { motion } from "framer-motion";
import * as React from "react";

interface FloatingAnimationProps {
  children: React.ReactNode;
  delay?: number;
}

export const FloatingAnimation: React.FC<FloatingAnimationProps> = ({ 
  children, 
  delay = 0 
}) => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      animate={{ 
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};
