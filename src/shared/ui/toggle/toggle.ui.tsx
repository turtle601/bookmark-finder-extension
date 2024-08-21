import React, { forwardRef } from 'react';

import { css } from '@emotion/react';

import { Input } from '@/shared/ui/input';

import {
  getToggleButtonStyle,
  getToggleSwitchStyle,
} from '@/shared/ui/toggle/toggle.style';

interface IToggleProps extends React.ComponentPropsWithoutRef<'input'> {
  isChecked: boolean;
  onClick: React.MouseEventHandler;
}

const ToggleComponent = (
  { isChecked, onClick, ...attribute }: IToggleProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  return (
    <>
      <Input
        readOnly
        ref={ref}
        checked={isChecked}
        type="checkbox"
        {...attribute}
        css={css({
          display: 'none',
        })}
      />
      <button aria-label="toggle" onClick={onClick}>
        <label
          css={css({
            ...getToggleSwitchStyle(isChecked),
          })}
        >
          <span
            css={css({
              ...getToggleButtonStyle(isChecked),
            })}
          ></span>
        </label>
      </button>
    </>
  );
};

export type IToggle = React.ForwardRefExoticComponent<
  IToggleProps & React.RefAttributes<HTMLInputElement>
>;

const Toggle: IToggle = forwardRef(ToggleComponent);

export default Toggle;
