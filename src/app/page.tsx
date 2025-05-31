'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import {
  MainContainer,
  Label,
  Star,
  StarsBackground,
} from '../components/styled';

import {
  FaCode,
  FaNetworkWired,
  FaTools,
  FaPaintBrush,
} from 'react-icons/fa';
import { VscGraph, VscDatabase } from 'react-icons/vsc';
import {
  HiOutlineTemplate,
  HiOutlineOfficeBuilding,
} from 'react-icons/hi';
import { GiArtificialIntelligence, GiDna1 } from 'react-icons/gi';
import { MdTouchApp } from 'react-icons/md';
import { TbMathFunction } from 'react-icons/tb';

const Globe = dynamic(() => import('../components/Globe'), { ssr: false });

const AuthorsButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #1e1e1e;
  color: white;
  border: 1px solid #888;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  z-index: 1000;
  transition: background 0.3s;

  &:hover {
    background-color: #333;
  }
`;

type StarData = {
  x: number;
  y: number;
  size: number;
  delay: number;
};

const domeniiInformatica = [
  { nume: 'Algoritmi și structuri de date', icon: <VscGraph /> },
  { nume: 'Limbaje de programare', icon: <FaCode /> },
  { nume: 'Arhitectură', icon: <HiOutlineTemplate /> },
  { nume: 'Sisteme de operare și rețele', icon: <FaNetworkWired /> },
  { nume: 'Inginerie software', icon: <FaTools /> },
  { nume: 'Baze de date și regăsire de informații', icon: <VscDatabase /> },
  { nume: 'AI și robotică', icon: <GiArtificialIntelligence /> },
  { nume: 'Grafică', icon: <FaPaintBrush /> },
  { nume: 'Interacțiune om-computer', icon: <MdTouchApp /> },
  { nume: 'Știința computațională', icon: <TbMathFunction /> },
  { nume: 'Informatica organizațională', icon: <HiOutlineOfficeBuilding /> },
  { nume: 'Bioinformatică', icon: <GiDna1 /> },
];

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [stars, setStars] = useState<StarData[]>([]);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const generateStars = (count: number): StarData[] =>
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
      }));
    setStars(generateStars(120));

    const screenWidth = window.innerWidth;
    const radius = screenWidth < 1200 ? 420 : 340; // etichetele mai departe de glob
    const newPositions = domeniiInformatica.map((_, index) => {
      const angle = (index / domeniiInformatica.length) * 2 * Math.PI;
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
      };
    });
    setPositions(newPositions);
  }, [isClient]);

  if (!isClient) return null;

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

      <Globe />

      <Label
        x={0}
        y={0}
        id="central-title"
        style={{ fontSize: '1.6rem', fontWeight: 'bold', zIndex: 2 }}
      >
        Harta Informaticii
      </Label>

      <AuthorsButton onClick={() => router.push('/AUTORI')}>
        Autori
      </AuthorsButton>

      {positions.map((pos, index) => (
        <Label
          key={domeniiInformatica[index].nume}
          x={pos.x}
          y={pos.y}
          style={{
            fontSize: '0.75rem',
            gap: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => {
            const subject = domeniiInformatica[index].nume;
            const routes: Record<string, string> = {
              'Algoritmi și structuri de date': '/ASD',
              'Limbaje de programare': '/LIMBAJE',
              'Arhitectură': '/ARH',
              'Sisteme de operare și rețele': '/SO',
              'Inginerie software': '/IS',
              'Baze de date și regăsire de informații': '/BAZEDATE',
              'AI și robotică': '/AI',
              'Grafică': '/GRAFICA',
              'Interacțiune om-computer': '/IOC',
              'Știința computațională': '/SC',
              'Informatica organizațională': '/IOR',
              'Bioinformatică': '/BIO',
            };
            router.push(routes[subject] || `/subject/${encodeURIComponent(subject)}`);
          }}
        >
          <span style={{ fontSize: '1rem' }}>{domeniiInformatica[index].icon}</span>
          {domeniiInformatica[index].nume}
        </Label>
      ))}
    </MainContainer>
  );
}
