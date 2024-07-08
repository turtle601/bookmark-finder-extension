import { useState } from 'react';

import DnD from '@/shared/ui/dnd';
import DnDProvider from '@/shared/ui/dnd/provider';

import type { IDragPosition } from '@/shared/ui/dnd/hooks';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DnD> = {
  title: 'shared/DnD',
};

export default meta;

type Story = StoryObj<typeof DnD>;

interface IOnDropAction {
  startPosition: IDragPosition;
  endPosition: IDragPosition;
}

interface IItemType {
  id: string;
  text: string;
}

type ListType = IItemType[];

const DnDComponent = () => {
  const [list, setList] = useState<ListType>([
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

  const onDropMove = ({ startPosition, endPosition }: IOnDropAction) => {
    const newList = [
      ...list.flatMap((v) => {
        return [null, v];
      }),
      null,
    ];

    const startId = startPosition.id * 2 + 1;
    const endId = endPosition.id * 2;

    newList[endId] = newList[startId];
    newList[startId] = null;

    setList(newList.filter((v) => !!v));
  };

  return (
    <DnDProvider>
      <DnD.Overlay />
      {list.map((item, id) => {
        return (
          <div key={id}>
            <DnD.DropableLine
              action={onDropMove}
              position={{ id: id, data: item }}
            />
            <DnD.DragableLine position={{ id: id, data: item }} />
          </div>
        );
      })}
      <DnD.DropableLine action={onDropMove} position={{ id: list.length }} />
    </DnDProvider>
  );
};

export const Default: Story = {
  render: () => {
    return <DnDComponent />;
  },
};
