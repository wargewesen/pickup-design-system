import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  args: { defaultChecked: true, invalid: false, disabled: false, 'aria-label': 'Accept' },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithLabel: Story = {
  render: (args) => (
    <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center', font: '400 14px/20px var(--font-sans)' }}>
      <Checkbox {...args} aria-label={undefined} /> Offer local pickup
    </label>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 24px)', gap: 16 }}>
      {([false, true, 'indeterminate'] as const).map((checked) => (
        <Fragment key={String(checked)}>
          <Checkbox key={`${checked}a`} aria-label="default" checked={checked} readOnly />
          <Checkbox key={`${checked}b`} aria-label="invalid" checked={checked} invalid readOnly />
          <Checkbox key={`${checked}c`} aria-label="disabled" checked={checked} disabled readOnly />
        </Fragment>
      ))}
    </div>
  ),
};
