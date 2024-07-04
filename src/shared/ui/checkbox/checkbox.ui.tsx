import { CSSObject, css } from '@emotion/react';
import React, {
  Ref,
  forwardRef,
  useCallback,
  useState,
  ComponentPropsWithoutRef,
} from 'react';

import CheckIcon from '@/shared/config/assets/check.svg';

import {
  getCheckboxInputStyle,
  getCheckboxWrapperStyle,
} from '@/shared/ui/checkbox/style';
import Center from '@/shared/ui/center';

interface ICheckboxProps extends ComponentPropsWithoutRef<'button'> {
  id?: string;
  etcStyles?: CSSObject;
  externalAction?: (toggledIsChecked: boolean) => void;
}

const CheckboxComponent = (
  { id, etcStyles = {}, externalAction, ...attribute }: ICheckboxProps,
  ref: Ref<HTMLInputElement>,
) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggle = useCallback(() => {
    const toggledIsChecked = !isChecked;
    setIsChecked(toggledIsChecked);

    if (externalAction) externalAction(toggledIsChecked);
  }, [externalAction, isChecked]);

  return (
    <>
      <input
        id={id || 'checkbox'}
        ref={ref}
        checked={isChecked}
        type="checkbox"
        css={css({
          ...getCheckboxInputStyle(),
        })}
      />

      <Center
        as="button"
        type="button"
        onClick={toggle}
        css={css({
          ...getCheckboxWrapperStyle(),
          ...etcStyles,
        })}
        {...attribute}
      >
        {isChecked && <CheckIcon />}
      </Center>
    </>
  );
};

export type ICheckbox = React.ForwardRefExoticComponent<
  ICheckboxProps & React.RefAttributes<HTMLInputElement>
>;

const Checkbox: ICheckbox = forwardRef(CheckboxComponent);

export default Checkbox;
