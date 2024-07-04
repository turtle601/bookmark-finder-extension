import { FC } from 'react';

import type { IField } from '@/shared/ui/input/part/field';
import type { ILabelProps } from '@/shared/ui/input/part/label';
import type { ILeftElementProps } from '@/shared/ui/input/part/leftElement';
import type { IErrorMessageProps } from '@/shared/ui/input/part/errorMessage';
import type { IInputProviderProps } from './part/provider';

import Field from '@/shared/ui/input/part/field/field.ui';
import Label from '@/shared/ui/input/part/label/label.ui';
import LeftElement from '@/shared/ui/input/part/leftElement/leftElement.ui';
import ErrorMessage from '@/shared/ui/input/part/errorMessage/errorMessage.ui';
import InputProvider from '@/shared/ui/input/part/provider/provider.ui';

export type IInput = FC<IInputProviderProps> & {
  Label: FC<ILabelProps>;
  ErrorMessage: FC<IErrorMessageProps>;
  Field: IField;
  LeftElement: FC<ILeftElementProps>;
};

const Input: IInput = Object.assign(InputProvider, {
  Label,
  ErrorMessage,
  Field,
  LeftElement,
});

export default Input;
