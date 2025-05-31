'use client';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';

export default function DatabaseModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0015; // rotatie lina si subtila
    }
  });

  const nodes = useMemo(() => {
    const positions = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(3, 2, 0),
      new THREE.Vector3(-3, 2, 0),
      new THREE.Vector3(3, -2, 0),
      new THREE.Vector3(-3, -2, 0),
      new THREE.Vector3(0, 3, 2),
      new THREE.Vector3(0, -3, -2),
    ];

    return positions.map((pos, i) => (
      <mesh key={i} position={pos}>
        <boxGeometry args={i === 0 ? [1, 1, 1] : [0.5, 0.5, 0.5]} />
        <meshBasicMaterial
          wireframe
          color={i === 0 ? '#62D0FF' : '#F9DC5C'}
        />
      </mesh>
    ));
  }, []);

  const lines = useMemo(() => {
    const center = new THREE.Vector3(0, 0, 0);
    const targets = [
      new THREE.Vector3(3, 2, 0),
      new THREE.Vector3(-3, 2, 0),
      new THREE.Vector3(3, -2, 0),
      new THREE.Vector3(-3, -2, 0),
      new THREE.Vector3(0, 3, 2),
      new THREE.Vector3(0, -3, -2),
    ];

    return targets.map((target, i) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([center, target]);
      const material = new THREE.LineBasicMaterial({ color: 'white' });
      return <primitive key={i} object={new THREE.Line(geometry, material)} />;
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 3, 5]} intensity={1} />
      <OrbitControls />
      <group ref={groupRef} scale={0.7}>
        {nodes}
        {lines}
      </group>
    </>
  );
}
