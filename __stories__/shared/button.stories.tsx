import { css, CSSObject } from '@emotion/react';

import Button from '@/shared/ui/button';
import Center from '@/shared/ui/center';

import { color } from '@/shared/config/styles';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

const getButtonSizeStyle = (): CSSObject => {
  return {
    width: '100px',
    height: '50px',
  };
};

const getGridItemStyle = (): CSSObject => {
  return {
    width: '200px',
    height: '100px',
  };
};

export const ButtonTable: Story = {
  render: () => {
    return (
      <div
        css={css({
          display: 'grid',
          gridTemplateColumns: `repeat(4, 1fr)`,
          gridTemplateRows: `repeat(4, 1fr)`,
          gap: `10px`,
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
          valid
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          danger
        </Center>
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
          <Button
            kind="default"
            etcStyles={{
              ...getButtonSizeStyle(),
            }}
          >
            Button
          </Button>
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          <Button
            kind="valid"
            etcStyles={{
              ...getButtonSizeStyle(),
            }}
          >
            Button
          </Button>
        </Center>
        <Center
          etcStyles={{
            ...getGridItemStyle(),
          }}
        >
          <Button
            kind="danger"
            etcStyles={{
              ...getButtonSizeStyle(),
            }}
          >
            Button
          </Button>
        </Center>
        <Center
          etcStyles={{
            width: '200px',
            height: '100px',
          }}
        >
          hover
        </Center>
        <Center
          etcStyles={{
            width: '200px',
            height: '100px',
          }}
        >
          <Button
            kind="default"
            etcStyles={{
              ...getButtonSizeStyle(),
              backgroundColor: color.gray300,
            }}
          >
            Button
          </Button>
        </Center>
        <Center
          etcStyles={{
            width: '200px',
            height: '100px',
          }}
        >
          <Button
            kind="valid"
            etcStyles={{
              ...getButtonSizeStyle(),
              backgroundColor: color.green300,
            }}
          >
            Button
          </Button>
        </Center>
        <Center
          etcStyles={{
            width: '200px',
            height: '100px',
          }}
        >
          <Button
            kind="danger"
            etcStyles={{
              ...getButtonSizeStyle(),
              backgroundColor: color.red300,
            }}
          >
            Button
          </Button>
        </Center>
        <Center
          etcStyles={{
            width: '200px',
            height: '100px',
          }}
        >
          disabled
        </Center>
        <Center
          etcStyles={{
            width: '200px',
            height: '100px',
          }}
        >
          <Button
            disabled
            kind="default"
            etcStyles={{
              ...getButtonSizeStyle(),
            }}
          >
            Button
          </Button>
        </Center>
        <Center
          etcStyles={{
            width: '200px',
            height: '100px',
          }}
        >
          <Button
            disabled
            kind="valid"
            etcStyles={{
              ...getButtonSizeStyle(),
            }}
          >
            Button
          </Button>
        </Center>
        <Center
          etcStyles={{
            width: '200px',
            height: '100px',
          }}
        >
          <Button
            disabled
            kind="danger"
            etcStyles={{
              ...getButtonSizeStyle(),
            }}
          >
            Button
          </Button>
        </Center>
      </div>
    );
  },
};
