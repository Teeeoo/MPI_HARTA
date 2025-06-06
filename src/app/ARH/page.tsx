'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  MainContainer,
  Label,
  Star,
  StarsBackground,
} from '@/components/styled';
import Arhitecture from '@/components/Arhitecture';

const headings = [
  'Activități principale',
  'Relații cu alte subdomenii',
  'Probleme importante și deschise',
  'Persoane importante',
  'Forumuri importante',
  'Dimensiune locală și globală',
];

const contentMap: Record<string, string[]> = {
  'Activități principale': [
    'Teorie: Fundamentele arhitecturii Von Neumann, modelele RISC/CISC, structura procesorului, memoriei și magistralelor; conceptele de paralelism, pipelining și arhitecturi hibride.',
    'Experiment: Analiza performanței procesoarelor, compararea arhitecturilor hardware/software prin simulări, utilizarea microserviciilor în aplicații cloud și testarea scalabilității acestora.',
    'Design: Proiectarea de sisteme la scară mare: calculatoare, servere, arhitecturi distribuite (cloud); organizarea logică a aplicațiilor (monolitice, microservicii); alegerea modelelor optime pentru eficiență și mentenanță.',
  ],
  'Relații cu alte subdomenii': [
    'Sisteme de operare - gestionează resursele definite de arhitectura hardware.',
    'Programare - influențată de tipul arhitecturii (RISC vs CISC).',
    'Rețele - esențiale pentru microservicii și aplicații distribuite.',
    'AI - folosește arhitecturi specializate (GPU, TPU).',
    'Securitate - afectată de modul în care sistemul e proiectat.'

  ],
  'Probleme importante și deschise': [
    'Blocajul Von Neumann: accesul unic la memorie încetinește procesorul.',
    'Complexitatea microserviciilor: necesită instrumente speciale pentru coordonare și securitate.',
    'RISC vs CISC: o	RISC: instrucțiuni simple, rapide (ex: ARM). o	CISC: instrucțiuni complexe, versatile (ex: x86).',
    'Întrebare cheie: Cum poate arhitectura unui sistem să influențeze performanța, mentenanța și scalabilitatea aplicațiilor?',
  ],
  'Persoane importante': [
    'John von Neumann - Fondatorul arhitecturii moderne a calculatoarelor.',
    'David Patterson & John Hennessy - Pionieri ai arhitecturii RISC.',
    'Alan Kay - Inițiator al arhitecturii software moderne și al OOP.'
  ],
  'Forumuri importante': [
    'IEEE Transactions on Computers: computer.org',
    'Journal of Systems Architecture: Elsevier',
    'ISCA, ICSE, Hot Chips - Conferințe internaționale de top',
    'Patterson & Hennessy - Computer Organization and Design',
    'Tanenbaum - Structured Computer Organization',
    'Wikipedia - Von Neumann architecture'
  ],
  'Dimensiune locală și globală': [
    'Liviu Mafteiu-Scai - Conf. univ. dr., specialist în arhitectura calculatoarelor, rețele de calculatoare și sisteme embedded. Predă cursuri fundamentale de arhitectură și proiectarea sistemelor hardware.',
    'Cosmin Bonchiș - Calcul paralel, arhitecturi neconvenționale',
    'Carnegie Mellon, ETH Zürich - Centre de cercetare de top',
    'Proiecte internaționale: Arhitecturi pentru AI și cloud computing'
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
  const subject = params?.subject ? decodeURIComponent(params.subject as string) : 'Arhitectură';

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

      <Arhitecture />

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
              ? ['Arhitectura reprezintă modul în care sunt organizate componentele hardware și software ale unui sistem informatic. Ea definește structura și funcționarea sistemelor, de la calculatoare personale la aplicații distribuite în cloud.']
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
