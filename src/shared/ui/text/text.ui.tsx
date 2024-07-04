import { ElementType } from 'react';

import { getTextStyle } from '@/shared/ui/text/text.style';
import { color, fontWeight, typography } from '@/shared/config/styles';

import type { CSSObject } from '@emotion/react';
import type { PolymorpicProps } from '@/shared/ui/util.type';

export interface ITextProps {
  label: string;
  type?: keyof typeof typography;
  fontWeightType?: keyof typeof fontWeight;
  textColor?: (typeof color)[keyof typeof color];
  etcStyles?: CSSObject;
}

function Text<T extends ElementType = 'span'>({
  as,
  type = 'md',
  textColor = color.gray,
  fontWeightType = 'regular',
  label,
  etcStyles,
  ...attribute
}: PolymorpicProps<T, ITextProps>) {
  const Element = as || 'span';

  return (
    <Element
      css={getTextStyle({
        type,
        textColor,
        fontWeightType,
        etcStyles,
      })}
      {...attribute}
    >
      {label}
    </Element>
  );
}

export default Text;
