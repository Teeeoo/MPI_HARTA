'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

type LayerProps = {
  y: number;
  color?: string;
};

function SoftwareLayer({ y, color = '#cfa9f9' }: LayerProps) {
  const group = useRef<THREE.Group>(null);

  // Creeaza 3 cuburi pe fiecare layer
  const cubes = [
    [-1, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
  ];

  return (
    <group ref={group} position={[0, y, 0]}>
      {cubes.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial wireframe color={color} />
        </mesh>
      ))}
    </group>
  );
}

function ConnectionLines() {
  const material = new THREE.LineBasicMaterial({ color: '#888' });
  const points = [
    new THREE.Vector3(0, 2, 0),
    new THREE.Vector3(-1, 0, 0),

    new THREE.Vector3(0, 2, 0),
    new THREE.Vector3(0, 0, 0),

    new THREE.Vector3(0, 2, 0),
    new THREE.Vector3(1, 0, 0),

    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, -2, 0),

    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, -2, 0),
  ];

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return <lineSegments geometry={geometry} material={material} />;
}

function SoftwareStructure3D() {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.001;
    }
  });

  return (
  <group ref={group} scale={1.4}> {/* ajusteaza valoarea dupa preferinta */}
    <SoftwareLayer y={2} color="#f9dc5c" />
    <SoftwareLayer y={0} color="#62d0ff" />
    <SoftwareLayer y={-2} color="#dc91ff" />
    <ConnectionLines />
  </group>
);

}

export default function Ring3D() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.4} />
        <SoftwareStructure3D />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate />
      </Canvas>
    </div>
  );
}
