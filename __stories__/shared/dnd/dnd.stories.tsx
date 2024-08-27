import React from 'react';

import { useRef, useState } from 'react';

import { css } from '@emotion/react';
import { color } from '@/shared/config/styles';

import DnD from '@/shared/ui/dnd';
import Dragable from '@/shared/ui/dnd/part/dragable';
import Dropable from '@/shared/ui/dnd/part/dropable';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DnD> = {
  title: 'shared/DragDrop',
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <DnD.Provider>
        <DnD.Boundary width={'500px'} height={'500px'}>
          <DnD.PointerContent />
          <Story />
        </DnD.Boundary>
      </DnD.Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DnD>;

interface IItemType {
  id: string;
  text: string;
}

const DnDComponent: React.FC = () => {
  const dragItemId = useRef<number>(-1);
  const [list, setList] = useState<IItemType[]>([
    {
      id: '0',
      text: 'Item 0',
    },
    {
      id: '1',
      text: 'Item 1',
    },
    {
      id: '2',
      text: 'Item 2',
    },
    {
      id: '3',
      text: 'Item 3',
    },
  ]);

  const onDropMove = (id: number) => () => {
    // 배열의 인덱스를 사용해라
    const newList = [
      ...list.flatMap((v) => {
        return [null, v];
      }),
      null,
    ];

    const startId = dragItemId.current * 2 + 1;
    const endId = id * 2;

    newList[endId] = newList[startId];
    newList[startId] = null;

    setList(newList.filter((v) => !!v));
  };

  const onDragItem = (id: number) => () => {
    dragItemId.current = id;
  };

  return (
    <>
      {list.map((item, id) => (
        <>
          <Dropable dropAction={onDropMove(id)}>
            {({ isDragEnter }) => (
              <li
                css={css({
                  width: '120px',
                  height: '8px',
                  backgroundColor: isDragEnter ? color.purple : color.white,
                })}
              ></li>
            )}
          </Dropable>
          <Dragable dragAction={onDragItem(id)}>
            {({ isDrag }) => {
              return (
                <li
                  css={css({
                    width: '120px',
                    height: '32px',
                    backgroundColor: isDrag ? color.gray200 : color.white,
                    padding: '8px',
                  })}
                >
                  {item.text}
                </li>
              );
            }}
          </Dragable>
        </>
      ))}
    </>
  );
};

export const Index: Story = {
  render: () => {
    return <DnDComponent />;
  },
};
