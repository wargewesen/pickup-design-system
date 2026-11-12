import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Popover } from './Popover';

const meta = {
  title: 'Overlays/Popover',
  component: Popover,
  args: {
    trigger: <Button>View pickup details</Button>,
    title: 'Pickup details',
    children: 'Usually ready within two hours.',
    defaultOpen: false,
  },
  argTypes: { trigger: { control: false } },
  decorators: [(Story) => <div style={{ height: 180, width: 320 }}><Story /></div>],
} satisfies Meta<typeof Popover>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};
export const Open: Story = { args: { defaultOpen: true } };
