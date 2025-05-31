'use client';

import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';

// Extend shader material so it works with JSX
extend({ ShaderMaterial: THREE.RawShaderMaterial });

function MobiusMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uTime = useRef({ value: 0 });

  const segments = 200;
  const radialSegments = 20;
  const radius = 1.2;
  const width = 0.28;

  const geometry = useMemo(() => {
    const positions: number[] = [];
    const indices: number[] = [];

    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      const cos = Math.cos(t);
      const sin = Math.sin(t);
      const halfT = t / 2;

      for (let j = 0; j <= radialSegments; j++) {
        const s = (j / radialSegments - 0.5) * 2;
        const x = (radius + s * width * Math.cos(halfT)) * cos;
        const y = (radius + s * width * Math.cos(halfT)) * sin;
        const z = s * width * Math.sin(halfT);

        positions.push(x, z, y); // atenție: y ↔ z pentru poziționare
      }
    }

    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const a = i * (radialSegments + 1) + j;
        const b = a + radialSegments + 1;

        indices.push(a, a + 1);
        indices.push(a + 1, b + 1);
        indices.push(b + 1, b);
        indices.push(b, a);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setIndex(indices);
    return geo;
  }, []);

  const material = useMemo(() => {
    return new THREE.RawShaderMaterial({
      wireframe: true,
      vertexShader: `
        precision mediump float;
        attribute vec3 position;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying float vPosition;

        void main() {
          vPosition = position.x; // 🔸 gradient pe lungimea benzii
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform float uTime;
        varying float vPosition;

        void main() {
          float mixVal = sin(vPosition * 2.5 + uTime) * 0.5 + 0.5;

          vec3 colorA = vec3(1.0, 0.8, 0.9); // pastel pink
          vec3 colorB = vec3(0.7, 1.0, 1.0); // pastel cyan
          vec3 color = mix(colorA, colorB, mixVal);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      uniforms: {
        uTime: uTime.current,
      },
    });
  }, []);

  useFrame(({ clock }) => {
    uTime.current.value = clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

export default function MobiusStrip3D() {
  return (
    <Canvas camera={{ position: [0, 2.5, 5], fov: 60 }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <MobiusMesh />
      <OrbitControls enablePan={false} />
    </Canvas>
  );
}
