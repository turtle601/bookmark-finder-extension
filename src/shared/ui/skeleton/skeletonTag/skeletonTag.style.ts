import { borderRadius } from '@/shared/config/styles';
import { CSSObject, Keyframes, keyframes } from '@emotion/react';

const skeletonAnimation: Keyframes = keyframes`
  0% {
    background: linear-gradient(90deg, rgba(66, 66, 66, 0.8) 0%, rgba(168, 168, 168, 0.8) 100%);
  }

  10% {
    background: linear-gradient(90deg, rgba(66, 66, 66, 0.8) 20%, rgba(168, 168, 168, 0.8) 100%);
  }

  20% {
    background: linear-gradient(90deg, rgba(66, 66, 66, 0.8) 40%, rgba(168, 168, 168, 0.8) 100%);
  }

  30% {
    background: linear-gradient(90deg, rgba(66, 66, 66, 0.8) 60%, rgba(168, 168, 168, 0.8) 100%);
  }

  40% {
    background: linear-gradient(90deg, rgba(66, 66, 66, 0.8) 80%, rgba(168, 168, 168, 0.8) 100%);
  } 

  50% {
    background: linear-gradient(90deg, rgba(66, 66, 66, 0.8) 100%, rgba(168, 168, 168, 0.8) 100%);
  } 

  60% {
    background: linear-gradient(90deg, rgba(66, 66, 66, 0.8) 80%, rgba(168, 168, 168, 0.8) 100%);
  } 

  70% {
    background: linear-gradient(90deg, rgba(66, 66, 66, 0.8) 60%, rgba(168, 168, 168, 0.8) 100%);
  } 

  80% {
    background: linear-gradient(90deg, rgba(66, 66, 66, 0.8) 40%, rgba(168, 168, 168, 0.8) 100%);
  } 

  90% {
    background: linear-gradient(90deg, rgba(66, 66, 66, 0.8) 20%, rgba(168, 168, 168, 0.8) 100%);
  }  

  100% {
    background: linear-gradient(90deg, rgba(66, 66, 66, 0.8) 0%, rgba(168, 168, 168, 0.8) 100%);
  }   
`;

export const getSkeletonTagStyle = (): CSSObject => {
  return {
    display: 'inline-block',
    height: '32px',
    width: '64px',
    animation: `${skeletonAnimation} 1.2s ease-in-out infinite`,
    borderRadius: borderRadius.medium,
  };
};
