import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardDescription, CardTitle } from './Card';

const meta = {
  title: 'Surfaces/Card',
  component: Card,
  args: { variant: 'filled', size: 'default' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['filled', 'outline'] },
    size: { control: 'inline-radio', options: ['default', 'sm'] },
  },
  render: (args) => (
    <Card {...args} style={{ width: 330 }}>
      <CardTitle>Card title</CardTitle>
      <CardDescription>Description uses muted foreground and inherits the base type scale.</CardDescription>
    </Card>
  ),
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};
export const FilledSmall: Story = { args: { size: 'sm' } };
export const Outline: Story = { args: { variant: 'outline' }, globals: { backgrounds: { value: 'card' } } };
