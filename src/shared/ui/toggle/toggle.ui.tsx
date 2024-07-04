import { CSSObject, css } from '@emotion/react';
import { ComponentPropsWithoutRef, useCallback, useState } from 'react';

import {
  getToggleButtonStyle,
  getToggleSwitchStyle,
} from '@/shared/ui/toggle/toggle.style';

interface IToggleProps extends ComponentPropsWithoutRef<'button'> {
  externalAction?: (toggledIsChecked?: boolean) => void;
  etcStyles?: CSSObject;
}

function Toggle({ externalAction, etcStyles }: IToggleProps) {
  const [isChecked, setIsChecked] = useState(false);

  const toggle = useCallback(() => {
    const toggledIsChecked = !isChecked;
    setIsChecked(toggledIsChecked);

    if (externalAction) externalAction(toggledIsChecked);
  }, [isChecked, externalAction]);

  return (
    <button onClick={toggle}>
      <label
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
  );
}

export default Toggle;
