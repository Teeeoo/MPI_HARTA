'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
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

  useEffect(() => {
    // Generare stele
    const generateStars = (count: number): StarData[] =>
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
      }));
    setStars(generateStars(120));

    // Calculare poziții label-uri
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
      {positions.map((pos, index) => (
        <Label
  key={domeniiInformatica[index].nume}
  x={pos.x}
  y={pos.y}
>
  {domeniiInformatica[index].icon} {domeniiInformatica[index].nume}
</Label>

      ))}
    </MainContainer>
  );
}
