import { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

export const ThreeScene: FC = () => {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <OrbitControls enableZoom={false} enablePan={false} />
      <Stars count={1000} depth={50} factor={4} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#C6F135" transparent opacity={0.6} />
      </mesh>
    </Canvas>
  );
};
