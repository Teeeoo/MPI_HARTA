'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const colorHexList = ['#f9dc5c', '#62d0ff', '#dc91ff']; // culori ciclice

function HelixLines() {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  const geometry = useMemo(() => {
    const segments = 120;
    const radius = 1.2;
    const height = 20;
    const angleStep = (Math.PI * 10) / segments;
    const heightStep = height / segments;

    const positions: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < segments; i++) {
      const angle = i * angleStep;
      const y = i * heightStep - height / 2;

      const x1 = radius * Math.cos(angle);
      const z1 = radius * Math.sin(angle);

      const x2 = radius * Math.cos(angle + Math.PI);
      const z2 = radius * Math.sin(angle + Math.PI);

      const color1 = new THREE.Color(colorHexList[i % colorHexList.length]);

      // linie între baze
      positions.push(x1, y, z1, x2, y, z2);
      for (let j = 0; j < 2; j++) colors.push(color1.r, color1.g, color1.b);

      if (i > 0) {
        const prevAngle = (i - 1) * angleStep;
        const prevY = (i - 1) * heightStep - height / 2;

        const px1 = radius * Math.cos(prevAngle);
        const pz1 = radius * Math.sin(prevAngle);
        const px2 = radius * Math.cos(prevAngle + Math.PI);
        const pz2 = radius * Math.sin(prevAngle + Math.PI);

        const color2 = new THREE.Color(colorHexList[(i + 1) % colorHexList.length]);

        // spirală 1
        positions.push(px1, prevY, pz1, x1, y, z1);
        for (let j = 0; j < 2; j++) colors.push(color2.r, color2.g, color2.b);

        // spirală 2
        positions.push(px2, prevY, pz2, x2, y, z2);
        for (let j = 0; j < 2; j++) colors.push(color2.r, color2.g, color2.b);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return geometry;
  }, []);

  return (
    <group ref={group}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial vertexColors />
      </lineSegments>
    </group>
  );
}

export default function HelixWireframe() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 15] }}
        gl={{ toneMapping: THREE.NoToneMapping }}
      >
        <ambientLight intensity={1} />
        <HelixLines />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
