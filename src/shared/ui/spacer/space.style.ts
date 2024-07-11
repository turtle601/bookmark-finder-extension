import { css } from '@emotion/react';

import type { ISpacerProps, SpacerType } from '@/shared/ui/spacer/spacer.ui';

export const getSpacerStyle = <T extends SpacerType>({
  direction,
  space,
}: ISpacerProps<T>) => {
  if (direction === 'vertical') {
    return css({
      width: '1px',
      height: `${space}`,
    });
  }

  return css({
    width: `${space}`,
    height: '1px',
  });
};
