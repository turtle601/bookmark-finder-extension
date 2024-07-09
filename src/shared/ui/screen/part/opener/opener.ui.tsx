import {
  ScreenContent,
  useScreenActionContext,
} from '@/shared/ui/screen/model';
import React, { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface IOpenerProps extends ComponentPropsWithoutRef<'button'> {
  kind: 'sidebar' | 'modal';
  screenContent: ScreenContent;
  children: ReactNode;
}

const Opener: React.FC<IOpenerProps> = ({
  kind,
  screenContent,
  children,
  ...attribute
}) => {
  const { openModal, openSidebar } = useScreenActionContext();

  const handleClick = () => {
    switch (kind) {
      case 'sidebar':
        openSidebar(screenContent);
        return;
      case 'modal':
        openModal(screenContent);
        return;
      default:
        throw new Error('지정된 액션이 없습니다');
    }
  };

  return (
    <button type="button" {...attribute} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Opener;
