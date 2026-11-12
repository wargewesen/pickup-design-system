import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionItem } from './Accordion';

const meta = {
  title: 'Surfaces/Accordion',
  component: AccordionItem,
  args: { title: 'How does delivery work?', defaultOpen: false, children: 'A neighbor picks up the item and brings it across town.' },
  decorators: [(Story) => <div style={{ width: 520 }}><Accordion><Story /></Accordion></div>],
  globals: { backgrounds: { value: 'card' } },
} satisfies Meta<typeof AccordionItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {};
export const Expanded: Story = { args: { defaultOpen: true } };

export const Group: Story = {
  render: () => (
    <>
      <AccordionItem title="How does delivery work?" defaultOpen>A neighbor picks up the item and brings it across town.</AccordionItem>
      <AccordionItem title="Can I return an item?">Returns are accepted within 48 hours of pickup.</AccordionItem>
      <AccordionItem title="How do I get paid?">Payouts land in your account the day after pickup.</AccordionItem>
    </>
  ),
};
