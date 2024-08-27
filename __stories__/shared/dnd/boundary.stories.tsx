import DnD from '@/shared/ui/dnd';
import ModalLayer from '@/shared/ui/modalLayer';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DnD.Boundary> = {
  title: 'shared/DragDrop/Boundary',
  component: DnD.Boundary,
  tags: ['autodocs'],
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <DnD.Provider>
        <Story />
      </DnD.Provider>
    ),
  ],
  argTypes: {
    children: {
      description: 'DnD.Boundary 안의 내용',
    },
    width: {
      description: 'Drag가 허용되는 DnD.Boundary의 가로 넓이',
    },
    height: {
      description: 'Drag가 허용되는 DnD.Boundary의 세로 길이',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ModalLayer.Opener>;

export const Story: Story = {
  render: () => {
    return (
      <DnD.Boundary width={'360px'} height={'360px'}>
        <div></div>
      </DnD.Boundary>
    );
  },
};
