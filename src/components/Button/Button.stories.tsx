import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import { Button } from './Button';

const meta = {
  title: 'Inputs/Button',
  component: Button,
  args: { children: 'Label', variant: 'default', size: 'default', disabled: false },
  argTypes: {
    variant: { control: 'select', options: ['default', 'overlay', 'outline', 'secondary', 'ghost', 'destructive', 'link'] },
    size: { control: 'inline-radio', options: ['default', 'compact'] },
    trailingIcon: { control: false },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithTrailingIcon: Story = { args: { trailingIcon: <ArrowRightIcon /> } };

const variants = ['default', 'overlay', 'outline', 'secondary', 'ghost', 'destructive', 'link'] as const;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 16, alignItems: 'center' }}>
      {variants.map((v) => (
        <Fragment key={v}>
          <Button key={`${v}-d`} variant={v}>{v}</Button>
          <Button key={`${v}-c`} variant={v} size="compact">{v}</Button>
          <Button key={`${v}-x`} variant={v} disabled>{v}</Button>
        </Fragment>
      ))}
    </div>
  ),
};
