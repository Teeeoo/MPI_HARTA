'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Duck({ position = [0, 0, 0], scale = 1 }) {
  const group = useRef<THREE.Group>(null);
  const leftFootRef = useRef<THREE.Mesh>(null);
  const rightFootRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (leftFootRef.current && rightFootRef.current) {
      leftFootRef.current.rotation.x = Math.sin(time * 2) * 0.2;
      rightFootRef.current.rotation.x = Math.sin(time * 2 + Math.PI) * 0.2;
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.6, 12, 12]} />
        <meshBasicMaterial color="#f9dc5c" wireframe />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.35, 12, 12]} />
        <meshBasicMaterial color="#f9dc5c" wireframe />
      </mesh>
      <mesh position={[0.35, 1.2, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#222" wireframe />
      </mesh>
      <mesh position={[-0.35, 1.2, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#222" wireframe />
      </mesh>
      <mesh position={[0, 1.05, 0.35]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshBasicMaterial color="#f4a261" wireframe />
      </mesh>
      <mesh position={[0.4, 0.6, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <sphereGeometry args={[0.25, 10, 10]} />
        <meshBasicMaterial color="#f9dc5c" wireframe />
      </mesh>
      <mesh position={[-0.4, 0.6, 0]} rotation={[0, 0, Math.PI / 4]}>
        <sphereGeometry args={[0.25, 10, 10]} />
        <meshBasicMaterial color="#f9dc5c" wireframe />
      </mesh>
      <mesh ref={leftFootRef} position={[-0.2, 0.05, 0.1]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 6]} />
        <meshBasicMaterial color="#f4a261" wireframe />
      </mesh>
      <mesh ref={rightFootRef} position={[0.2, 0.05, 0.1]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 6]} />
        <meshBasicMaterial color="#f4a261" wireframe />
      </mesh>
    </group>
  );
}


function WaterRipples() {
  const circles = [];
  for (let i = 1; i <= 3; i++) {
    circles.push(
      <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.5 * i, 0.5 * i + 0.05, 32]} />
        <meshBasicMaterial color="#62d0ff" wireframe />
      </mesh>
    );
  }
  return <group>{circles}</group>;
}

function WaterSurface() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial color="#62d0ff" wireframe />
    </mesh>
  );
}

function LilyPad({ position }) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial color="#7ec850" wireframe />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <coneGeometry args={[0.05, 0.1, 5]} />
        <meshBasicMaterial color="#ff9ff3" wireframe />
      </mesh>
    </group>
  );
}

function RotatingCamera() {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const radius = 8;
    camera.position.x = Math.sin(t * 0.2) * radius;
    camera.position.z = Math.cos(t * 0.2) * radius;
    camera.lookAt(0, 0.5, 0);
  });
  return null;
}

export default function DuckScene() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <Canvas camera={{ position: [0, 1, 8], fov: 50 }} gl={{ alpha: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={1} />
        <RotatingCamera />
        <WaterSurface />
        <WaterRipples />
        <Duck position={[0, 0.1, 0]} scale={1.1} />
        <Duck position={[1.5, 0.1, -0.5]} scale={0.85} />
        <LilyPad position={[-1.5, 0.02, 1]} />
        <LilyPad position={[2, 0.02, -1.5]} />
        <LilyPad position={[-2, 0.02, -1]} />
      </Canvas>
    </div>
  );
}