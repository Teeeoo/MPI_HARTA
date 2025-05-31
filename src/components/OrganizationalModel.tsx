'use client';

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

export default function OrganizationalModel() {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 1.3;

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
    }
  });

  const positions = useMemo(() => {
    const pos: THREE.Vector3[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * 2 * Math.PI;
      pos.push(new THREE.Vector3(radius * Math.cos(angle), radius * Math.sin(angle), 0));
    }
    return pos;
  }, []);

  const labels = ['HR', 'Logistics', 'IT', 'Sales', 'Support', 'Finance'];
  const pastelColors = ['#ffb3ba', '#bae1ff', '#baffc9', '#ffffba', '#e2baff', '#ffd1dc'];

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} intensity={1} />
      <OrbitControls enableZoom={false} />

      <group ref={groupRef}>
        {/* Nod central */}
        <mesh>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshBasicMaterial wireframe color="#62D0FF" />
        </mesh>

        {/* Cuburi externe si conexiuni */}
        {positions.map((pos, index) => (
          <group key={index}>
            {/* Linie catre centru */}
            <primitive
              object={new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([
                  new THREE.Vector3(0, 0, 0),
                  pos
                ]),
                new THREE.LineBasicMaterial({ color: '#aaaaaa' })
              )}
            />

            {/* Cub pastel */}
            <mesh position={pos}>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshBasicMaterial wireframe color={pastelColors[index % pastelColors.length]} />
            </mesh>

            {/* Label */}
            <Html position={[pos.x, pos.y - 0.35, pos.z]} center style={{ pointerEvents: 'none' }}>
              <div
                style={{
                  color: 'white',
                  fontSize: '10px',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  fontFamily: 'sans-serif'
                }}
              >
                {labels[index]}
              </div>
            </Html>
          </group>
        ))}
      </group>
    </>
  );
}