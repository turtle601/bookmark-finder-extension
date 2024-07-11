import React from 'react';

import Flex from '@/shared/ui/flex/flex.ui';

import type { CSSObject } from '@emotion/react';
import type { PolymorpicProps } from '@/shared/ui/util.type';

export interface ICenterProps {
  direction?: CSSObject['flexDirection'];
  etcStyles?: CSSObject;
}

const Center = <T extends React.ElementType = 'div'>({
  as,
  direction = 'row',
  etcStyles = {},
  children,
  ...attribute
}: PolymorpicProps<T, ICenterProps>) => {
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
};

export default Center;
