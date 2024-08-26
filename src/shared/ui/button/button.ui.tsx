import { CSSObject, css } from '@emotion/react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { getButtonStyle } from '@/shared/ui/button/button.style';

import type { ButtonType } from '@/shared/ui/button/button.style';

interface IButtonProps extends ComponentPropsWithoutRef<'button'> {
  /** 버튼 타입 */
  kind: ButtonType;
  /** 버튼 안의 내용 */
  children: ReactNode;
  /** 그 외 커스텀 스타일 */
  etcStyles?: CSSObject;
}

function Button({
  kind = 'default',
  children,
  etcStyles,
  ...attributes
}: IButtonProps) {
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
