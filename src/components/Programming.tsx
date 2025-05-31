'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export default function Programming() {
  const group = useRef<Group>(null);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002; // rotatie automata
    }
  });

  return (
    <group ref={group} scale={1.2}>
      {/* Simbol < (Z separare -0.05) */}
      <mesh rotation={[0, 0, Math.PI / 6]} position={[-1.3, -0.3, -0.05]}>
        <boxGeometry args={[0.1, 1.0, 0.1]} />
        <meshBasicMaterial wireframe color="#62D0FF" />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 6]} position={[-1.3, 0.3, 0.05]}>
        <boxGeometry args={[0.1, 1.0, 0.1]} />
        <meshBasicMaterial wireframe color="#62D0FF" />
      </mesh>

      {/* Simbol / */}
      <mesh rotation={[0, 0, -Math.PI / 4]} position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 1.2, 0.1]} />
        <meshBasicMaterial wireframe color="#62D0FF" />
      </mesh>

      {/* Simbol > (Z separare -0.05 și +0.05) */}
      <mesh rotation={[0, 0, -Math.PI / 6]} position={[1.3, -0.3, -0.05]}>
        <boxGeometry args={[0.1, 1.0, 0.1]} />
        <meshBasicMaterial wireframe color="#62D0FF" />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 6]} position={[1.3, 0.3, 0.05]}>
        <boxGeometry args={[0.1, 1.0, 0.1]} />
        <meshBasicMaterial wireframe color="#62D0FF" />
      </mesh>
    </group>
  );
}
