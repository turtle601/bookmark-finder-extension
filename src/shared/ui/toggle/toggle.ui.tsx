import { CSSObject, css } from '@emotion/react';

import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  MouseEventHandler,
} from 'react';

import {
  getToggleButtonStyle,
  getToggleSwitchStyle,
} from '@/shared/ui/toggle/toggle.style';

interface IToggleProps extends ComponentPropsWithoutRef<'button'> {
  id?: string;
  isChecked: boolean;
  onClick: MouseEventHandler;
  etcStyles?: CSSObject;
}

const ToggleComponent = (
  { id, isChecked, onClick, etcStyles = {}, ...attribute }: IToggleProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  return (
    <>
      <input
        id={id || 'toggle'}
        ref={ref}
        checked={isChecked}
        type="checkbox"
        css={css({
          display: 'none',
        })}
      ></input>
      <button onClick={onClick} {...attribute}>
        <label
          htmlFor={id || 'toggle'}
          css={css({
            ...getToggleSwitchStyle(isChecked),
            ...etcStyles,
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
