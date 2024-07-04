import { css } from '@emotion/react';

import { color, fontWeight, typography } from '@/shared/config/styles';

import type { ITextProps } from '@/shared/ui/text/text.ui';

export const getTextStyle = ({
  type = 'md',
  fontWeightType = 'regular',
  textColor = color.gray,
  etcStyles,
}: Omit<ITextProps, 'label'>) => {
  return css({
    color: textColor,
    fontWeight: fontWeight[fontWeightType],
    ...typography[type],
    ...etcStyles,
  });
};
