import { borderRadius, color } from '@/shared/config/styles';

import type { CSSObject } from '@emotion/react';

export const getOutlineFieldStyle = (): CSSObject => {
  return {
    padding: '8px',
    color: color.gray,
    '&::placeholder': {
      color: color.gray300,
    },
    border: `4px solid ${color.gray}`,
    borderRadius: borderRadius.small,
    '&:focus:invalid': {
      border: `4px solid ${color.red}`,
    },
    '&:focus:valid': {
      border: `4px solid ${color.green}`,
    },
  };
};

export const getFlushedFieldStyle = (): CSSObject => {
  return {
    padding: '8px',
    color: color.gray,
    '&::placeholder': {
      color: color.gray300,
    },
    borderBottom: `4px solid ${color.gray}`,
    '&:focus:invalid': {
      borderBottom: `4px solid ${color.red}`,
    },
    '&:focus:valid': {
      borderBottom: `4px solid ${color.green}`,
    },
  };
};

export const getCheckBoxStyle = (): CSSObject => {
  return {
    position: 'relative',
    cursor: 'pointer',
    appearance: 'none',
    width: '18px',
    height: '18px',
    border: `2px solid ${color.gray}`,
    borderRadius: '4px',
    backgroundColor: color.white,
    boxShadow: '4px 4px 4px rgba(0 0 0 / 25%)',
    '&:checked::before': {
      content: `url('data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M11.6795%200.993386L10.9024%200.257101C10.5193-0.105319%2010.2967-0.101122%209.96874%200.375746L4.32044%208.58132L1.69186%206.01042C1.32922%205.65182%201.10237%205.67089%200.804223%206.10961L0.20436%207.02901C-0.0999462%207.47994-0.0610573%207.73592%200.298666%208.08957L4.04497%2011.7374C4.43062%2012.1189%204.64775%2012.0796%204.9459%2011.6527L11.7771%202.09209C12.0979%201.63811%2012.0785%201.36687%2011.6795%200.993386Z%22%20fill%3D%22%2303C75A%22%2F%3E%3C%2Fsvg%3E')`,
      position: 'absolute',
      color: `${color.green}`,
      width: '12px',
      height: '12px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  };
};
