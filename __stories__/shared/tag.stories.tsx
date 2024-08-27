import Flex from '@/shared/ui/flex';
import Tag from '@/shared/ui/tag';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tag> = {
  title: 'shared/Tag',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      description: '태그 컴포넌트에 들어가는 text',
    },
    etcStyles: {
      description: '그 외 커스텀 스타일',
    },
    externalAction: {
      description: '태그를 닫을 때 추가적인 기능을 부여할 때 사용',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Index: Story = {
  render: () => {
    return <Tag text="태그" />;
  },
};

export const TagList: Story = {
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
