import React from 'react';

import { ElementType, forwardRef } from 'react';
import { css } from '@emotion/react';

import type { PolymorpicProps } from '@/v3/shared/ui/utils/type';
import type { CSSObject } from '@emotion/react';

export interface IFlexProps {
  direction?: CSSObject['flexDirection'];
  justify?: CSSObject['justifyContent'];
  align?: CSSObject['alignItems'];
  gap?: CSSObject['gap'];
  etcStyles?: CSSObject;
}

// eslint-disable-next-line @rushstack/typedef-var
const Flex = forwardRef(function FlexComponent<T extends ElementType = 'div'>(
  {
    as,
    direction = 'row',
    justify = 'start',
    align = 'auto',
    gap = '0px',
    etcStyles = {},
    children,
    ...attribute
  }: PolymorpicProps<T, IFlexProps>,
  ref: React.Ref<React.ComponentPropsWithRef<T>['ref']>,
) {
  const Element = as || 'div';

  return (
    <Element
      ref={ref}
      css={css({
        display: 'flex',
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        gap: gap,
        ...etcStyles,
      })}
      {...attribute}
    >
      {children}
    </Element>
  );
});

export default Flex;
