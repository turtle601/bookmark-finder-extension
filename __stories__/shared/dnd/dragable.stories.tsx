import DnD from '@/shared/ui/dnd';
import ModalLayer from '@/shared/ui/modalLayer';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DnD.Dragable> = {
  title: 'shared/DragDrop/Dragable',
  component: DnD.Dragable,
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
      description:
        'DnD.Dragable 안의 내용, 이때 콜백함수 형식으로 선언해야합니다. ex. `({ isDrag }) => return <div>Drag 요소입니다</div>`',
    },
    isMoved: {
      description: '위치를 이동시키는 Dragable인지 아닌지',
    },
    dragAction: {
      description: 'drag 시 발생하는 추가적인 이벤트',
    },
    etcStyles: {
      description: '그 외 커스텀 스타일',
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
