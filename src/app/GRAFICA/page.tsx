'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  MainContainer,
  Label,
  Star,
  StarsBackground,
} from '@/components/styled';
import GraphicsMockup from '@/components/Grafica';

const headings = [
  'Activități principale',
  'Relații cu alte subdomenii',
  'Probleme importante și deschise',
  'Persoane importante',
  'Forumuri importante',
  'Dimensiune locală și globală',
];

const contentMap: Record<string, string[]> = {
  'Activități principale': ['Teorie: geometrie computațională, modelarea matematică, algoritmi de randare, teoria culorii și spații de culoare, teoria eșantionării și reconstrucției, sisteme procedurale, fizica lumini și materialelor.',
    'Experiment: Validarea tehnicilor prin simulări, benchmark-uri și analiză cantitativă(testarea performanței, evaluarea calității vizuale, studii de percepție umană)',
    'Design: Proiectarea soluțiilor vizuale eficiente, scalabile și ușor de întreținut, arhitecturi de randare, design procedural, standardizare și interoperabilitat'

  ],
  'Relații cu alte subdomenii': [
    'Algoritmi și structuri de date: Grafica digitală se bazează pe algoritmi eficienți și pe structuri de date optimizate.',
    'Limbaje de programare: Implementarea tehnicilor grafice se face în limbaje de nivel înalt, dar și în limbaje specializate pentru GPU.',
    'Arhitectura: arhitectura GPU-urilor, memorie video, paralelism masiv. Fără hardware dedicat, nu există randare în timp real.',
    'Sisteme de operare și rețele: gestionează memoria grafică, sincronizează firele de execuție și coordonează procesele grafice prin drivere și API-uri specializate.',
    'Interacțiune om-computer: Interfețele grafice și realitatea augmentată/virtuală depind de o reprezentare intuitivă și estetică a informației.',
    'Baze de date: Texturi, modele 3D, animații și materiale sunt organizate în baze de date pentru acces eficient și reutilizare.',
    'Inteligență Artificială: generare de conținut grafic realist, optimizarea randării, animații automate.',
  ],
  'Probleme importante și deschise': [
    'Performanța și optimizarea graficii',
    'Realismul vizual',
    'Sincronizarea și paralelismul în randare',
    'Randare realistă în timp real',
    'Grafică asistată de AI',
    'Simularea fizicii și a naturii realiste la cost redus',
  ],
  'Persoane importante': [
    'Ivan Sutherland - creatorul Sketchpad, primul sistem interactiv de grafică; pionier al interfețelor vizuale.',
    'Edwin Catmull - inventatorul Z-buffer-ului, a dezvoltat tehnici de texturare și anti-aliasing în animația 3D.',
    'Pat Hanrahan - co-creator RenderMan, a dezvoltat limbaje de shadere și instrumente pentru vizualizare științifică.	'
  ],
  'Forumuri importante': [
    'IEEE Transactions on Visualization and Computer Graphics (TVCG): https://ieeexplore.ieee.org/xpl ',
    'ACM Transactions on Graphics (TOG): https://dl.acm.org/journal/tog',
    'Graphics Interface: https://graphicsinterface.org',
    'ACM SIGGRAPH: https://s2025.siggraph.org'
  ],
  'Dimensiune locală și globală': [
    'Marc Frîncu - Big Data, Distributed Systems, Cultural heritage visualization, XR, Graphics and user interfaces',
    'Sebastian-Aurelian Ștefănigă - Medical Image Processing, Computer Vision, HPC Computing, Artificial Intelligence, Machine Learning, Statistics',
    'Raluca Mureșan -  Applied Math, Dynamical Systems, Stability Theory, Evolution Equations',
    'Dana Petcu - Distributed/Parallel Computing',
    'Centre de excelență: MIT Media Lab, Stanford University, ETH Zurich',
    'Proiecte internaționale: „Machine Learning Denoiser”, “Open3D“, “Vulkan”'
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

export default function GraphicsPage() {
  const subject = 'Grafică';

  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [stars, setStars] = useState<StarData[]>([]);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    setIsClient(true);

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

  if (!isClient) return null;

  const getDropdownSide = (x: number) => (x >= 0 ? 'right' : 'left');

  return (
    <MainContainer>
      <StarsBackground>
        {stars.map((star, i) => (
          <Star
            key={i}
            x={star.x}
            y={star.y}
            size={star.size}
            delay={star.delay}
          />
        ))}
      </StarsBackground>

      <GraphicsMockup />

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
              ? ['Grafica digitală este ramura informaticii care se ocupă cu generarea, procesarea și reprezentarea vizuală a datelor folosind calculatoarele. Computerul este utilizat pentru sintetizarea, modificarea, stocarea și managementul imaginilor, precum și pentru prelucrarea informației vizuale obținute din realitatea înconjurătoare.']
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
