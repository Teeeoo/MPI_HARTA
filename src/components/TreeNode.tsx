'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

type TreeNodeProps = {
  position: [number, number, number];
  color: string;
  connections?: THREE.Vector3[];
};

function TreeNode({ position, color, connections = [] }: TreeNodeProps) {
  return (
    <group>
      <mesh position={position}>
        <sphereGeometry args={[0.4, 18, 18]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>

      {connections.map((childPos, index) => (
        <SimpleLine key={index} start={position} end={[childPos.x, childPos.y, childPos.z]} />
      ))}
    </group>
  );
}

function SimpleLine({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  const material = useMemo(() => new THREE.LineBasicMaterial({ color: '#D2B2FF' }), []);

  const lineRef = useRef<THREE.Line>(null);

  return <primitive object={new THREE.Line(geometry, material)} ref={lineRef} />;
}

function BinaryTree() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const s = 1.5; // scale (putin mai mare decat 1.3)
  const offsetY = -1.2;

  const positions = {
    root: new THREE.Vector3(0, 2 * s + offsetY, 0),
    left1: new THREE.Vector3(-1.2 * s, 1 * s + offsetY, 0),
    right1: new THREE.Vector3(1.2 * s, 1 * s + offsetY, 0),
    left2: new THREE.Vector3(-1.8 * s, 0 * s + offsetY, 0),
    right2: new THREE.Vector3(-0.6 * s, 0 * s + offsetY, 0),
    left3: new THREE.Vector3(0.6 * s, 0 * s + offsetY, 0),
    right3: new THREE.Vector3(1.8 * s, 0 * s + offsetY, 0),
  };

  const pastelColors = [
    '#B3E5FC', // albastru pastel
    '#FFCCBC', // portocaliu deschis
    '#D1C4E9', // mov pastel
    '#C8E6C9', // verde deschis
    '#FFF9C4', // galben pal
    '#F8BBD0', // roz deschis
    '#DCEDC8', // verde lime pastel
  ];

  return (
    <group ref={groupRef}>
      <TreeNode position={[positions.root.x, positions.root.y, positions.root.z]} color={pastelColors[0]} connections={[positions.left1, positions.right1]} />
      <TreeNode position={[positions.left1.x, positions.left1.y, positions.left1.z]} color={pastelColors[1]} connections={[positions.left2, positions.right2]} />
      <TreeNode position={[positions.right1.x, positions.right1.y, positions.right1.z]} color={pastelColors[2]} connections={[positions.left3, positions.right3]} />
      <TreeNode position={[positions.left2.x, positions.left2.y, positions.left2.z]} color={pastelColors[3]} />
      <TreeNode position={[positions.right2.x, positions.right2.y, positions.right2.z]} color={pastelColors[4]} />
      <TreeNode position={[positions.left3.x, positions.left3.y, positions.left3.z]} color={pastelColors[5]} />
      <TreeNode position={[positions.right3.x, positions.right3.y, positions.right3.z]} color={pastelColors[6]} />
    </group>
  );
}

export default function BinaryTree3D() {
  return (
    <Canvas camera={{ position: [0, 4, 10], fov: 50 }}>
      <ambientLight />
      <BinaryTree />
      <OrbitControls enablePan={false} />
    </Canvas>
  );
}
