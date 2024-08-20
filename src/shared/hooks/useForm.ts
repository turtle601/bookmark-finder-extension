import { INPUT_ERROR_MESSAGE } from '@/shared/config/constant';
import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  useRef,
  useState,
} from 'react';

interface ICustomValidate {
  fn: (el: HTMLInputElement) => boolean;
  errorMessage: string;
}

export interface IInputRefsValueType {
  element: HTMLInputElement;
  customValidate: ICustomValidate;
}

interface IRegisterParameter extends ComponentPropsWithoutRef<'input'> {
  id: string;
  customValidate?: ICustomValidate;
}

export type FormRefValueType = Record<string, IInputRefsValueType>;

interface IActionParameter {
  wholeErrorMessage?: string;
  wholeValidate?: {
    fn: (inputValue: FormRefValueType) => boolean;
    errorMessage: string;
  }[];
  action: (inputValue: FormRefValueType) => void;
}

const VALIDITY_STATE = [
  'badInput',
  'patternMismatch',
  'rangeOverflow',
  'rangeUnderflow',
  'stepMismatch',
  'tooLong',
  'tooShort',
  'typeMismatch',
  'valueMissing',
] as const;

const customValidateElement = ({
  element,
  customValidate,
}: IInputRefsValueType) => {
  const errorMessage = !customValidate.fn(element)
    ? customValidate.errorMessage
    : '';

  element.setCustomValidity(errorMessage);
};

export const useForm = () => {
  const formRefs = useRef<FormRefValueType>({});
  const [errorMessage, setErrorMessage] = useState('');

  const watch = ({ id }: { id: string }) => {
    return formRefs.current[id];
  };

  const watchAll = () => {
    return formRefs.current;
  };

  const register = ({
    id,
    customValidate = {
      fn: () => true,
      errorMessage: ' ',
    },
    ...attribute
  }: IRegisterParameter): ComponentPropsWithRef<'input'> => {
    if (customValidate.errorMessage.length === 0) {
      throw new Error(
        'customValidate.errorMessage는 1이상의 문자열이 들어와야합니다.',
      );
    }

    return {
      id: id,
      ref: (el: HTMLInputElement) => {
        formRefs.current[id] = {
          element: el,
          customValidate,
        };
      },
      onInput: () => {
        const element = formRefs.current[id].element;
        const customValidate = formRefs.current[id].customValidate;
        customValidateElement({ element, customValidate });
        setErrorMessage('');
      },
      onFocus: () => {
        const element = formRefs.current[id].element;
        const customValidate = formRefs.current[id].customValidate;
        customValidateElement({ element, customValidate });
        setErrorMessage('');
      },
      ...attribute,
    };
  };

  const handleOnAction = ({ action, wholeValidate = [] }: IActionParameter) => {
    let flag = false;

    wholeValidate.forEach(({ fn, errorMessage }) => {
      if (!fn(formRefs.current)) {
        flag = true;
        setErrorMessage(errorMessage);
        return;
      }
    });

    if (!flag) action(formRefs.current);
  };

  const handleOnSubmit = ({ action, wholeValidate = [] }: IActionParameter) => {
    const formRefValueList = Object.values(formRefs.current);

    const notValidRefValueList = formRefValueList.filter(
      ({ element, customValidate }) => {
        customValidateElement({ element, customValidate });

        return !element.checkValidity();
      },
    );

    const isValid = notValidRefValueList.length === 0;

    if (!isValid) {
      const notValidElement = notValidRefValueList[0].element;

      notValidElement.focus();

      if (notValidElement.validity.customError) {
        setErrorMessage(notValidElement.validationMessage);
      } else {
        VALIDITY_STATE.forEach((state) => {
          if (notValidElement.validity[state]) {
            setErrorMessage(INPUT_ERROR_MESSAGE[state]);
            return;
          }
        });
      }
      return;
    }

    handleOnAction({ action, wholeValidate });
  };

  return {
    errorMessage,
    register,
    handleOnSubmit,
    watch,
    watchAll,
    handleOnAction,
  };
};
