import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Feedback/Badge',
  component: Badge,
  args: { children: 'Label', variant: 'default' },
  argTypes: { variant: { control: 'inline-radio', options: ['default', 'secondary', 'outline', 'condition'] } },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Badge>Label</Badge>
      <Badge variant="secondary">Label</Badge>
      <Badge variant="outline">Label</Badge>
      <Badge variant="condition">Good</Badge>
    </div>
  ),
};
