import React, { forwardRef } from 'react';
import { css } from '@emotion/react';

import {
  getCheckBoxStyle,
  getFlushedFieldStyle,
  getOutlineFieldStyle,
} from '@/shared/ui/input/input.style';

import type { CSSObject } from '@emotion/react';

interface IInputProps extends React.ComponentPropsWithoutRef<'input'> {
  /** textInput 타입 */
  kind?: 'outline' | 'flushed';
  /** input 타입 (ex. text, checkbox 등) */
  type?: React.HTMLInputTypeAttribute;
  /** 그 외 커스텀 스타일 */
  etcStyles?: CSSObject;
}

const InputComponent = (
  { kind, type = 'text', etcStyles, ...attribute }: IInputProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  const isTextInput = type === 'text';
  const isCheckBox = type === 'checkbox' || type === 'radio';

  const isOutline = kind === 'outline';
  const isFlushed = kind === 'flushed';

  const outLineStyle = isTextInput && isOutline ? getOutlineFieldStyle() : {};
  const flushedStyle = isTextInput && isFlushed ? getFlushedFieldStyle() : {};
  const checkboxStyle = isCheckBox ? getCheckBoxStyle() : {};

  return (
    <input
      ref={ref}
      type={type}
      css={css({
        ...outLineStyle,
        ...flushedStyle,
        ...checkboxStyle,
        ...etcStyles,
      })}
      {...attribute}
    />
  );
};

export const Input: React.ForwardRefExoticComponent<
  IInputProps & React.RefAttributes<HTMLInputElement>
> = forwardRef(InputComponent);
