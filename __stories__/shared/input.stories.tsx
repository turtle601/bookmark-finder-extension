import { color, spacer } from '@/shared/config/styles';

import Button from '@/shared/ui/button';
import Flex from '@/shared/ui/flex';
import Text from '@/shared/ui/text';
import { Input } from '@/shared/ui/input/input.ui';

import { useForm } from '@/shared/hooks/useForm';

import { getOutlineFieldStyle } from '@/shared/ui/input/input.style';

import type { FormRefValueType } from '@/shared/hooks/useForm';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
  title: 'shared/Input',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => {
    const { errorMessage, handleOnSubmit, register } = useForm();

    const submitEvent = (e: React.MouseEvent) => {
      e.preventDefault();

      const action = (formRefValue: FormRefValueType) => {
        console.log('submit 요청!!');
      };

      handleOnSubmit({ action });
    };

    return (
      <Flex direction={'column'} gap={'8px'}>
        <Input
          {...register({
            id: '1',
            customValidate: {
              fn: (el: HTMLInputElement) => {
                if (el.value.length > 3) {
                  return true;
                }

                return false;
              },
              errorMessage: '절대 Input 길이를 3이하로 두지마',
            },
          })}
          etcStyles={{
            ...getOutlineFieldStyle(),
          }}
        />
        <Text label={errorMessage} textColor={color.red} type="sm" />
        <Button
          kind="default"
          type="submit"
          onClick={submitEvent}
          etcStyles={{
            padding: spacer.spacing2,
          }}
        >
          submit 요청
        </Button>
      </Flex>
    );
  },
};

export const Require: Story = {
  render: () => {
    const { errorMessage, handleOnSubmit, register } = useForm();

    const submitEvent = (e: React.MouseEvent) => {
      e.preventDefault();

      const action = (formRefValue: FormRefValueType) => {
        console.log('submit 요청!!');
      };

      handleOnSubmit({ action });
    };

    return (
      <Flex direction={'column'} gap={'8px'}>
        <Input
          required
          {...register({
            id: '1',
          })}
          etcStyles={{
            ...getOutlineFieldStyle(),
          }}
        />
        <Text label={errorMessage} textColor={color.red} type="sm" />
        <Button
          kind="default"
          type="submit"
          onClick={submitEvent}
          etcStyles={{
            padding: spacer.spacing2,
          }}
        >
          submit 요청
        </Button>
      </Flex>
    );
  },
};
