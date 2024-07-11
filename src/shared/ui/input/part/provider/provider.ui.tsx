import { css } from '@emotion/react';
import { FC, ReactElement, useMemo } from 'react';

import {
  InputActionContext,
  InputContext,
} from '@/shared/ui/input/model/context';

import Field from '@/shared/ui/input/part/field/field.ui';
import Label from '@/shared/ui/input/part/label/label.ui';
import ErrorMessage from '@/shared/ui/input/part/errorMessage/errorMessage.ui';
import LeftElement from '@/shared/ui/input/part/leftElement/leftElement.ui';

import { useInput } from '@/shared/ui/input/hooks/useInput';
import { useInputLeftElement } from '@/shared/ui/input/hooks/useInputLeftElement';

import { processFieldStyleWithLeftElement } from '@/shared/ui/input/lib';

export interface IInputProviderProps {
  inputName: string;
  inputValue: string;
  validate?: (value: string) => boolean;
  children:
    | ReactElement<typeof Field>
    | ReactElement<typeof Label>
    | ReactElement<typeof ErrorMessage>
    | ReactElement<typeof LeftElement>
    | ReactElement
    | ReactElement[];
}

const Provider: FC<IInputProviderProps> = ({
  inputName,
  inputValue,
  validate,
  children,
}) => {
  const { leftElementRef } = useInputLeftElement();
  const {
    name,
    value,
    touched,
    isError,
    handleChange,
    handleFocus,
    handleBlur,
  } = useInput({
    inputName,
    inputValue,
    validate,
  });

  const state = useMemo(() => {
    return { name, value, touched, isError };
  }, [name, value, touched, isError]);

  const action = useMemo(
    () => ({
      handleChange,
      handleFocus,
      handleBlur,
      validate,
    }),
    [handleChange, handleFocus, handleBlur, validate],
  );

  return (
    <InputContext.Provider value={state}>
      <InputActionContext.Provider value={action}>
        <div
          css={css({
            width: '100%',
            height: 'auto',
            position: 'relative',
          })}
        >
          {processFieldStyleWithLeftElement(children, leftElementRef)}
        </div>
      </InputActionContext.Provider>
    </InputContext.Provider>
  );
};

export default Provider;
