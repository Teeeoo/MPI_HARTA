// SubjectPage.tsx (IOR page)
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
import { Canvas } from '@react-three/fiber';
import OrganizationalModel from '@/components/OrganizationalModel';

const headings = [
  'Activitati principale',
  'Relatii cu alte subdomenii',
  'Probleme importante si deschise',
  'Persoane importante',
  'Forumuri importante',
  'Dimensiune locala si globala',
];

const contentMap: Record<string, string[]> = {
  'Activitati principale': [
    'Teorie: Studiază modul de organizare, funcționare și informatizare a proceselor organizaționale. Include arhitecturi informaționale, fluxuri de date, ERP, BPM, analiza proceselor',
    'Experiment: Se utilizează modelarea proceselor organizaționale, simulări informatice, studii de caz, testarea sistemelor ERP, evaluarea performanței IT la nivel organizațional.',
    'Design: Se proiectează soluții informatice (ERP,CRM, BI), arhitecturi de sistem, fluxuri de lucru automatizate și politici de guvernanță IT.',
  ],
  'Relatii cu alte subdomenii': [
    'Ingineria software - Aplicații comune - Se implementează soluții software specifice organizațiilor (ERP, CRM etc).',
    'Inteligența artificială - Influență - AI este folosită pentru automatizarea deciziilor organizaționale (ex: roboți RPA, analiza predictivă).',
    'Securitate cibernetică - Dependență - Protejarea datelor și infrastructurii este critică pentru funcționarea organizațională modernă.',
  ],
  'Probleme importante si deschise': [
    'Integrarea sistemelor: Dificultăți tehnice și de compatibilitate între sisteme ERP/CRM diferite.',
    'Adoptarea soluțiilor IT: Rezistență organizațională, lipsa competențelor digitale',
    'Securitate și confidențialitate: Acces neautorizat la date sensibile, lipsa auditului IT.',
    'Optimizarea fluxurilor prin AI: Complexitatea ridicată a proceselor face dificilă automatizarea completă.',
    'Guvernanța IT în organizații hibride: Dificultăți de adaptare a politicilor între cloud, onpremise și telemuncă.',
    'Etica și transparența deciziilor IT: Cum garantăm decizii corecte în sisteme automatizate?',
  ],
  'Persoane importante': [
    'Thomas H. Davenport - Babson College (SUA) - Pionier în analiza afacerilor, automatizare, ERP.',
    'August-Wilhelm Scheer - IDS Scheer AG (Germania) - Creatorul ARIS, modelare a proceselor organizaționale.',
  ],
  'Forumuri importante': [
    'Journal of Organizational Computing and Electronic Commerce - https://www.tandfonline.com/loi/hoce20',
    'Information Systems Journal - https://onlinelibrary.wiley.com/journal/13652575 ',
  ],
  'Dimensiune locala si globala': [
    'Cercetători activi: Conf. dr. Radu Vasiu, Conf. dr. Silviu Vert (cercetări în e-guvernare, digitalizare instituțională)',
    'Proiecte: e-Society (transformare digitală în administrație), SmartGov (servicii publice inteligente)',
    'Centre de excelență: MIT (Center for Information Systems Research), Fraunhofer IESE (Germania)',
    'Proiecte internaționale: DIGITbrain (cloud computing în industrie), InteropEHRate (schimb de date organizaționale în e-sănătate)',
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
  const subject = params?.subject ? decodeURIComponent(params.subject as string) : 'Informatica Organizațională';

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
  style={{
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 0,
    pointerEvents: 'auto',
  }}
>
  <OrganizationalModel />
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
              ? ['Informatica organizațională este un domeniu interdisciplinar care studiază modul în care tehnologia informației este utilizată pentru a sprijini, automatiza și îmbunătăți procesele din cadrul organizațiilor. Ea integrează concepte din informatică, științele economice și management, având ca scop crearea și implementarea de sisteme informatice eficiente (precum ERP, CRM, BI) care optimizează activitatea internă, comunicarea, luarea deciziilor și relația cu clienții sau partenerii. Informatica organizațională contribuie semnificativ la transformarea digitală, fiind esențială în adaptarea organizațiilor la mediul competitiv și la schimbările rapide ale pieței.']
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
              Inchide
            </button>
          </div>
        </SideDropdown>
      )}
    </MainContainer>
  );
}
