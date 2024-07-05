import Modal from '@/shared/ui/modal';
import { useModalAction } from '@/shared/ui/modal/model';
import ModalProvider from '@/shared/ui/modal/provider';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Modal> = {
  title: 'shared/Modal',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

const Button = () => {
  const { openModal } = useModalAction();

  return (
    <button onClick={() => openModal('search', <div>hi</div>)}>
      모달 열기 버튼
    </button>
  );
};

export const Default: Story = {
  render: () => {
    return (
      <ModalProvider>
        <Button />
        <Modal name="search" />
      </ModalProvider>
    );
  },
};
