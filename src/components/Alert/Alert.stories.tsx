import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  args: { variant: 'default', title: 'Pickup requested', description: 'We’ll notify you when a courier accepts.' },
  argTypes: { variant: { control: 'inline-radio', options: ['default', 'destructive'] }, icon: { control: false } },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Destructive: Story = { args: { variant: 'destructive' } };
