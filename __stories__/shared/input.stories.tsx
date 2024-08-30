import { css, CSSObject } from '@emotion/react';

import { color, spacer } from '@/shared/config/styles';

import Text from '@/shared/ui/text';
import Center from '@/shared/ui/center';

import { Input } from '@/shared/ui/input/input.ui';
import { ErrorMessage } from '@/shared/ui/input';

import type { Meta, StoryObj } from '@storybook/react';
import Spacer from '@/shared/ui/spacer';
import Flex from '@/shared/ui/flex';

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Input>;

const getGridItemStyle = (): CSSObject => {
  return {
    width: '150px',
    height: '100px',
  };
};

export const TextInputTable: Story = {
  render: () => {
    return (
      <div>
        <Text label="TextInput" type="lg" fontWeightType="bold" />
        <div
          css={css({
            display: 'grid',
            gridTemplateColumns: `repeat(5, 1fr)`,
            gridTemplateRows: `repeat(3, 1fr)`,
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
            default
          </Center>
          <Center
            etcStyles={{
              ...getGridItemStyle(),
            }}
          >
            placeholder
          </Center>
          <Center
            etcStyles={{
              ...getGridItemStyle(),
            }}
          >
            focus
          </Center>
          <Center
            etcStyles={{
              ...getGridItemStyle(),
            }}
          >
            error
          </Center>
          <Center
            etcStyles={{
              ...getGridItemStyle(),
            }}
          >
            outline
          </Center>
          <Center
            etcStyles={{
              ...getGridItemStyle(),
            }}
          >
            <Input type="text" kind="outline" />
          </Center>
          <Center
            etcStyles={{
              ...getGridItemStyle(),
            }}
          >
            <Input type="text" placeholder="placeholder" kind="outline" />
          </Center>
          <Center
            etcStyles={{
              ...getGridItemStyle(),
            }}
          >
            <Input
              type="text"
              placeholder="placeholder"
              kind="outline"
              etcStyles={{
                border: `4px solid ${color.green}`,
              }}
            />
          </Center>
          <Center
            etcStyles={{
              ...getGridItemStyle(),
            }}
          >
            <div>
              <Input
                type="text"
                kind="outline"
                etcStyles={{
                  border: `4px solid ${color.red}`,
                }}
              />
              <ErrorMessage message={'Invalid message'} />
            </div>
          </Center>
          <Center
            etcStyles={{
              ...getGridItemStyle(),
            }}
          >
            flushed
          </Center>
          <Center
            etcStyles={{
              ...getGridItemStyle(),
            }}
          >
            <Input type="text" kind="flushed" />
          </Center>
          <Center
            etcStyles={{
              ...getGridItemStyle(),
            }}
          >
            <Input type="text" kind="flushed" placeholder="placeholder" />
          </Center>
          <Center
            etcStyles={{
              ...getGridItemStyle(),
            }}
          >
            <Input
              type="text"
              kind="flushed"
              etcStyles={{
                borderBottom: `4px solid ${color.green}`,
              }}
            />
          </Center>
          <Center
            etcStyles={{
              ...getGridItemStyle(),
            }}
          >
            <div>
              <Input
                type="text"
                kind="flushed"
                etcStyles={{
                  borderBottom: `4px solid ${color.red}`,
                }}
              />
              <ErrorMessage message={'Invalid message'} />
            </div>
          </Center>
        </div>
      </div>
    );
  },
};

export const CheckboxTable: Story = {
  render: () => {
    return (
      <div>
        <Text label="Checkbox" type="lg" fontWeightType="bold" />
        <Spacer space={spacer.spacing3} direction="vertical" />
        <Flex>
          <Input type="radio" checked={true} />
          <Spacer space={spacer.spacing3} direction="horizontal" />
          <Input type="radio" />
        </Flex>
      </div>
    );
  },
};
