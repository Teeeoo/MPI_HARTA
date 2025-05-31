'use client';

import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';

export default function Cursor3D() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const targetRef = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const target = targetRef.current;
    target.x += (mouse.x * 3 - target.x) * 0.1;
    target.y += (mouse.y * 2 - target.y) * 0.1;

    if (groupRef.current) {
      groupRef.current.position.x = target.x;
      groupRef.current.position.y = target.y;
    }
  });

  return (
    <group ref={groupRef} scale={0.98}>
      {/* Triunghi pointer 3D */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, -0.7]}>
        <coneGeometry args={[0.15, 0.5, 3]} />
        <meshBasicMaterial color="#94D1E1" wireframe />
      </mesh>

      {/* Tija clic (cub mic) */}
      <mesh position={[0.15, -0.25, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#dc91ff" wireframe />
      </mesh>
    </group>
  );
}
