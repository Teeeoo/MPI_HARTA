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
  'Activități principale',
  'Relații cu alte subdomenii',
  'Probleme importante și deschise',
  'Persoane importante',
  'Forumuri importante',
  'Dimensiune locală și globală',
];

const contentMap: Record<string, string[]> = {
  'Activități principale': [
    'Teorie: Fundamente ale limbajelor formale, gramatici, autómate, paradigme de programare (imperativă, funcțională, logică, orientată pe obiect), sisteme de tipuri.',
    'Experiment: Proiectarea și implementarea de interpretoare, compilatoare, analiză statică și dinamică a codului, benchmarking al performanței limbajelor.',
    'Design: Crearea și evaluarea de noi limbaje de programare, DSL-uri (domain-specific languages), mecanisme de extensie și interoperabilitate între limbaje.',
  ],
  'Relații cu alte subdomenii': [
    'Compilatoare: Analiza lexicală, sintactică și semantică a limbajelor, optimizări și generare de cod.',
    'Programare: Influențarea stilului și structurii codului prin alegerea limbajului.',
    'Sisteme distribuite și concurente: Limbaje specializate pentru programare paralelă/concurentă (ex: Erlang, Go).',
    'Inteligență Artificială: Utilizarea limbajelor simbolice (ex: Lisp, Prolog) pentru modelare logică și reprezentare a cunoștințelor.',
  ],
  'Probleme importante și deschise': [
    'Formalizarea semanticii limbajelor și verificarea corectitudinii programelor',
    'Performanța și portabilitatea între platforme',
    'Designul de limbaje expresive dar sigure și ușor de învățat',
    'Integrarea paradigmelor multiple într-un singur limbaj',
    'Limbaje pentru programare sigură și verificabilă formal',
    'Automatizarea traducerii între limbaje diferite',
  ],
  'Persoane importante': [
    'John Backus - Creatorul limbajului FORTRAN și a formei BNF (Backus-Naur Form)',
    'Alan Kay - Pionier al programării orientate pe obiect, creatorul limbajului Smalltalk',
    'Bjarne Stroustrup - Creatorul limbajului C++',
    'Guido van Rossum - Creatorul limbajului Python',
  ],
  'Forumuri importante': [
    'Stack Overflow - Cea mai populară comunitate pentru întrebări și răspunsuri legate de limbaje de programare',
    'Reddit (ex: r/ProgrammingLanguages, r/learnprogramming) - Discuții, tutoriale și resurse comunitare',
    'GitHub Discussions - Spațiu colaborativ pentru proiecte open-source, inclusiv limbaje și compilatoare',
    'Lambda the Ultimate - Forum academic și tehnic axat pe teoria limbajelor de programare',
    'Hacker News - Noutăți și discuții legate de dezvoltarea de limbaje și tehnologii noi'
  ],
  'Dimensiune locală și globală': [
    'Cosmin Bonchiș - Cercetări în limbaje de programare, sisteme de tipuri, compilatoare și traducere între limbaje',
    'Centre de excelență: MIT (CSAIL), Stanford, University of Cambridge',
    'Proiecte internaționale: LLVM Project, Racket, Haskell Platform, WebAssembly',
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
              ? ['Limbajele de programare reprezintă o ramură fundamentală a informaticii care se ocupă cu studiul, proiectarea, implementarea și analiza limbajelor utilizate pentru a instrui calculatoarele. Ele formează puntea între conceptele teoretice și aplicațiile practice, permițând exprimarea clară, concisă și sigură a algoritmilor. Studiul limbajelor de programare contribuie esențial la scrierea de cod eficient, portabil, scalabil și ușor de întreținut.']
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
