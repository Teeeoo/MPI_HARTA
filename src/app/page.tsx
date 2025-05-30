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
  bottom: 30px;
  right: 30px;
  background-color: #1e1e1e;
  color: white;
  border: 1px solid #888;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
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
  const [stars, setStars] = useState<StarData[]>([]);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const generateStars = (count: number): StarData[] =>
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
      }));
    setStars(generateStars(120));

    const radius = 410;
    const newPositions = domeniiInformatica.map((_, index) => {
      const angle = (index / domeniiInformatica.length) * 2 * Math.PI;
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
      };
    });
    setPositions(newPositions);
  }, []);

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
  style={{ fontSize: '1.8rem', fontWeight: 'bold', zIndex: 2 }}
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
          onClick={() => {
            const subject = domeniiInformatica[index].nume;
            if (subject === 'Algoritmi și structuri de date') {
              router.push('/ASD');
            } else if (subject === 'Limbaje de programare') {
              router.push('/LIMBAJE');
            } else if (subject === 'Arhitectură') {
              router.push('/ARH');
            } else if (subject === 'Sisteme de operare și rețele') {
              router.push('/SO');
            } else if (subject === 'Inginerie software') {
              router.push('/IS');
            } else if (subject === 'Baze de date și regăsire de informații') {
              router.push('/BAZEDATE');
            } else if (subject === 'AI și robotică') {
              router.push('/AI');
            } else if (subject === 'Grafică') {
              router.push('/GRAFICA');
            } else if (subject === 'Interacțiune om-computer') {
              router.push('/IOC');
            } else if (subject === 'Știința computațională') {
              router.push('/SC');
            } else if (subject === 'Informatica organizațională') {
              router.push('/IOR');
            } else if (subject === 'Bioinformatică') {
              router.push('/BIO');
            } else {
              router.push(`/subject/${encodeURIComponent(subject)}`);
            }
          }}
        >
          {domeniiInformatica[index].icon} {domeniiInformatica[index].nume}
        </Label>
      ))}
    </MainContainer>
  );
}
