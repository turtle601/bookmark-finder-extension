import { css } from '@emotion/react';

import { borderRadius, color } from '@/shared/config/styles';

export const getModalWrapperStyle = (zIndex: number) => {
  return css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: `${zIndex}`,
  });
};

export const getModalOverlayStyle = (zIndex: number) => {
  return css({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: `${zIndex + 10}`,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    opacity: 0.2,
  });
};

export const getModalContentStyle = (zIndex: number) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: `${zIndex + 100}`,
    width: '600px',
    height: '300px',
    padding: '2rem',
    background: color.white,
    borderRadius: borderRadius.small,
    border: `4px solid rgba(66, 66, 66, 0.002)`,
    boxShadow: `4px 4px 20px rgba(0, 0, 0, 0.8)`,
  });
