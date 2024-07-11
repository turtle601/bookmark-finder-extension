import type { CSSObject } from '@emotion/react';
import type { IFlexProps } from '@/shared/ui/flex/flex.ui';

export const getFlexStyle = ({
  direction,
  justify,
  align,
  gap,
  etcStyles,
}: IFlexProps): CSSObject => {
  return {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    gap: gap,
    ...etcStyles,
  };
};
