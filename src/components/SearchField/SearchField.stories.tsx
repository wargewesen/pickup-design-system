import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SearchField } from './SearchField';

const meta = {
  title: 'Inputs/SearchField',
  component: SearchField,
  args: { placeholder: 'Search', variant: 'filled', invalid: false, disabled: false, 'aria-label': 'Search' },
  argTypes: { variant: { control: 'inline-radio', options: ['filled', 'outline'] } },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
} satisfies Meta<typeof SearchField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithClear: Story = {
  render: (args) => {
    const [value, setValue] = useState('Lounge chair');
    return <SearchField {...args} value={value} onChange={(e) => setValue(e.target.value)} onClear={() => setValue('')} />;
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <SearchField aria-label="s" placeholder="Search" />
      <SearchField aria-label="s" placeholder="Search" variant="outline" />
      <SearchField aria-label="s" placeholder="Search" invalid />
      <SearchField aria-label="s" placeholder="Search" disabled />
    </div>
  ),
};
