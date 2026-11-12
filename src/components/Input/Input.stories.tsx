import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, Textarea } from './Input';

const meta = {
  title: 'Inputs/Text field',
  component: Input,
  args: { placeholder: 'Placeholder', variant: 'filled', invalid: false, disabled: false },
  argTypes: { variant: { control: 'inline-radio', options: ['filled', 'outline'] } },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const InputField: Story = {};

export const TextareaField: Story = {
  render: (args) => <Textarea placeholder={args.placeholder} variant={args.variant} invalid={args.invalid} disabled={args.disabled} />,
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['filled', 'outline'] as const).map((variant) => (
        <div key={variant} style={{ display: 'grid', gap: 12 }}>
          <Input variant={variant} placeholder={`${variant} · default`} />
          <Input variant={variant} placeholder={`${variant} · invalid`} invalid />
          <Input variant={variant} placeholder={`${variant} · disabled`} disabled />
          <Textarea variant={variant} placeholder={`${variant} · textarea`} />
        </div>
      ))}
    </div>
  ),
};
