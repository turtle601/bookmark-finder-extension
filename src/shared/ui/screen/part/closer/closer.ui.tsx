import { useScreenActionContext } from '@/shared/ui/screen/model';
import React, { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface ICloserProps extends ComponentPropsWithoutRef<'button'> {
  kind: 'sidebar' | 'modal';
  children: ReactNode;
}

const Closer: React.FC<ICloserProps> = ({ kind, children, ...attribute }) => {
  const { closeModal, closeSidebar } = useScreenActionContext();

  const handleClick = () => {
    switch (kind) {
      case 'sidebar':
        closeSidebar();
        return;
      case 'modal':
        closeModal();
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

export default Closer;
