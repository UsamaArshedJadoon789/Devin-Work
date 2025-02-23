import { motion } from 'framer-motion';
import { ReactNode } from 'react';

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
export function AnimatedButton({ children, onClick }: { children: ReactNode, onClick?: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
      onClick={onClick}
    >
      {children}
    </motion.button>
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
