import { color } from '@/shared/config/styles';

import type { CSSObject } from '@emotion/react';

export const getDeleteBookmarkButtonStyle = (
  isDragEnter: boolean,
): CSSObject => {
  return {
    ...(isDragEnter && {
      backgroundColor: color.red,
    }),
  };
};
