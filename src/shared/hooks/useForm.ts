import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  useRef,
  useState,
} from 'react';

export interface IInputRefsValueType {
  element: HTMLInputElement;
  validate: (el: HTMLInputElement) => boolean;
  errorMessage: string;
}

export type FormRefValueType = Record<string, IInputRefsValueType>;

interface IRegisterParameter extends ComponentPropsWithoutRef<'input'> {
  id: string;
  validate?: (el: HTMLInputElement) => boolean;
  errorMessage?: string;
}

interface IActionParameter {
  action: (inputValue: FormRefValueType) => void;
}

export const useForm = () => {
  const formRefs = useRef<FormRefValueType>({});
  const [errorMessage, setErrorMessage] = useState('');

  const register = ({
    id,
    validate = () => true,
    errorMessage = '',
    ...attribute
  }: IRegisterParameter): ComponentPropsWithRef<'input'> => {
    return {
      id: id,
      ref: (el: HTMLInputElement) => {
        formRefs.current[id] = {
          element: el,
          validate,
          errorMessage,
        };
      },
      ...attribute,
    };
  };

  const handleOnSubmit = ({ action }: IActionParameter) => {
    const formRefValuefList = Object.values(formRefs.current);

    const notValidElement = formRefValuefList.filter((formRefValue) => {
      return !formRefValue.validate(formRefValue.element);
    })[0];

    const isValid = !notValidElement;

    if (!isValid) {
      setErrorMessage(notValidElement.errorMessage);
      return;
    }

    action(formRefs.current);
  };

  return { errorMessage, register, handleOnSubmit };
};
