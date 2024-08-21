import { spacer } from '@/shared/config/styles';
import Flex from '@/shared/ui/flex';
import Tag from '@/shared/ui/tag';
import { css } from '@emotion/react';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tag> = {
  title: 'shared/Tag',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  render: () => {
    return (
      <Flex
        etcStyles={{
          width: '360px',
          gap: '4px',
          maxHeight: '120px',
          flexWrap: 'wrap',
          overflow: 'auto',
        }}
      >
        <Tag text="태그0" />
        <Tag text="태그00" />
        <Tag text="태그000" />
        <Tag text="태그0000" />
        <Tag text="태그00000" />
        <Tag text="태그000000" />
      </Flex>
    );
  },
};
