import styled, { keyframes } from 'styled-components';

const twinkle = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
`;
const rotateOrbit = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
export const RotatingLabelsWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  animation: ${rotateOrbit} 60s linear infinite;
`;
export const StarsBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
`;

export const Star = styled.div<{
  x: number;
  y: number;
  size: number;
  delay: number;
}>`
  position: absolute;
  top: ${(props) => props.y}%;
  left: ${(props) => props.x}%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: white;
  border-radius: 50%;
  opacity: 0.2;
  animation: ${twinkle} 3s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
  filter: drop-shadow(0 0 2px #ffffff);
`;


export const AnimatedBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: transparent;

  &::before, &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(#ffffff 1px, transparent 1px);
    background-size: 40px 40px;
    animation: ${twinkle} 4s ease-in-out infinite;
    opacity: 0.2;
  }

  &::after {
    background-size: 60px 60px;
    animation-delay: 2s;
    opacity: 0.15;
  }
`;

export const MainContainer = styled.main`
  position: relative; 
  height: 100vh;
  background: linear-gradient(145deg, #1a1a2e, #12121c);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;


export const Label = styled.div.attrs<{ x: number; y: number }>(props => ({
  style: {
    transform: `translate(${props.x}px, ${props.y}px)`,
  },
}))`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #f4eaff;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 10px;
  border-radius: 12px;
  backdrop-filter: blur(4px);
  user-select: none;
  white-space: nowrap;

  & > svg {
    font-size: 30px;
  }

  &:hover {
    background: rgba(207, 169, 249, 0.15);
    transform: scale(1.05);
  }
`;


