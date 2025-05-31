'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function RobotPart({
  position,
  size,
  color
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshBasicMaterial wireframe color={color} />
    </mesh>
  );
}

function RobotHead() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <RobotPart position={[0, 0, 0]} size={[2, 2, 2]} color="#cde8e5" /> {/* pastel mint */}

      {/* Eyes */}
      <RobotPart position={[-0.5, 0.4, 1.05]} size={[0.3, 0.3, 0.1]} color="#f6f1f1" /> {/* soft white */}
      <RobotPart position={[0.5, 0.4, 1.05]} size={[0.3, 0.3, 0.1]} color="#f6f1f1" />

      {/* Nose */}
      <RobotPart position={[0, 0, 1.05]} size={[0.2, 0.2, 0.1]} color="#f2aaaa" /> {/* pastel red */}

      {/* Mouth */}
      <RobotPart position={[0, -0.5, 1.05]} size={[1, 0.2, 0.1]} color="#b4b4b3" /> {/* soft gray */}

      {/* Ears */}
      <RobotPart position={[-1.1, 0, 0]} size={[0.2, 0.6, 0.6]} color="#dab6fc" /> {/* light purple */}
      <RobotPart position={[1.1, 0, 0]} size={[0.2, 0.6, 0.6]} color="#dab6fc" />

      {/* Top Light */}
      <RobotPart position={[0, 1.2, 0]} size={[0.4, 0.4, 0.4]} color="#ffe194" /> {/* pastel yellow */}
    </group>
  );
}

export default function Robot() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas camera={{ position: [0, 1.5, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <RobotHead />
      </Canvas>
    </div>
  );
}
