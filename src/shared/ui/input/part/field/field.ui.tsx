import { css, CSSObject } from '@emotion/react';

import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardRefExoticComponent,
  MouseEventHandler,
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
  externalonChangeAction?: ChangeEventHandler<HTMLInputElement>;
  etcStyles?: CSSObject;
  paddingLeft?: CSSObject['paddingLeft'];
}

const FieldComponent = (
  {
    kind,
    externalonChangeAction,
    etcStyles = {},
    paddingLeft = '20px',
    ...attribute
  }: IFieldProps,
  ref: Ref<HTMLInputElement>,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { name, value, isError, touched } = useInputContext();
  const { handleBlur, handleChange, handleFocus, validate } =
    useInputActionContext();

  useImperativeHandle(
    ref,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (): any => ({
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

  const handleOnChangedAction: ChangeEventHandler<HTMLInputElement> = (e) => {
    handleChange(e);
    if (externalonChangeAction) externalonChangeAction(e);
  };

  return (
    <input
      id={name}
      type="text"
      value={value}
      ref={inputRef}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onChange={handleOnChangedAction}
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
  IFieldProps & RefAttributes<HTMLInputElement>
>;

const Field: IField = forwardRef(FieldComponent);

export default Field;
