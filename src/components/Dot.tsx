'use client';

import styled from 'styled-components';

const Icon = styled.div<{ x: number; y: number }>`
  position: absolute;
  top: calc(50% + ${({ y }) => y}px);
  left: calc(50% + ${({ x }) => x}px);
  transform: translate(-50%, -50%);
  opacity: 0.35;
  z-index: 0;
  pointer-events: none;
`;

const Glow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 340px;
  height: 340px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, #62d0ff55 0%, transparent 80%);
  filter: blur(55px);
  z-index: 0;
  pointer-events: none;
`;

export default function IconsBackground() {
  return (
    <>
      <Glow />

      {/* Iconita logica {} */}
      <Icon x={0} y={-200}>
        <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
          <text
            x="32"
            y="42"
            textAnchor="middle"
            fontSize="36"
            fill="white"
            fontFamily="monospace"
          >
            {'{ }'}
          </text>
        </svg>
      </Icon>

      {/* Mouse */}
      <Icon x={-240} y={-140}>
        <svg width="48" height="64" viewBox="0 0 30 50" fill="none">
          <rect x="1" y="1" width="28" height="48" rx="14" stroke="white" strokeWidth="2" />
          <line x1="15" y1="1" x2="15" y2="15" stroke="white" strokeWidth="2" />
        </svg>
      </Icon>

      {/* Brain */}
      <Icon x={240} y={-140}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path
            d="M20 12c-8 4-8 16 0 20-8 4-8 16 0 20M44 12c8 4 8 16 0 20 8 4 8 16 0 20"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </Icon>

      {/* Hand */}
      <Icon x={-240} y={100}>
        <svg width="48" height="64" viewBox="0 0 64 64" fill="none">
          <path
            d="M20 40V20M28 42V12M36 40V18M44 44V26M20 40c0 10 24 10 24 0"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </Icon>

      {/* Mic */}
      <Icon x={240} y={100}>
        <svg width="40" height="56" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3v9m0 0a3 3 0 003-3V6a3 3 0 00-6 0v3a3 3 0 003 3zm6 0a6 6 0 01-12 0"
            stroke="white"
            strokeWidth="2"
          />
          <path d="M8 21h8M12 18v3" stroke="white" strokeWidth="2" />
        </svg>
      </Icon>

      {/* VR headset */}
      <Icon x={0} y={200}>
        <svg width="64" height="32" viewBox="0 0 64 32" fill="none">
          <rect x="4" y="8" width="56" height="16" rx="4" stroke="white" strokeWidth="2" />
          <circle cx="18" cy="16" r="4" stroke="white" strokeWidth="2" />
          <circle cx="46" cy="16" r="4" stroke="white" strokeWidth="2" />
        </svg>
      </Icon>
    </>
  );
}
