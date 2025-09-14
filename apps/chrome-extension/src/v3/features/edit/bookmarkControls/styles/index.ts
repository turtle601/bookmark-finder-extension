import { CSSObject } from '@emotion/react';

export const getActionButtonStyle = (): CSSObject => {
  return {
    minWidth: '88px',
    flex: '1',
    height: '32px',
    border: '1px solid #dadce0',
    padding: '4px 8px',
    borderRadius: '6px',
    background: 'white',
    color: '#3c4043',
    fontSize: '10px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    '&:hover': {
      background: '#f8f9fa',
      borderColor: '#c1c7cd',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    '&:active': {
      background: '#f1f3f4',
    },
  };
};
