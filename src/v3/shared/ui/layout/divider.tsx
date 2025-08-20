import { css } from '@emotion/react';

import { color } from '@/v3/shared/styles';

function Divider() {
  return (
    <div
      css={css({
        width: '100%',
        height: '2px',
        backgroundColor: color.slate['200'],
      })}
    ></div>
  );
}

export default Divider;
