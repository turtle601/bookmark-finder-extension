import Input from '@/shared/ui/input';

import type { Meta, StoryObj } from '@storybook/react';

import SearchIcon from '../src/shared/config/assets/search.svg';

const meta: Meta<typeof Input> = {
  title: 'shared/Input',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const OutlineDefault: Story = {
  render: () => (
    <Input inputName="outline-default" inputValue="">
      <Input.Field
        kind="outline"
        etcStyles={{
          width: '100%',
        }}
      />
    </Input>
  ),
};

export const OutlinePlaceholder: Story = {
  render: () => (
    <Input inputName="outline-placeholder" inputValue="">
      <Input.Field
        kind="outline"
        placeholder="placeholder"
        etcStyles={{
          width: '100%',
        }}
      />
    </Input>
  ),
};

export const OutlineLeftIcon: Story = {
  render: () => (
    <Input
      inputName="outline-placeholder"
      inputValue=""
      validate={(value) => true}
    >
      <Input.LeftElement pointerEvents="none">
        <SearchIcon />
      </Input.LeftElement>
      <Input.Field
        kind="outline"
        placeholder="placeholder"
        etcStyles={{
          width: '100%',
        }}
      />
    </Input>
  ),
};

export const OutlineError: Story = {
  render: () => (
    <Input
      inputName="outline-placeholder"
      inputValue=""
      validate={(value) => true}
    >
      <Input.Field
        kind="outline"
        placeholder="placeholder"
        etcStyles={{
          width: '100%',
        }}
      />
      <Input.ErrorMessage message="Invalid message" />
    </Input>
  ),
};

export const FlushedDefault: Story = {
  render: () => (
    <Input inputName="flushed-default" inputValue="">
      <Input.Field
        kind="flushed"
        etcStyles={{
          width: '100%',
        }}
      />
    </Input>
  ),
};

export const FlushedPlaceholder: Story = {
  render: () => (
    <Input inputName="flushed-placeholder" inputValue="">
      <Input.Field
        kind="flushed"
        placeholder="placeholder"
        etcStyles={{
          width: '100%',
        }}
      />
    </Input>
  ),
};

export const FlushedLeftIcon: Story = {
  render: () => (
    <Input inputName="flushed-leftIcon" inputValue="">
      <Input.LeftElement pointerEvents="none">
        <SearchIcon />
      </Input.LeftElement>
      <Input.Field
        kind="flushed"
        etcStyles={{
          width: '100%',
        }}
      />
    </Input>
  ),
};

export const FlushedError: Story = {
  render: () => (
    <Input
      inputName="flushed-placeholder"
      inputValue=""
      validate={(value) => true}
    >
      <Input.Field
        kind="flushed"
        placeholder="placeholder"
        etcStyles={{
          width: '100%',
        }}
      />
      <Input.ErrorMessage message="Invalid message" />
    </Input>
  ),
};
