'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import {
  MainContainer,
  Label,
  Star,
  StarsBackground,
} from '@/components/styled';

const CanvasBackground = dynamic(() => import('@/components/CanvasBackground'), { ssr: false });

const headings = [
  'Paradigme de programare',
  'Limbaje populare și utilizări',
  'Evoluția limbajelor',
  'Transpiling și compilare',
  'Frameworkuri și ecosisteme',
  'Performanță și optimizare',
];

const contentMap: Record<string, string[]> = {
  'Paradigme de programare': [
    'Imperativ: C, Pascal — se bazează pe instrucțiuni pas cu pas.',
    'Funcțional: Haskell, Lisp — funcții pure și imutabilitate.',
    'OOP: Java, C++ — structurat pe clase și obiecte.',
    'Logica: Prolog — bazat pe reguli și fapte logice.',
  ],
  'Limbaje populare și utilizări': [
    'JavaScript — web front-end & back-end.',
    'Python — AI, scripting, educație.',
    'Java — aplicații enterprise, Android.',
    'C/C++ — sisteme, embedded, jocuri.',
    'Rust & Go — performanță și siguranță.',
  ],
  'Evoluția limbajelor': [
    '1950-1970: limbaje simple (Fortran, Lisp).',
    '1980-1990: orientarea pe obiecte (C++, Java).',
    '2000+: scripting și interpretare (Python, JS).',
    '2020+: siguranță, paralelism, web-native (Rust, TypeScript).',
  ],
  'Transpiling și compilare': [
    'Compilare: cod sursă → cod mașină (ex: C, Rust).',
    'Interpretare: linie cu linie (ex: Python).',
    'Transpiling: TypeScript → JavaScript, Babel, Webpack.',
    'JIT (Just-in-Time): Java, V8 — performanță hibridă.',
  ],
  'Frameworkuri și ecosisteme': [
    'JavaScript: React, Vue, Angular.',
    'Python: Django, Flask, FastAPI.',
    'Java: Spring, Jakarta EE.',
    'C#: .NET, Blazor.',
  ],
  'Performanță și optimizare': [
    'Managementul memoriei (GC vs manual).',
    'Paralelism: multithreading, async/await.',
    'Optimizări de compilator.',
    'Benchmarking și profiling.',
  ],
};

type StarData = {
  x: number;
  y: number;
  size: number;
  delay: number;
};

const Line = styled.div<{ x: number; y: number }>`  
  position: absolute;
  width: ${({ x, y }) => Math.sqrt(x * x + y * y)}px;
  height: 1px;
  background: white;
  top: 50%;
  left: 50%;
  transform-origin: left center;
  transform: ${({ x, y }) => `rotate(${Math.atan2(y, x)}rad)`};
  opacity: 0.3;
  z-index: 1;
`;

const HeadingWrapper = styled.div.attrs<{ 'data-faded'?: string }>(props => ({
  'data-faded': props['data-faded'],
}))`
  position: absolute;
  transform: translate(-50%, -50%);
  opacity: ${({ 'data-faded': faded }) => (faded ? 0.3 : 1)};
  pointer-events: ${({ 'data-faded': faded }) => (faded ? 'none' : 'auto')};
  transition: opacity 0.3s ease;
`;

const HeadingContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 10px 14px;
  color: white;
  text-align: center;
  cursor: pointer;
  z-index: 2;
`;

const SideDropdown = styled(motion.div)<{ side: 'left' | 'right' }>`
  position: fixed;
  top: 35%;
  ${({ side }) => side}: 40px;
  transform: translateY(-50%);
  background: rgba(17, 17, 17, 0.95);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 15px #000;
  width: 428px;
  max-height: 70vh;
  overflow-y: auto;
  color: white;
  z-index: 999;
`;

export default function SubjectPage() {
  const params = useParams();
  const subject = params?.subject ? decodeURIComponent(params.subject as string) : 'Limbaje de programare';

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [stars, setStars] = useState<StarData[]>([]);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const generateStars = (count: number): StarData[] =>
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
      }));
    setStars(generateStars(100));

    const radius = 320;
    const newPositions = headings.map((_, index) => {
      const angle = (index / headings.length) * 2 * Math.PI;
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
      };
    });
    setPositions(newPositions);
  }, []);

  const getDropdownSide = (x: number) => (x >= 0 ? 'right' : 'left');

  return (
    <MainContainer>
      <StarsBackground>
        {stars.map((star, i) => (
          <Star key={i} x={star.x} y={star.y} size={star.size} delay={star.delay} />
        ))}
      </StarsBackground>

      <CanvasBackground />

      <Label
        x={0}
        y={0}
        id="central-title"
        style={{ fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer' }}
        onClick={() => setActiveIndex(-1)}
      >
        {subject}
      </Label>

      {positions.map((pos, index) => (
        <div key={index}>
          <Line x={pos.x} y={pos.y} />
          <HeadingWrapper
            data-faded={activeIndex !== null && activeIndex !== index ? 'true' : undefined}
            style={{
              left: `calc(50% + ${pos.x}px)`,
              top: `calc(50% + ${pos.y}px)`
            }}
          >
            <HeadingContent
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {headings[index]}
            </HeadingContent>
          </HeadingWrapper>
        </div>
      ))}

      {activeIndex !== null && (
        <SideDropdown
          key={activeIndex}
          side={activeIndex === -1 ? 'right' : getDropdownSide(positions[activeIndex]?.x || 0)}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          <h3 style={{ marginBottom: '12px', fontWeight: '600', fontSize: '1.3rem', color: '#f9dc5c' }}>
            {activeIndex === -1 ? subject : headings[activeIndex]}
          </h3>
          <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
            {(activeIndex === -1
              ? ['Limbajele de programare reprezintă unelte esențiale prin care oamenii pot comunica cu sistemele de calcul. Ele pot varia în paradigme, scop, nivel de abstractizare și eficiență. Înțelegerea lor este fundamentală pentru dezvoltatori și ingineri software.']
              : contentMap[headings[activeIndex]]
            )?.map((point, i) => (
              <li
                key={i}
                style={{
                  marginBottom: '12px',
                  fontSize: '1.05rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #94D1E1'
                }}
              >
                {point}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '16px', textAlign: 'right' }}>
            <button
              onClick={() => setActiveIndex(null)}
              style={{
                background: 'transparent',
                color: '#fff',
                border: '1px solid #555',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Închide
            </button>
          </div>
        </SideDropdown>
      )}
    </MainContainer>
  );
}
