import { css } from '@emotion/react';

import { color } from '@/v3/shared/styles';
import { ComponentPropsWithoutRef } from 'react';

interface IDividerProps extends ComponentPropsWithoutRef<'div'> {}

function Divider({ ...props }: IDividerProps) {
  return (
    <div
      css={css({
        width: '100%',
        height: '2px',
        backgroundColor: color.slate['200'],
      })}
      {...props}
    ></div>
  );
}

export default Divider;
