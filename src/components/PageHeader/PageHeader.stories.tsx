import type { Meta, StoryObj } from '@storybook/react-vite';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { fn } from 'storybook/test';
import { IconButton } from '../IconButton/IconButton';
import { PageHeader } from './PageHeader';

const meta = {
  title: 'Compositions/PageHeader',
  component: PageHeader,
  args: { title: 'Selling', onBack: fn() },
  argTypes: { trailing: { control: false } },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
} satisfies Meta<typeof PageHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithTrailingAction: Story = {
  args: { trailing: <IconButton variant="ghost" icon={<EllipsisHorizontalIcon />} aria-label="More" /> },
};
