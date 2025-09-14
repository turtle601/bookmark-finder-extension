import { css } from '@emotion/react';

type SpacerType = 'vertical' | 'horizontal';

import type { CSSObject } from '@emotion/react';

const getSpacerStyle = <T extends SpacerType>({
  direction,
  space,
}: ISpacerProps<T>) => {
  if (direction === 'vertical') {
    return css({
      width: '1px',
      flex: 'none',
      height: `${space}`,
    });
  }

  return css({
    flex: 'none',
    width: `${space}`,
    height: '1px',
  });
};

export interface ISpacerProps<T extends SpacerType> {
  direction: T;
  space: CSSObject[T extends 'vertical' ? 'width' : 'height'];
}

function Spacer<T extends SpacerType>({ direction, space }: ISpacerProps<T>) {
  return <div css={getSpacerStyle({ direction, space })}></div>;
}

export default Spacer;
