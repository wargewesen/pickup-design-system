import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { StickyActionBar } from './StickyActionBar';

const meta = {
  title: 'Compositions/StickyActionBar',
  component: StickyActionBar,
  args: { sticky: false },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
  globals: { backgrounds: { value: 'neutral' } },
} satisfies Meta<typeof StickyActionBar>;
export default meta;

export const Default: StoryObj<typeof meta> = {
  render: (args) => (
    <StickyActionBar {...args}>
      <Button variant="outline">Save</Button>
      <Button>Buy now</Button>
    </StickyActionBar>
  ),
};
