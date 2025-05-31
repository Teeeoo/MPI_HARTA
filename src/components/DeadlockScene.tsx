'use client';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';

export default function DeadlockModel() {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 1.5;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const lines = useMemo(() => {
    return [0, 2, 4, 6].map((i) => {
      const angle1 = (i / 8) * 2 * Math.PI;
      const angle2 = ((i + 1) / 8) * 2 * Math.PI;

      const p1 = new THREE.Vector3(radius * Math.cos(angle1), radius * Math.sin(angle1), 0);
      const p2 = new THREE.Vector3(radius * Math.cos(angle2), radius * Math.sin(angle2), 0);

      const geometry = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const material = new THREE.LineBasicMaterial({ color: 'white' });

      return new THREE.Line(geometry, material);
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 3, 5]} intensity={1} />
      <OrbitControls />
      <group ref={groupRef}>
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          const isProcess = i % 2 === 0;

          return (
            <mesh key={i} position={[x, y, 0]}>
              <boxGeometry args={isProcess ? [0.4, 0.4, 0.4] : [0.2, 0.6, 0.2]} />
              <meshBasicMaterial
                wireframe
                color={isProcess ? '#62D0FF' : '#F9DC5C'}
              />
            </mesh>
          );
        })}

        {lines.map((line, i) => (
          <primitive key={i} object={line} />
        ))}
      </group>
    </>
  );
}
