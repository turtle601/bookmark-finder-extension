import { css } from '@emotion/react';

import type { ISpacerProps, SpacerType } from '@/shared/ui/spacer/spacer.ui';

export const getSpacerStyle = <T extends SpacerType>({
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
