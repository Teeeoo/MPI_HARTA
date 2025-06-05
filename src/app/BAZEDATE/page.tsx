'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';

import {
  MainContainer,
  Label,
  Star,
  StarsBackground,
} from '@/components/styled';

const DatabaseModel = dynamic(() => import('@/components/DataBaseModel'), { ssr: false });

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
    'Teorie: Modele de date (relațional, orientat pe obiect, documente), algebră relațională, limbaje formale de interogare (SQL, Datalog), complexitatea interogărilor, modele informaționale.',
    'Experiment: Optimizarea interogărilor, evaluarea performanței sistemelor de baze de date (ex: costul planurilor de execuție), testarea sistemelor de regăsire a informației.',
    'Design: Proiectarea schemelor de baze de date, normalizarea, sisteme de indexare, sisteme distribuite de baze de date, sisteme de regăsire a informației și motoare de căutare.',
  ],
  'Relații cu alte subdomenii': [
    'Inginerie software: Baze de date ca infrastructură pentru aplicații software complexe.',
    'Sisteme distribuite: Baze de date distribuite, replicare și consistență.',
    'Inteligență Artificială: Regăsirea semantică, integrarea cu ontologii și machine learning pentru clasificare/recomandare.',
    'Securitate informatică: Protecția datelor, controlul accesului, confidențialitate.',
    'Teoria informației: Codare, compresie și relevanță informațională.'
  ],
  'Probleme importante și deschise': [
    'Stocarea și interogarea eficientă a volumelor mari de date (Big Data)',
    'Optimizarea automată a interogărilor și execuției',
    'Garanții de consistență și disponibilitate în sisteme distribuite',
    'Regăsire semantică: Cum înțelege o mașină sensul unei întrebări și oferă răspunsuri relevante?',
    'Baze de date autonome: Sisteme care se configurează, repară și optimizează singure.',
    'Interogare peste date eterogene: Cum interogăm în mod unificat date din surse diferite (SQL, NoSQL, XML, RDF)?',
    'Confidențialitate cuplat cu utilitate: Cum păstrăm confidențialitatea fără a compromite valoarea datelor?'
  ],
  'Persoane importante': [
    'Jim Gray - Laureat Turing, contribuții fundamentale în baze de date tranzacționale.',
    'Jeffrey Ullman - Teoretician influent în modele de date și algebră relațională.',
    'Serge Abiteboul - Regăsire de informații, web semantice și baze de date semi-structurate.'
  ],
  'Forumuri importante': [
    'ACM Transactions on Database Systems (TODS)',
    'Information Retrieval Journal',
    'ACM SIGMOD Conference',
    'VLDB (Very Large Data Bases)',
    'ACM SIGIR (pentru regăsire de informații)'
  ],
  'Dimensiune locală și globală': [
    'Domeniul este profund conectat cu bioinformatica (baze de date genomice), lingvistica computațională (regăsirea semantică) și științele sociale (analiza rețelelor sociale prin baze de date graf).',
    'StudentWeb - Platforma principală a UVT pentru gestionarea informațiilor academice și financiare ale studenților. Accesează o bază de date instituțională centralizată pentru afișarea situației școlare, a contractelor de studii și a datelor personale.',
    'eLearning UVT (Moodle) - Sistemul de management al învățării utilizat de cadrele didactice și studenți. Se bazează pe o bază de date relațională care stochează cursuri, activități, rezultate și interacțiuni educaționale.',
    'Stanford InfoLab (SUA) - renumit pentru cercetare în baze de date relaționale, baze de date graf și motoare de căutare. Gazdă a proiectului PageRank (baza Google).',
    'PostgreSQL, MongoDB, Neo4j - sisteme moderne de baze de date folosite atât în industrie cât și în cercetare, fiecare cu paradigme diferite (relațional, document, graf).',
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
  const subject = params?.subject ? decodeURIComponent(params.subject as string) : 'Baze de date';

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

      <Canvas
  style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto' }}
  camera={{ position: [0, 0, 10], fov: 45 }}
>
  <DatabaseModel />
</Canvas>


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
              top: `calc(50% + ${pos.y}px)`,
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
          <h3
            style={{
              marginBottom: '12px',
              fontWeight: '600',
              fontSize: '1.3rem',
              color: '#f9dc5c',
            }}
          >
            {activeIndex === -1 ? subject : headings[activeIndex]}
          </h3>
          <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
            {(activeIndex === -1
              ? ['Baze de date și regăsire de informații este un subdomeniu esențial al informaticii care se ocupă cu organizarea, stocarea, manipularea și regăsirea eficientă a datelor. Acest domeniu permite gestionarea volumelor mari de date în mod sigur, performant și scalabil, fiind indispensabil în contextul aplicațiilor moderne, sistemelor informatice și inteligenței artificiale. Acesta se încadrează în categoria „Information Management” conform clasificărilor ACM/IEEE și în „Data and Information Systems” conform articolului lui Peter Denning - Computer Science: the Discipline.']
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
                  borderLeft: '4px solid #94D1E1',
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
                cursor: 'pointer',
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
