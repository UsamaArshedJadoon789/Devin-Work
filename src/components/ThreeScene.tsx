import { FC, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Mesh, BufferGeometry, Material } from 'three';

// Extend Three.js with custom elements
extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: any;
      stars: any;
      ambientLight: any;
      pointLight: any;
      mesh: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
    }
  }
}

// Extend Three.js with custom elements
extend({ OrbitControls });

interface SceneProps {
  color?: string;
}

const Scene: FC<SceneProps> = ({ color = "#C6F135" }) => {
  const sphereRef = useRef<Mesh<BufferGeometry, Material>>(null);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = 5;
  }, [camera]);

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} />
      <Stars count={1000} depth={50} factor={4} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </>
  );
};

export interface ThreeSceneProps {
  color?: string;
}

export const ThreeScene: FC<ThreeSceneProps> = ({ color }) => {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Scene color={color} />
    </Canvas>
  );
};
