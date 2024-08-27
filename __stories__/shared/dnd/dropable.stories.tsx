import { color } from '@/shared/config/styles';
import DnD from '@/shared/ui/dnd';
import ModalLayer from '@/shared/ui/modalLayer';
import { css } from '@emotion/react';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DnD.Dropable> = {
  title: 'shared/DragDrop/Dropable',
  component: DnD.Dropable,
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
      description: `DnD.Dropable 안의 내용, 이때 콜백함수 형식으로 선언해야합니다. 
      isDragEnter 값을 통해 children 컴포넌트에 마우스가 들어 왔는지 확인할 수 있습니다.
        ex. "({ isDragEnter }) => return <div>Drag 요소입니다</div>"`,
    },
    dropAction: {
      description: 'drop 시 발생하는 추가적인 이벤트',
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
        <DnD.Dragable>
          {({ isDrag }) => {
            return (
              <div
                css={css({
                  backgroundColor: isDrag ? color.gray100 : 'transparent',
                })}
              >
                Drag 요소입니다
              </div>
            );
          }}
        </DnD.Dragable>
        <DnD.Dropable
          dropAction={() => {
            console.log('drop했습니다.');
          }}
        >
          {({ isDragEnter }) => {
            return (
              <div
                css={css({
                  width: '200px',
                  height: '64px',
                  color: color.white,
                  backgroundColor: isDragEnter ? color.red : color.gray,
                })}
              >
                Drop 영역입니다.
              </div>
            );
          }}
        </DnD.Dropable>
      </DnD.Boundary>
    );
  },
};
