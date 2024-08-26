import { ElementType } from 'react';

import { getTextStyle } from '@/shared/ui/text/text.style';
import { color, fontWeight, typography } from '@/shared/config/styles';

import type { CSSObject } from '@emotion/react';
import type { PolymorpicProps } from '@/shared/ui/util.type';

export interface ITextProps {
  /** 텍스트 메세지 */
  label: string;
  /** typograhy 종류 (ex. lg, md, sm, xs) */
  type?: keyof typeof typography;
  /** 텍스트 굵기 (ex. bold, semibold, regular ... ) */
  fontWeightType?: keyof typeof fontWeight;
  /** 텍스트 색상 */
  textColor?: (typeof color)[keyof typeof color];
  /** 그 외 커스텀 설정 */
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
