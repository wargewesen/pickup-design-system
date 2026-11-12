import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton, SkeletonStack } from './Skeleton';

const meta = {
  title: 'Feedback/Skeleton',
  component: SkeletonStack,
  decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
} satisfies Meta<typeof SkeletonStack>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Stack: Story = {};
export const Single: Story = { render: () => <Skeleton width={200} height={20} /> };
