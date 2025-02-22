import anime from 'animejs';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import mojs from 'mojs';
import Zdog from 'zdog';

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
export const initThreeBackground = (container: HTMLElement) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  
  return { scene, camera, renderer };
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
    dragRotate: true
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
  }
};
