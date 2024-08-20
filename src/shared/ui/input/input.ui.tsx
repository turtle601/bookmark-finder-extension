import React, { forwardRef } from 'react';
import { css } from '@emotion/react';

import type { CSSObject } from '@emotion/react';

interface IInputProps extends React.ComponentPropsWithoutRef<'input'> {
  etcStyles?: CSSObject;
}

const InputComponent = (
  { etcStyles, ...attribute }: IInputProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  return (
    <input
      ref={ref}
      css={css({
        ...etcStyles,
      })}
      {...attribute}
    />
  );
};

export const Input: React.ForwardRefExoticComponent<
  IInputProps & React.RefAttributes<HTMLInputElement>
> = forwardRef(InputComponent);
