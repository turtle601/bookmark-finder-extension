import { css, CSSObject } from '@emotion/react';

import Button from '@/shared/ui/button';
import Center from '@/shared/ui/center';

import { color } from '@/shared/config/styles';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

const getGridItemStyle = (): CSSObject => {
  return {
    width: '150px',
    height: '100px',
  };
};

export const ColorTable: Story = {
  render: () => {
    return (
      <div
        css={css({
          display: 'grid',
          gridTemplateColumns: `repeat(5, 1fr)`,
          gridTemplateRows: `repeat(6, 1fr)`,
        })}
      >
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        ></Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          primary
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          300
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          200
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          100
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          white
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
            border: `1px solid ${color.gray}`,
          }}
        >
          #fff
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        ></Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        ></Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        ></Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          Gray
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
            backgroundColor: color.gray,
            color: color.white,
          }}
        >
          #424242
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
            backgroundColor: color.gray300,
            color: color.white,
          }}
        >
          #B0B0B0
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
            backgroundColor: color.gray200,
            color: color.white,
          }}
        >
          #B7B7B7
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
            backgroundColor: color.gray100,
            color: color.white,
          }}
        >
          #B0B0B0
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          Green
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
            backgroundColor: color.green,
            color: color.white,
          }}
        >
          #03C75A
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
            backgroundColor: color.green300,
            color: color.white,
          }}
        >
          #34D77B
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        ></Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        ></Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          Red
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
            backgroundColor: color.red,
            color: color.white,
          }}
        >
          #E53935
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
            backgroundColor: color.red300,
            color: color.white,
          }}
        >
          #EC6563
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        ></Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        ></Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          Purple
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
            backgroundColor: color.purple,
            color: color.white,
          }}
        >
          #8E24AA
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        ></Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        ></Center>
      </div>
    );
  },
};
