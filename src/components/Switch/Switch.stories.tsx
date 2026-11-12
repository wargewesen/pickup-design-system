import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = {
  title: 'Inputs/Switch',
  component: Switch,
  args: { defaultChecked: true, size: 'default', invalid: false, disabled: false, 'aria-label': 'Notifications' },
  argTypes: { size: { control: 'inline-radio', options: ['default', 'sm'] } },
} satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 16, alignItems: 'center' }}>
      {(['default', 'sm'] as const).map((size) =>
        [true, false].map((checked) => (
          <Fragment key={`${size}-${checked}`}>
            <Switch key={`${size}${checked}a`} size={size} checked={checked} aria-label="default" />
            <Switch key={`${size}${checked}b`} size={size} checked={checked} aria-label="invalid" invalid />
            <Switch key={`${size}${checked}c`} size={size} checked={checked} aria-label="disabled" disabled />
            <span key={`${size}${checked}d`} className="pk-text-label-sm">{size} · {checked ? 'on' : 'off'}</span>
          </Fragment>
        )),
      )}
    </div>
  ),
};
