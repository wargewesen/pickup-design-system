import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeartIcon } from '@heroicons/react/24/outline';
import { IconButton } from './IconButton';

const meta = {
  title: 'Inputs/IconButton',
  component: IconButton,
  args: { icon: <HeartIcon />, 'aria-label': 'Save', variant: 'default', size: 'default', disabled: false },
  argTypes: {
    variant: { control: 'select', options: ['default', 'overlay', 'outline', 'secondary', 'ghost', 'destructive'] },
    size: { control: 'inline-radio', options: ['default', 'compact'] },
    icon: { control: false },
  },
} satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const variants = ['default', 'overlay', 'outline', 'secondary', 'ghost', 'destructive'] as const;

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 16, alignItems: 'center' }}>
      {variants.map((v) => (
        <Fragment key={v}>
          <IconButton key={`${v}-d`} {...args} variant={v} />
          <IconButton key={`${v}-c`} {...args} variant={v} size="compact" />
          <IconButton key={`${v}-x`} {...args} variant={v} disabled />
        </Fragment>
      ))}
    </div>
  ),
};
