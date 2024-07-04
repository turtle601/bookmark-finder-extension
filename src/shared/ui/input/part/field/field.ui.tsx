import { css, CSSObject } from '@emotion/react';

import {
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardRefExoticComponent,
  Ref,
  RefAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import {
  useInputActionContext,
  useInputContext,
} from '@/shared/ui/input/model/context';

import { getFieldStyle } from '@/shared/ui/input/part/field/field.style';

interface IFieldProps extends ComponentPropsWithoutRef<'input'> {
  kind: 'outline' | 'flushed';
  etcStyles?: CSSObject;
  paddingLeft?: CSSObject['paddingLeft'];
}
interface IFieldAttribute {
  focus: () => void;
  checkValidity: () => boolean;
  scrollIntoView: () => void;
  value: string;
}

const FieldComponent = (
  { kind, etcStyles = {}, paddingLeft = '20px', ...attribute }: IFieldProps,
  ref: Ref<IFieldAttribute>,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { name, value, isError, touched } = useInputContext();
  const { handleBlur, handleChange, handleFocus, validate } =
    useInputActionContext();

  useImperativeHandle(
    ref,
    (): IFieldAttribute => ({
      focus: () => {
        inputRef.current?.focus();
      },
      checkValidity: () => {
        if (validate) {
          return validate(inputRef.current?.value ?? '');
        }
        return true;
      },
      scrollIntoView: () => {
        inputRef.current?.scrollIntoView();
      },
      get value() {
        return inputRef.current?.value as string;
      },
      set value(newValue: string) {
        if (inputRef.current) {
          inputRef.current.value = newValue;
        }
      },
    }),
    [validate],
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);

  return (
    <input
      id={name}
      type="text"
      value={value}
      ref={inputRef}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onChange={handleChange}
      css={css({
        display: 'block',
        ...getFieldStyle(kind, isError, touched),
        paddingLeft,
        ...etcStyles,
      })}
      {...attribute}
    />
  );
};

export type IField = ForwardRefExoticComponent<
  IFieldProps & RefAttributes<IFieldAttribute>
>;

const Field: IField = forwardRef(FieldComponent);

export default Field;
