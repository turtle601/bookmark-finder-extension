import { CSSObject, css } from '@emotion/react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { getButtonStyle } from '@/shared/ui/button/button.style';

import type { ButtonType } from '@/shared/ui/button/button.style';

interface IButtonProps extends ComponentPropsWithoutRef<'button'> {
  kind: ButtonType;
  children: ReactNode;
  etcStyles?: CSSObject;
}

function Button({ kind, etcStyles, children, ...attributes }: IButtonProps) {
  return (
    <button
      css={css({
        ...getButtonStyle(kind),
        ...etcStyles,
      })}
      {...attributes}
    >
      {children}
    </button>
  );
}

export default Button;
