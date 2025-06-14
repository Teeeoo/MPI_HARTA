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
import MobiusStrip3D from '@/components/MobiusStrip3D';

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
    'Teorie: Analiză și stocare de date, algoritmi, simulări virtuale, machine learning',
    'Experiment: Metodele experimentale implică rularea de simulări pentru a testa ipoteze sau a observa comportamentul unor sisteme complexe',
    'Design: Proiectarea de modele matematice și computaționale care descriu fenomene reale',
  ],
  'Relații cu alte subdomenii': [
    'Arhitectura Calculatoarelor: Nevoia de componente performante pentru calcule, analiza și stocarea de date masive și proiectarea de simulări 3D.',
    'Algoritmi și Structuri de Date: Eficiența algoritmilor folosiți în analiza datelor, proiectarea simulărilor etc.',
    'Inteligență Artificială și Machine Learning: Utilizarea AI pentru dezvoltarea modelelor predictive, analizarea de seturi mari de date și optimizarea algoritmilor.',
    'Baze de Date: Gestionarea și stocarea datelor generate de simulări',
    'Grafică pe Calculator: Simulări vizuale pentru experimente',
    'Bioinformatică: Analiza genomică, plierea proteinelor, descoperirea de medicamente',
  ],
  'Probleme importante și deschise': [
    'Scalabilitatea algoritmilor pentru calcul de înaltă performanță (HPC)',
    'Incertitudinea și validarea modelelor computaționale',
    'Simularea cuantică a sistemelor moleculare',
    'Reprezentarea și simularea materialelor topologice exotice',
  ],
  'Persoane importante': [
    'John von Neumann: Matematician și informatician, contribuții fundamentale la arhitectura calculatoarelor și la dezvoltarea primelor simulări numerice',
    'Alan Turing: Matematician și logician, cunoscut pentru contribuțiile în informatica teoretică și inteligența artificială',
  ],
  'Forumuri importante': [
    'SIAM Journal on Scientific Computing (https://epubs.siam.org/journal/sisc)',
    'Journal of Computational Physics (https://www.sciencedirect.com/journal/journal-of-computational-physics)',
    'The International Conference for High Performance Computing (https://sc25.supercomputing.org/)',
    ' SIAM Conference on Computational Science and Engineering (https://www.siam.org/conferences/cm/cse-2025)',
  ],
  'Dimensiune locală și globală': [
    'Cosmin Bonchiș - Information theory, Membrane computing, Parallel and distributed computing',
    'Daniela Zaharie - Evolutionary computing, Machine learning, Data mining',
    'MOISE - Modernizarea infrastructurii de calcul și stocare a Centrului de Cercetare în Informatică al UVT',
    'Swiss National Supercomputing Centre (CSCS) - https://www.cscs.ch/',
    'PRACE (Partnership for Advanced Computing in Europe) - https://prace-ri.eu/',
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
  const subject = params?.subject ? decodeURIComponent(params.subject as string) : 'Știința Computațională';

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

      <MobiusStrip3D /> {/* ✅ inlocuit aici */}

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
              ? ['Știința computațională reprezintă o ramură a informaticii ce folosește calculatoarele și algoritmii pentru a rezolva probleme complexe din diverse domenii precum fizica, biologia, medicina, economia și ingineria, interpretate sub formă de ecuații matematice și simulări pe calculator.']
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
