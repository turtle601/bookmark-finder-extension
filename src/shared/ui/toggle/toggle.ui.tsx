import { CSSObject, css } from '@emotion/react';

import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useState,
} from 'react';

import {
  getToggleButtonStyle,
  getToggleSwitchStyle,
} from '@/shared/ui/toggle/toggle.style';

interface IToggleProps extends ComponentPropsWithoutRef<'button'> {
  id?: string;
  externalAction?: (toggledIsChecked?: boolean) => void;
  etcStyles?: CSSObject;
}

const ToggleComponent = (
  { id, externalAction, etcStyles = {}, ...attribute }: IToggleProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggle = useCallback(() => {
    const toggledIsChecked = !isChecked;
    setIsChecked(toggledIsChecked);

    if (externalAction) externalAction(toggledIsChecked);
  }, [isChecked, externalAction]);

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
      <button onClick={toggle} {...attribute}>
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
