import DnD from '@/shared/ui/dnd';
import ModalLayer from '@/shared/ui/modalLayer';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DnD.PointerContent> = {
  title: 'shared/DragDrop/PointerContent',
  component: DnD.PointerContent,
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
    customStyle: {
      description:
        '그 외 커스텀 스타일, PointerContent의 mouse좌표에 따라 커스텀 스타일이 가능하다. `ex) (mouseX, mouseY) => CSSObject`',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ModalLayer.Opener>;

export const Story: Story = {
  render: () => {
    return (
      <DnD.Boundary width={'500px'} height={'500px'}>
        <DnD.PointerContent />
        <DnD.Dragable isMoved>
          {({ isDrag }) => {
            return <div>Drag 요소입니다</div>;
          }}
        </DnD.Dragable>
      </DnD.Boundary>
    );
  },
};
