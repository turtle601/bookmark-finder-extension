import React from 'react';
import { css } from '@emotion/react';

import { getSpinnerStyle } from '@/shared/ui/spinner/spinner.style';

import type { CSSObject } from '@emotion/react';

interface ISpinnerProps {
  etcStyles?: CSSObject;
}

const Spinner: React.FC<ISpinnerProps> = ({ etcStyles = {} }) => {
  return <span css={css({ ...getSpinnerStyle(), ...etcStyles })}></span>;
};

export default Spinner;
