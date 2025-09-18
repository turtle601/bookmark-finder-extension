import React, { forwardRef } from 'react';

import Flex from '../flex';

import type { CSSObject } from '@emotion/react';
import type { PolymorpicProps } from '@/utils/type';

export interface ICenterProps {
  direction?: CSSObject['flexDirection'];
  etcStyles?: CSSObject;
}

// eslint-disable-next-line @rushstack/typedef-var
const Center = forwardRef(function CenterComponent<
  T extends React.ElementType = 'div',
>(
  {
    as,
    direction = 'row',
    etcStyles = {},
    children,
    ...attribute
  }: PolymorpicProps<T, ICenterProps>,
  ref: React.Ref<React.ComponentPropsWithRef<T>['ref']>,
) {
  const Element = as || 'div';

  return (
    <Flex
      as={Element}
      direction={direction}
      justify="center"
      align="center"
      etcStyles={etcStyles}
      {...attribute}
    >
      {children}
    </Flex>
  );
});

export default Center;
