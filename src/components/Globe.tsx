'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';

function HexSphere() {
  const ref = useRef<Mesh>(null!);

  useFrame(() => {
    ref.current.rotation.y += 0.001;
    ref.current.rotation.x += 0.0005;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2, 2]} />
      <meshBasicMaterial color="#cfa9f9" wireframe />
    </mesh>
  );
}

export default function Globe() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.6} />
      <HexSphere />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
