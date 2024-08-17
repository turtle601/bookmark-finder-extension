import React, { forwardRef } from 'react';
import { css } from '@emotion/react';

import { getRadioStyle } from './radio.style';

import type { CSSObject } from '@emotion/react';

interface IRadioProps extends React.ComponentPropsWithoutRef<'input'> {
  etcStyles?: CSSObject;
}

const RadioComponent = (
  { etcStyles = {}, ...attribute }: IRadioProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  return (
    <input
      ref={ref}
      type="radio"
      css={css({ ...getRadioStyle(), ...etcStyles })}
      {...attribute}
    />
  );
};

const Radio: React.ForwardRefExoticComponent<
  IRadioProps & React.RefAttributes<HTMLInputElement>
> = forwardRef(RadioComponent);

export default Radio;
