import { FC, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: {
        ref?: React.RefObject<any>;
        onClick?: (event: ThreeEvent<MouseEvent>) => void;
        onPointerOver?: (event: ThreeEvent<PointerEvent>) => void;
        onPointerOut?: (event: ThreeEvent<PointerEvent>) => void;
        [key: string]: any;
      };
      sphereGeometry: {
        args?: [radius?: number, widthSegments?: number, heightSegments?: number];
        [key: string]: any;
      };
      meshStandardMaterial: {
        color?: string;
        transparent?: boolean;
        opacity?: number;
        [key: string]: any;
      };
    }
  }
}

interface SceneProps {
  color?: string;
}

const Scene: FC<SceneProps> = ({ color = "#C6F135" }) => {
  const sphereRef = useRef<JSX.IntrinsicElements['mesh']>(null);
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
