'use client';
import { useEffect, useState } from 'react';
import {
  MainContainer,
  Star,
  StarsBackground,
} from '../../components/styled'; // asigura-te ca path-ul e corect

import styled from 'styled-components';

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(90deg, #62d0ff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
`;

const Professor = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 40px;
  color: #62d0ff;
  text-align: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const AuthorsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 40px;
  border-radius: 24px;
  max-width: 1100px;
  width: 100%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`;

const AuthorCard = styled.div`
  background-color: rgba(255, 255, 255, 0.07);
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  border: 1px solid rgba(98, 208, 255, 0.1);

  &:hover {
    transform: translateY(-6px) scale(1.03);
    background-color: rgba(98, 208, 255, 0.1);
    box-shadow: 0 0 10px #62d0ff;
  }
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 4px;
`;

const Domain = styled.div`
  font-size: 0.9rem;
  color: #d0d0d0;
`;

const studenti = [
  { nume: 'Stana Andrei', domeniu: 'Algoritmi și structuri de date' }, // 
  { nume: 'Tokos Jozsef Eduard', domeniu: 'Limbaje de programare' }, //
  { nume: 'Vasiliu Andrei', domeniu: 'Arhitectură' }, //
  { nume: 'Gramescu-Calin Catalin', domeniu: 'Sisteme de operare și rețele' }, //
  { nume: 'Hac Filip', domeniu: 'Inginerie software' }, //
  { nume: 'Todoran Paul', domeniu: 'Baze de date și regăsire de informații' },
  { nume: 'Vasiescu Adrian-Damian', domeniu: 'AI și robotică' },
  { nume: 'Ursu Mihai Sebastian', domeniu: 'Grafică' },
  { nume: 'Stepan Alexandru-Pavel', domeniu: 'Interacțiune om-computer' },
  { nume: 'Toma Mădălin-Constantin', domeniu: 'Știința computațională' },
  { nume: 'Zubatîi Flaviu', domeniu: 'Informatica organizațională' },
  { nume: 'Voica Tudor', domeniu: 'Bioinformatică' },
];

type StarData = {
  x: number;
  y: number;
  size: number;
  delay: number;
};

export default function AutoriPage() {
  const [stars, setStars] = useState<StarData[]>([]);

  useEffect(() => {
    const generateStars = (count: number): StarData[] =>
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
      }));
    setStars(generateStars(100));
  }, []);

  return (
    <MainContainer>
      <StarsBackground>
        {stars.map((star, i) => (
          <Star key={i} x={star.x} y={star.y} size={star.size} delay={star.delay} />
        ))}
      </StarsBackground>

      <ContentWrapper>
        <Title>Harta Informaticii</Title>
        <Professor>Profesor coordonator: Dr. Adrian Crăciun</Professor>

       <AuthorsContainer>
  {studenti
    .filter((s) => s.nume !== 'Teodorovits András-Károly')
    .map((student, index) => (
      <AuthorCard key={index}>
        <Name>{student.nume}</Name>
        <Domain>{student.domeniu}</Domain>
      </AuthorCard>
    ))}

  <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center' }}>
    <AuthorCard style={{ minWidth: '260px' }}>
      <Name>Teodorovits András-Károly</Name>
      <Domain>Team Leader & Web</Domain>
    </AuthorCard>
  </div>
</AuthorsContainer>

      </ContentWrapper>
    </MainContainer>
  );
}
