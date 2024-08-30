import { css } from '@emotion/react';

import Flex from '@/shared/ui/flex';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Flex> = {
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Flex>;

const Item = () => {
  return (
    <div
      css={css({
        width: '48px',
        height: '48px',
        backgroundColor: '#000',
      })}
    ></div>
  );
};

export const Default: Story = {
  render: () => (
    <Flex
      gap="12px"
      etcStyles={{
        width: '100%',
        border: '1px solid black',
      }}
    >
      {Array(5)
        .fill(0)
        .map((v, id) => {
          return <Item key={id} />;
        })}
    </Flex>
  ),
};

export const HorizonBox: Story = {
  render: () => (
    <Flex
      gap="12px"
      direction="column"
      etcStyles={{
        width: '100%',
        border: '1px solid black',
      }}
    >
      {Array(5)
        .fill(0)
        .map((v, id) => {
          return <Item key={id} />;
        })}
    </Flex>
  ),
};

export const HorizonCentered: Story = {
  render: () => (
    <Flex
      gap="12px"
      justify="center"
      etcStyles={{
        width: '200px',
        border: '1px solid black',
      }}
    >
      <Item />
    </Flex>
  ),
};
export const VericalCentered: Story = {
  render: () => (
    <Flex
      gap="12px"
      align="center"
      etcStyles={{
        width: '100%',
        height: '200px',
        border: '1px solid black',
      }}
    >
      <Item />
    </Flex>
  ),
};
