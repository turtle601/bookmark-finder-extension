import { spacer } from '@/shared/config/styles';

import Text from '@/shared/ui/text';
import Spacer from '@/shared/ui/spacer';
import Toggle from '@/shared/ui/toggle';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    isChecked: {
      description: '체크된 상태',
    },
    onClick: {
      description: '토글 컴포넌트 클릭 시 발생하는 이벤트',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const ToggleTable: Story = {
  render: () => {
    return (
      <div>
        <Text label={'체크 상태'} fontWeightType="semibold" />
        <Spacer direction="vertical" space={spacer.spacing2} />
        <Toggle isChecked={false} onClick={() => {}} />
        <Spacer direction="vertical" space={spacer.spacing4} />
        <Text label={'체크되지 않은 상태'} fontWeightType="semibold" />
        <Spacer direction="vertical" space={spacer.spacing2} />
        <Toggle isChecked={true} onClick={() => {}} />
      </div>
    );
  },
};
