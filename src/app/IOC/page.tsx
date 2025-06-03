'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { MainContainer, Star, StarsBackground } from '@/components/styled';
import IconsBackground from '@/components/Dot';
import { Canvas } from '@react-three/fiber';
import Cursor3D from '@/components/Cursor3D';

type StarData = {
  x: number;
  y: number;
  size: number;
  delay: number;
};

const centerHeading = 'Interacțiune om-computer';

const headings = [
  'Activități principale',
  'Relații cu alte subdomenii',
  'Probleme importante și deschise',
  'Persoane importante',
  'Forumuri importante',
  'Dimensiune locală și globală',
];

const contentMap: Record<string, string[]> = {
  [centerHeading]: [
    'Interacțiunea om–computer (HCI) este un domeniu care analizează modul în care oamenii interacționează cu tehnologia. Scopul său este de a îmbunătăți utilizarea sistemelor digitale prin interfețe intuitive, accesibile și adaptate nevoilor reale ale utilizatorilor.',
  ],
  'Activități principale': ['Teorie: Interacțiunea om–computer (HCI) studiază modul în care utilizatorii folosesc sistemele informatice, punând accent pe ușurința utilizării, adaptarea pentru confortul utilizatorului, felul în care aceștia înțeleg și interpretează informațiile, precum și pe designul orientat spre nevoile utilizatorului.',
    'Experiment: Testele de utilizabilitate și experimentele UX (User Experience) implică metode precum eye-tracking, interviuri, A/B testing sau simulări de interacțiune. Se folosesc prototipuri interactive dezvoltate în medii precum Figma, Unity sau aplicații web.',
    'Design: Se dezvoltă interfețe grafice, sisteme conversaționale (chatboți), aplicații mobile și tehnologii moderne (VR/AR) prin metode iterative, implicând feedbackul continuu al utilizatorilor.',

  ],
  
  'Relații cu alte subdomenii': [
    'Inteligență Artificială - colaborare activă: Chatboții, asistenții vocali (ex. Siri, Alexa) și sistemele de recomandare se bazează pe HCI pentru a oferi interfețe intuitive.',
    'Psihologie cognitivă - interdependență: Înțelegerea proceselor mentale este esențială pentru a proiecta interfețe adaptate capacităților și limitărilor umane.',
    'Dezvoltare software - influență practică: O aplicație bine proiectată din punct de vedere HCI îmbunătățește experiența utilizatorului, eficiența și accesibilitatea.',
  ],
  'Probleme importante și deschise': [
    'Accesibilitatea digitală: Proiectarea aplicațiilor pentru persoane cu dizabilități este esențială într-o societate incluzivă.',
    'Ergonomia interfețelor: Maximizarea eficienței și reducerea erorilor în interacțiunea cu sistemele digitale.',
    'Interacțiunea în realitate augmentată și virtuală: Crearea unor modele naturale de interacțiune pentru medii 3D este un domeniu activ de cercetare.',
    'Etica și impactul tehnologiei: Cum influențează interacțiunea om-computer comportamentele și sănătatea mintală?',
  ],
  'Persoane importante': [
    'Ben Shneiderman - University of Maryland - pionier în HCI, creatorul modelului direct manipulation https://www.cs.umd.edu/people/ben',
    'Don Norman - fost director al Apple Research - autorul cărții The Design of Everyday Things https://jnd.org',
  ],
  'Forumuri importante': [
    'Human-Computer Interaction - https://www.tandfonline.com/journals/hhci20',
    'ACM Transactions on Computer-Human Interaction (TOCHI) - https://tochi.acm.org',
    'CHI (Conference on Human Factors in Computing Systems) - https://chi2025.acm.org',
    'UIST (User Interface Software and Technology) - https://uist.acm.org'
  ],
  'Dimensiune locală și globală': [
    'Lect. Dr. Liviu Octavian Mafteiu-Scai - Coordonează echipe de studenți în cadrul Concursului de Informatică Ștefan Mărușter și participă la dezvoltarea de aplicații interactive. Este implicat în cercetări privind algoritmi metaeuristici și optimizarea interfețelor utilizator.',
    'Lect. Dr. Cosmin Bonchiș - Specializat în grafică și interfețe utilizator, contribuie la proiecte interdisciplinare axate pe interacțiunea om-calculator și educație asistată digital. A fost implicat în dezvoltarea unui simulator web pentru sisteme P.',
    'MIT Media Lab - cercetare de vârf în interfețe inovatoare și experiențe interactive.',
    'Carnegie Mellon University - HCI Institute - unul dintre cele mai prestigioase centre de cercetare din lume.',
    'Horizon Europe: Augmented Reality for Smart Education.',
    'W3C - Web Accessibility Initiative (WAI): standarde globale pentru accesibilitate.'

  ],
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
  z-index: 2;
`;

const HeadingContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 10px 14px;
  color: white;
  text-align: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 8px #62d0ff;
  }
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

const CursorCanvas = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

export default function BioinformaticsPage() {
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
      {/* Fundal stele + animatii: pointer-events dezactivat */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <StarsBackground>
          {stars.map((star, i) => (
            <Star key={i} x={star.x} y={star.y} size={star.size} delay={star.delay} />
          ))}
        </StarsBackground>
        <IconsBackground />
        <CursorCanvas>
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={1} />
            <Cursor3D />
          </Canvas>
        </CursorCanvas>
      </div>

      {/* Titlu central */}
      <HeadingWrapper
        data-faded={activeIndex !== null ? 'true' : undefined}
        style={{ left: '50%', top: '50%' }}
      >
        <HeadingContent
          onClick={() => setActiveIndex(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
        >
          {centerHeading}
        </HeadingContent>
      </HeadingWrapper>

      {/* Headinguri externe */}
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

      {/* Dropdown */}
      {activeIndex !== null && (
        <SideDropdown
          key={activeIndex}
          side={
            activeIndex === -1 ? 'right' : getDropdownSide(positions[activeIndex]?.x || 0)
          }
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
            {activeIndex === -1 ? centerHeading : headings[activeIndex]}
          </h3>
          <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
            {(activeIndex === -1
              ? contentMap[centerHeading]
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
