import { FC, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

const AnimatedMesh = animated.mesh;

const Scene: FC = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = 5;
  }, [camera]);

  const { rotation } = useSpring({
    from: { rotation: 0 },
    to: { rotation: Math.PI * 2 },
    loop: true,
    config: { duration: 5000 }
  });

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} />
      <Stars count={1000} depth={50} factor={4} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AnimatedMesh 
        ref={sphereRef}
        rotation-y={rotation}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#C6F135" transparent opacity={0.6} />
      </AnimatedMesh>
    </>
  );
};

export const ThreeScene: FC = () => {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Scene />
    </Canvas>
  );
};
