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
import DeadlockModel from '@/components/DeadlockScene';
import { Canvas } from '@react-three/fiber';

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
    'Teorie: Fundamentele sistemelor de operare (gestionarea proceselor, memoriei, fișierelor, sistemelor de intrare/ieșire), modele de rețea (OSI, TCP/IP), protocoale (IP, TCP, UDP, HTTP).',
    'Experiment: Testarea comportamentului planificatorilor de procese, simularea comunicației în rețele (folosind instrumente precum Wireshark, GNS3, Mininet), analizarea performanței rețelelor.',
    'Design: Arhitectura sistemelor de operare (monolitic), configurarea firewall-urilor și a protocoalelor de rutare.',
  ],
  'Relații cu alte subdomenii': [
    'Securitate cibernetică: Protecția sistemelor de operare și a comunicațiilor de rețea împotriva atacurilor (buffer overflow, sniffing, spoofing).',
    'Cloud computing: Sisteme de operare distribuite și virtualizare în centre de date.',
    'Sisteme embedded: Sisteme de operare în timp real, comunicare prin rețele industriale.',
    'Inteligență Artificială: Optimizarea alocării resurselor și monitorizarea traficului în rețea prin AI.',
  ],
  'Probleme importante și deschise': [
    'Securitatea sistemelor de operare și rețelelor: Detecția și prevenirea atacurilor, gestionarea permisiunilor, izolare între procese.',
    'Scalabilitatea și fiabilitatea rețelelor: Răspunsul în timp real, disponibilitatea ridicată, balansarea traficului.',
    'Kerneluri reziliente: Cum putem construi sisteme de operare rezistente la atacuri zero-day sau coruperi de memorie?',
    'Rețele deterministe: Ce soluții pot asigura predictibilitate și latență minimă pentru aplicații critice (vehicule autonome, robotică)?',
  ],
  'Persoane importante': [
    'Ken Thompson și Dennis Ritchie: Creatori ai sistemului UNIX - piatră de temelie pentru majoritatea sistemelor moderne.',
    'Vinton Cerf: Considerat unul dintre „părinții Internetului”, co-creator al protocolului TCP/IP.',
  ],
  'Forumuri importante': [
    'IEEE Transactions on Network and Service Management https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=10206',
    'USENIX Symposium on Operating Systems Design and Implementation (OSDI) https://www.usenix.org/conference/osdi23',
    'IEEE INFOCOM https://infocom2024.ieee-infocom.org/',
  ],
  'Dimensiune locală și globală': [
    'Dr. Cristian Cira - Lector la FMI, cu preocupări în rețele descentralizate, guvernanță automatizată și tehnologia blockchain.',
    'Dr. Adrian Spătaru - Lector la FMI este specializat în calcul distribuit și paralel, cu accent pe tehnologia blockchain, cloud computing și machine learning.',
    'Centre de excelență: MIT CSAIL, Stanford Networking Lab, ETH Zurich.',
    'Proiecte internaționale: Horizon Europe - Rețele 6G, proiecte open-source pentru kerneluri sigure (ex: seL4).',
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
  const subject = params?.subject ? decodeURIComponent(params.subject as string) : 'Sisteme de Operare';

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

      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
  <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
    <DeadlockModel />
  </Canvas>
</div>

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
          <h3 style={{ marginBottom: '12px', fontWeight: '600', fontSize: '1.3rem',color: '#f9dc5c' }}>
            {activeIndex === -1 ? subject : headings[activeIndex]}
          </h3>
          <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
            {(activeIndex === -1
              ? ['Sisteme de operare și rețele este un subdomeniu esențial al informaticii care se ocupă cu studiul mecanismelor de control al resurselor hardware și al comunicației între calculatoare. Sisteme de operare moderne, precum Linux, Windows sau macOS, asigură o interfață între utilizator și hardware, gestionând procese, memorie, fișiere și dispozitive. Rețelele de calculatoare permit schimbul de date între dispozitive, fiind fundamentul comunicației globale (Internet, cloud computing, rețele locale etc.). Împreună, aceste două componente asigură funcționarea sistemelor informatice complexe și interconectate.']
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
