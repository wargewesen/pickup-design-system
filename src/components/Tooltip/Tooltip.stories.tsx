import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeartIcon } from '@heroicons/react/24/outline';
import { IconButton } from '../IconButton/IconButton';
import { Tooltip, TooltipContent } from './Tooltip';

const meta = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  args: { content: 'Save for later', side: 'top', children: <IconButton variant="overlay" icon={<HeartIcon />} aria-label="Save" /> },
  argTypes: { side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] }, children: { control: false } },
  decorators: [(Story) => <div style={{ padding: 64 }}><Story /></div>],
} satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const HoverOrFocus: Story = {};

export const Sides: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 32 }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <TooltipContent key={side} side={side}>Save for later</TooltipContent>
      ))}
    </div>
  ),
};
