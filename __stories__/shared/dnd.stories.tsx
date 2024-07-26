import React from 'react';

import { useRef, useState } from 'react';

import DnD from '@/shared/ui/dnd';

import type { Meta, StoryObj } from '@storybook/react';
import { css } from '@emotion/react';
import { color } from '@/shared/config/styles';
import Center from '@/shared/ui/center';

const meta: Meta<typeof DnD> = {
  title: 'shared/DnD',

  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => <Story />,
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
    <ul>
      {list.map((item, id) => {
        return (
          <>
            <DnD.Dropable dropAction={onDropMove(id)}>
              {({ isDragEnter }) => {
                return (
                  <li
                    css={css({
                      width: '120px',
                      height: '8px',
                      backgroundColor: isDragEnter ? color.purple : color.white,
                    })}
                  ></li>
                );
              }}
            </DnD.Dropable>
            <DnD.Dragable key={item.id} dragAction={onDragItem(id)}>
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
            </DnD.Dragable>
          </>
        );
      })}
    </ul>
  );
};

export const Default: Story = {
  render: () => {
    return (
      <DnD.Provider>
        <Center
          direction={'column'}
          etcStyles={{
            width: '200px',
            height: '300px',
          }}
        >
          <DnD.PointerContent />
          <DnDComponent />
        </Center>
      </DnD.Provider>
    );
  },
};
