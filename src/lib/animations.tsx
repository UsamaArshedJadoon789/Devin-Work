import { motion } from 'framer-motion';
import mojs from 'mojs';
import velocity from 'velocity-animate';
import gsap from 'gsap';

export { motion };

// Velocity.js animations
export const velocityAnimate = (
  element: HTMLElement, 
  properties: { [key: string]: string | number | number[] | string[] }, 
  options: { 
    easing?: string;
    duration?: number;
    queue?: boolean;
    [key: string]: any;
  } = {}
) => {
  return velocity(element, properties, {
    easing: 'easeOutExpo',
    duration: 300,
    queue: false,
    ...options
  } as any);
};

// Anime.js animations
export const cardAnimation = {
  scale: [1, 1.05],
  duration: 300,
  easing: 'easeOutQuad'
};

// Framer Motion variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// Three.js setup
export { ThreeScene as ThreeBackground } from '@/components/ThreeScene';

// Mo.js burst effect
export const createBurst = (x: number, y: number, options?: { color?: string; radius?: number }) => {
  return new mojs.Burst({
    left: x,
    top: y,
    radius: { 0: options?.radius || 100 },
    count: 5,
    children: {
      shape: 'circle',
      radius: { 8: 0 },
      fill: options?.color || '#C6F135',
      scale: { 1: 0 },
      duration: 500,
      easing: 'quad.out'
    }
  });
};



// Utility for handling reduced motion preference
export const shouldReduceMotion = () => 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Animation presets
export const presets = {
  fadeUp: {
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    easing: 'easeOutQuad'
  },
  scaleIn: {
    scale: [0.9, 1],
    opacity: [0, 1],
    duration: 400,
    easing: 'easeOutQuad'
  },
  slideIn: {
    translateX: [-100, 0],
    opacity: [0, 1],
    duration: 500,
    easing: 'easeOutQuad'
  }
};

// GSAP timeline animations
export const createPageTimeline = (element: HTMLElement) => {
  return gsap.timeline()
    .from(element, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    });
};
