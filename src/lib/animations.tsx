import { motion } from 'framer-motion';
import mojs from 'mojs';
import velocity from 'velocity-animate';
import Zdog from 'zdog';

// Export animation components and utilities for direct use
export { motion };

// Velocity.js animations
export const velocityAnimate = (element: HTMLElement, properties: any, options: any = {}) => {
  return velocity(element, properties, {
    easing: 'easeOutExpo',
    duration: 300,
    ...options
  });
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

// Zdog illustration
export const createZdogLogo = (element: HTMLElement) => {
  const illustration = new Zdog.Illustration({
    element,
    dragRotate: true,
    rotate: { x: -0.5, y: 0.5, z: 0 }
  });

  // Create main shape
  new Zdog.Shape({
    addTo: illustration,
    stroke: 20,
    color: '#C6F135',
    path: [
      { x: -40, y: -40 },
      { x:  40, y: -40 },
      { x:  40, y:  40 },
      { x: -40, y:  40 },
    ],
    closed: true,
  });

  // Add inner details
  new Zdog.Shape({
    addTo: illustration,
    stroke: 10,
    color: '#91AD29',
    path: [
      { x: -20, y: -20 },
      { x:  20, y: -20 },
      { x:  20, y:  20 },
      { x: -20, y:  20 },
    ],
    closed: true,
  });
  
  return illustration;
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
  },
  // Popmotion spring animation
  springBounce: {
    type: "spring",
    stiffness: 200,
    damping: 15,
    mass: 1
  },
  // Mo.js burst effect
  burst: {
    radius: { 0: 100 },
    count: 5,
    duration: 1000,
    children: {
      shape: 'circle',
      duration: 500,
      fill: ['#C6F135', '#91AD29'],
      radius: 20,
      angle: { 0: 180 }
    }
  },
  // Zdog illustration preset
  zdogSpin: {
    rotate: {
      x: 0,
      y: Math.PI * 2,
      z: 0
    },
    duration: 3000,
    easing: 'easeInOutQuad'
  },
  // React Move transitions
  moveTransition: {
    timing: { duration: 750, ease: 'easeInOutQuad' },
    events: {
      start: () => console.log('start'),
      interrupt: () => console.log('interrupt'),
      end: () => console.log('end')
    }
  }
};

// Remotion composition settings
export const remotionConfig = {
  durationInFrames: 60,
  fps: 30,
  width: 1920,
  height: 1080
};

// React Move node group config
export const nodeGroupConfig = {
  start: { opacity: 0, scale: 0 },
  enter: { opacity: [1], scale: [1], timing: { duration: 750 } },
  update: { opacity: [1], scale: [1], timing: { duration: 750 } },
  leave: { opacity: [0], scale: [0], timing: { duration: 750 } }
};
