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
import BinaryTree3D from '@/components/TreeNode';

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
    'Teorie: Algoritmii și structurile de date sunt fundamente ale informaticii, studiate pentru eficiență, corectitudine și organizarea datelor.',
    'Experiment: Algoritmii sunt testați pe date diverse pentru a evalua performanța în practică, folosind limbaje ca Python, C++ sau Java.',
    'Design: Proiectarea implică alegerea strategiilor și structurilor potrivite pentru probleme precum sortarea, căutarea sau procesarea grafurilor.',
  ],
  'Relații cu alte subdomenii': [
    'Inteligență Artificială – aplicabilitate comună: Algoritmii sunt esențiali în AI pentru antrenarea modelelor, optimizare sau căutare.',
    'Securitate cibernetică – dependentă: Criptografia se bazează pe algoritmi și structuri eficiente (ex: arbori Merkle, tabele hash).',
    'Programare – influență directă: Structurile de date și algoritmii influențează direct performanța aplicațiilor software.',
  ],
  'Probleme importante și deschise': [
    'Sortarea eficientă: Problema centrală în informatică. Deși există algoritmi optimi, alegerea corectă în funcție de context este esențială.',
    'Algoritmi pe grafuri: Probleme precum cel mai scurt drum sau fluxul maxim au aplicații majore în rețele și optimizări.',
    'Algoritmi sub-liniari: Se dezvoltă algoritmi care nu parcurg toate datele, utili în streaming, dar cu limitări de acuratețe.',
    'Algoritmi cuantici: Promițători, dar greu de implementat larg din cauza limitărilor tehnice actuale.',
  ],
  'Persoane importante': [
    'Donald Knuth: Stanford University – autorul seriei The Art of Computer Programming. https://www-cs-faculty.stanford.edu/~knuth/ ',
    'Robert Tarjan: Princeton University – cunoscut pentru algoritmi eficienți pentru grafuri. https://www.cs.princeton.edu/~ret/ ',
  ],
  'Forumuri importante': [
    'Journal of Algorithms: https://www.sciencedirect.com/journal/journal-of-algorithms',
    'ACM Transactions on Algorithms (TALG): https://dl.acm.org/journal/talg',
    'STOC (Symposium on Theory of Computing): https://acm-stoc.org/stoc2025/',
    'ICALP (International Colloquium on Automata, Languages, and Programming): https://conferences.au.dk/icalp2025',
  ],
  'Dimensiune locală și globală': [
    'Lector. Dr. Adrian Spătaru - Proiect CoCo: "Adaptivity in the Cloud to Edge Continuum" -Angajat in cadrul proiectului "Dinamica norilor pe sisteme cloud pentru predicția generării energie fotovoltaice". In cadrul acestui proiect am contribuit la inbunatatirea performanței unor algoritmi de predicție a dinamicii norilor prin paralelizarea algoritmilor folosind placi grafice. Algoritmii sunt impachetati in imagini Container, care sunt executate folosind infrastructura Cloud.',
    'Conf. Dr. Cosmin Bonchiș - Theoretical computer science research: Information Theory, Optimisation Algorithms, Membrane computing',
    'Centre de excelență: MIT (CSAIL), ETH Zürich (Institute of Theoretical Computer Science).',
    'Proiecte internaționale: COST Action „Algorithms and Complexity” – colaborări în cercetarea algoritmilor eficienți.',
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
  const subject = params?.subject ? decodeURIComponent(params.subject as string) : 'Algoritmi și Structuri de Date';

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

      <BinaryTree3D />

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
              ? ['Algoritmi și structuri de date este un domeniu esențial în informatică care studiază metode eficiente de rezolvare a problemelor (algoritmi) și moduri optimizate de organizare a datelor (structuri de date). Scopul este de a realiza operații rapide (căutare, sortare, modificare) cu consum minim de resurse (timp, memorie). Exemple cheie: quicksort, arbori binari, grafuri și tabele hash.']
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
