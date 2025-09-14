import { css } from '@emotion/react';

import { color } from '@/v3/shared/styles';

const RESIZER_URL =
  'https://school.programmers.co.kr/assets/img-grippie-horizon-2029be95ca34dfe8c756d091c6f53a6a007e3a66c7c68863ce6f54fe23d4f371.png' as const;

function Resizer() {
  return (
    <div
      css={css({
        width: '100%',
        height: '14px',
        backgroundColor: color.slate['200'],
        backgroundPositionY: 'bottom',
        background: `url(${RESIZER_URL}) no-repeat 50%`,
        backgroundSize: '2.25rem 0.875rem',
        cursor: 'ns-resize',
      })}
    />
  );
}

export default Resizer;
