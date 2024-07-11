import { CSSObject, css } from '@emotion/react';
import {
  ComponentPropsWithoutRef,
  ReactNode,
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

export interface ILeftElementProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  pointerEvents?: CSSObject['pointerEvents'];
  etcStyles?: CSSObject;
}

export interface ILeftElementAttribute {
  width: CSSObject['right'];
  isLeftElement: boolean;
}

const LeftElementComponent = (
  { children, pointerEvents, etcStyles = {}, ...attribute }: ILeftElementProps,
  ref: Ref<ILeftElementAttribute>,
) => {
  const iconMarginLeft = 12;
  const leftElementRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(
    ref,
    (): ILeftElementAttribute => ({
      isLeftElement: true,
      width: `${(leftElementRef.current?.getBoundingClientRect().width || 20) + iconMarginLeft + 10}px`,
    }),
    [],
  );

  return (
    <div
      ref={leftElementRef}
      css={css({
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: `${iconMarginLeft}px`,
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: pointerEvents,
        ...etcStyles,
      })}
      {...attribute}
    >
      {children}
    </div>
  );
};

const LeftElement: React.ForwardRefExoticComponent<
  ILeftElementProps & React.RefAttributes<ILeftElementAttribute>
> = forwardRef(LeftElementComponent);

export default LeftElement;
