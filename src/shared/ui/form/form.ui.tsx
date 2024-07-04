import { useRef } from 'react';

import { getChildrenForInputRef } from '@/shared/ui/form/form.lib';

import type { ComponentPropsWithoutRef, FormEventHandler } from 'react';

export interface IFormProps extends ComponentPropsWithoutRef<'form'> {
  externalAction?: (inputs?: HTMLInputElement[]) => void;
}

function Form({ children, externalAction, ...attribute }: IFormProps) {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    let focusFlag = false;

    Object.entries(inputRefs.current).forEach(([, element]) => {
      if (!focusFlag && element.checkValidity()) {
        element.focus();
        element.scrollIntoView();
        focusFlag = true;
      }
    });

    if (!focusFlag) {
      if (externalAction) externalAction(inputRefs.current);
    }
  };

  return (
    <form onSubmit={handleSubmit} {...attribute}>
      {getChildrenForInputRef(children, inputRefs)}
    </form>
  );
}

export default Form;
