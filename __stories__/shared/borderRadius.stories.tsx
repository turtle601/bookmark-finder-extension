import { css, CSSObject } from '@emotion/react';

import { borderRadius, color } from '@/shared/config/styles';

import type { StoryObj } from '@storybook/react';
import Center from '@/shared/ui/center';

const meta = {
  tags: ['autodocs'],
} as const;

export default meta;

type Story = StoryObj;

const getGridItemStyle = (): CSSObject => {
  return {
    width: '80px',
    height: '80px',
  };
};

export const BorderRadiusTable: Story = {
  render: () => {
    return (
      <div
        css={css({
          display: 'grid',
          gridTemplateColumns: `repeat(3, 200px)`,
          gap: '12px',
        })}
      >
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          small
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          medium
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          large
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          12px
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          20px
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          32px
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          <div
            css={css({
              width: '64px',
              height: '64px',
              backgroundColor: color.red300,
              borderRadius: borderRadius.small,
            })}
          ></div>
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          <div
            css={css({
              width: '64px',
              height: '64px',
              backgroundColor: color.red300,
              borderRadius: borderRadius.medium,
            })}
          ></div>
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          <div
            css={css({
              width: '64px',
              height: '64px',
              backgroundColor: color.red300,
              borderRadius: borderRadius.large,
            })}
          ></div>
        </Center>
      </div>
    );
  },
};
