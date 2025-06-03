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
import Robot from '@/components/Robot';

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
    'Teorie: Fundamentele matematice și algoritmice ale învățării automate, rețelelor neuronale, planificării automate și percepției.',
    'Experiment: Validarea algoritmilor AI prin seturi de date reale și simulări (ex: recunoaștere facială, procesare limbaj natural).',
    'Design: Proiectarea roboților inteligenți cu senzori, actuatori, control autonom și integrarea AI în luarea deciziilor în timp real.',

  ],
  'Relații cu alte subdomenii': [
    'Informatică teoretică: Modele formale de raționament și învățare automată.  ',
    'Procesare imagini și semnale: Utilizate în percepția robotică.',
    'Internet of Things (IoT): Interconectarea roboților și sistemelor inteligente.',
    'Etică și securitate cibernetică: Asigurarea utilizării sigure și corecte a sistemelor AI autonome.',
  ],
  'Probleme importante și deschise': [
    'Controlul și explicabilitatea sistemelor AI autonome',
    'Integrarea sigură a roboților în medii sociale și industriale',
    'Generalizarea în învățarea automată (robustețea modelelor AI)',
    'Conștiința și înțelegerea în AI',
    'Roboți sociali empatici',
    'Reglementarea etică și juridică a utilizării AI și roboticii',
  ],
  'Persoane importante': [
    'Yoshua Bengio - Cercetător în deep learning, câștigător al Premiului Turing',
    'Rodney Brooks - Fondator al companiei iRobot, pionier în robotica comportamentală',
  ],
  'Forumuri importante': [
    'Artificial Intelligence Journal: https://www.journals.elsevier.com/artificial-intelligence',
    'Robotics and Autonomous Systems: https://www.journals.elsevier.com/robotics-and-autonomous-systems',
    'AAAI Conference on Artificial Intelligence: https://aaai.org',
    'ICRA - IEEE International Conference on Robotics and Automation: https://www.ieee-ras.org/conferences-workshops/fully-sponsored/icra',
  ],
  'Dimensiune locală și globală': [
    'Prof. Dr. Cosmin Bonchiș - Robotică autonomă, Sisteme embedded și IoT, Inteligență artificială distribuită',
    'Dr. Horia Popa -  Sisteme embedded pentru roboți',
    'Prof. Dr. Daniela Zaharie - Învățare optimizată (Machine learning), Neural Network',
    'Centre de excelență: MIT CSAIL, Stanford AI Lab, ETH Zurich AI Center',
    'Proiecte internaționale: „Human-Centered AI”, „Robotics for Elderly Care”'
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
  const subject = params?.subject ? decodeURIComponent(params.subject as string) : 'AI și Robotică';

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

      <Robot />

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
              ? ['Inteligența artificială (AI) și robotica reprezintă două ramuri esențiale ale informaticii moderne, având un impact major asupra industriei, cercetării și societății. AI se ocupă cu dezvoltarea de algoritmi și sisteme care pot simula inteligența umană, iar robotica integrează AI pentru a crea sisteme autonome capabile să interacționeze cu mediul fizic. Împreună, aceste domenii permit automatizarea sarcinilor complexe, creșterea eficienței și dezvoltarea de soluții inteligente în diverse domenii.']
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
