import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Empty } from './Empty';

const meta = {
  title: 'Feedback/Empty',
  component: Empty,
  args: { title: 'Nothing here yet', description: 'Save items to find them here later.' },
  argTypes: { icon: { control: false }, action: { control: false } },
} satisfies Meta<typeof Empty>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithAction: Story = { args: { action: <Button>Browse items</Button> } };
