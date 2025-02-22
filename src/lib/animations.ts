import anime from 'animejs';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import mojs from 'mojs';
import Zdog from 'zdog';
import { animate, spring } from 'popmotion';
import { NodeGroup } from 'react-move';
import { Sequence } from 'remotion';
import Reveal from 'react-reveal/Fade';

// Export animation components and utilities for direct use
export { motion, AnimatePresence, NodeGroup, Sequence, Reveal, anime, spring, animate };

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
export const ThreeBackground = () => {
  return (
    <Canvas>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#C6F135" />
      </mesh>
    </Canvas>
  );
};

// Mo.js burst effect
export const createBurst = (x: number, y: number) => {
  return new mojs.Shape({
    left: x,
    top: y,
    scale: { 0: 1 },
    duration: 1000,
    easing: 'quad.out',
    shape: 'circle',
    fill: '#C6F135',
    radius: 50,
    opacity: { 1: 0 }
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
