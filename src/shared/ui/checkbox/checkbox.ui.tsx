import { CSSObject, css } from '@emotion/react';

import React, {
  Ref,
  forwardRef,
  ComponentPropsWithoutRef,
  MouseEventHandler,
} from 'react';

import Center from '@/shared/ui/center';
import CheckIcon from '@/shared/config/assets/check.svg';

import { getCheckboxWrapperStyle } from '@/shared/ui/checkbox/style';

interface ICheckboxProps extends ComponentPropsWithoutRef<'button'> {
  id?: string;
  isChecked: boolean;
  onClickAction: MouseEventHandler;
  etcStyles?: CSSObject;
}

const CheckboxComponent = (
  {
    id,
    isChecked,
    onClickAction,
    etcStyles = {},
    ...attribute
  }: ICheckboxProps,
  ref: Ref<HTMLInputElement>,
) => {
  return (
    <>
      <input
        id={id || 'checkbox'}
        ref={ref}
        checked={isChecked}
        type="checkbox"
        css={css({
          display: 'none',
        })}
      />

      <Center
        role={'checkbox'}
        as="button"
        type="button"
        onClick={onClickAction}
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
