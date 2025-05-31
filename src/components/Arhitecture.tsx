'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Part({
  position,
  size,
  color
}: {
  position: [number, number, number],
  size: [number, number, number],
  color: string
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

function ArchitectureGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002; // rotatie lenta
    }
  });

  return (
    <group ref={groupRef}>
      {/* Motherboard */}
      <Part position={[0, -1.2, 0]} size={[5, 0.2, 3]} color="#b0c4de" />

      {/* CPU */}
      <Part position={[-1.5, -0.7, 0]} size={[1, 0.4, 1]} color="#f4a4a4" />

      {/* GPU */}
      <Part position={[1.5, -0.7, 0]} size={[1.5, 0.4, 0.7]} color="#a4d4f4" />

      {/* RAM */}
      <Part position={[0, -0.4, 1.2]} size={[0.4, 0.3, 1]} color="#b2f2bb" />
      <Part position={[0.6, -0.4, 1.2]} size={[0.4, 0.3, 1]} color="#b2f2bb" />

      {/* SSD */}
      <Part position={[0, -0.6, -1.2]} size={[1.2, 0.2, 0.6]} color="#ffeaa7" />

      {/* OS */}
      <Part position={[0, 0.6, 0]} size={[4, 0.1, 2]} color="#d5a6bd" />

      {/* Applications */}
      <Part position={[0, 1.2, 0]} size={[3, 0.1, 1.5]} color="#bae1ff" />
    </group>
  );
}

export default function Arhitecture() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas camera={{ position: [0, 3, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <ArchitectureGroup />
      </Canvas>
    </div>
  );
}
