import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const options = (
  <>
    <option>Furniture</option>
    <option>Electronics</option>
    <option>Clothing</option>
  </>
);

const meta = {
  title: 'Inputs/Select',
  component: Select,
  args: { variant: 'filled', size: 'default', invalid: false, disabled: false, 'aria-label': 'Category', children: options },
  argTypes: {
    variant: { control: 'inline-radio', options: ['filled', 'outline'] },
    size: { control: 'inline-radio', options: ['default', 'compact'] },
    children: { control: false },
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Select aria-label="Default">{options}</Select>
      <Select aria-label="Compact" size="compact">{options}</Select>
      <Select aria-label="Outline" variant="outline">{options}</Select>
      <Select aria-label="Invalid" invalid>{options}</Select>
      <Select aria-label="Disabled" disabled>{options}</Select>
    </div>
  ),
};
