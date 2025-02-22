import { useEffect, useRef } from 'react';
import { Scene, PerspectiveCamera, WebGLRenderer, Points, BufferGeometry, BufferAttribute, PointsMaterial, AdditiveBlending } from 'three/src/Three.js';

export const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Scene>();
  const cameraRef = useRef<PerspectiveCamera>();
  const rendererRef = useRef<WebGLRenderer>();
  const particlesRef = useRef<Points>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    sceneRef.current = new Scene();
    cameraRef.current = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    rendererRef.current = new WebGLRenderer({ alpha: true });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Create particles
    const particlesGeometry = new BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new BufferAttribute(positions, 3));

    const particlesMaterial = new PointsMaterial({
      size: 0.02,
      color: '#C6F135',
      transparent: true,
      opacity: 0.5,
      blending: AdditiveBlending
    });

    particlesRef.current = new Points(particlesGeometry, particlesMaterial);
    sceneRef.current.add(particlesRef.current);

    cameraRef.current.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.0005;
        particlesRef.current.rotation.y += 0.0005;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(rendererRef.current!.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />;
};
