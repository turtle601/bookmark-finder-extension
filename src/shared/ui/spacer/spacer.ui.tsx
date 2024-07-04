import type { CSSObject } from '@emotion/react';
export type SpacerType = 'vertical' | 'horizontal';

import { getSpacerStyle } from '@/shared/ui/spacer/space.style';

export interface ISpacerProps<T extends SpacerType> {
  direction: T;
  space: CSSObject[T extends 'vertical' ? 'width' : 'height'];
}

function Spacer<T extends SpacerType>({ direction, space }: ISpacerProps<T>) {
  return <div css={getSpacerStyle({ direction, space })}></div>;
}

export default Spacer;
