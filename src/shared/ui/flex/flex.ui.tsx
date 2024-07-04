import { ElementType } from 'react';
import { css } from '@emotion/react';

import { getFlexStyle } from '@/shared/ui/flex/flex.style';

import type { PolymorpicProps } from '@/shared/ui/util.type';
import type { CSSObject } from '@emotion/react';

export interface IFlexProps {
  direction?: CSSObject['flexDirection'];
  justify?: CSSObject['justifyContent'];
  align?: CSSObject['alignItems'];
  gap?: CSSObject['gap'];
  etcStyles?: CSSObject;
}

function Flex<T extends ElementType = 'div'>({
  as,
  direction = 'row',
  justify = 'start',
  align = 'auto',
  gap = '0px',
  etcStyles = {},
  children,
  ...attribute
}: PolymorpicProps<T, IFlexProps>) {
  const Element = as || 'div';

  return (
    <Element
      css={css(
        getFlexStyle({
          direction,
          justify,
          align,
          gap,
          etcStyles,
        }),
      )}
      {...attribute}
    >
      {children}
    </Element>
  );
}

export default Flex;
