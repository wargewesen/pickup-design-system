import type { Meta, StoryObj } from '@storybook/react-vite';
import { SummaryCard } from './SummaryCard';

const meta = {
  title: 'Compositions/SummaryCard',
  component: SummaryCard,
  args: {
    title: 'Mustard lounge chair',
    meta: '$420 · Excellent',
    imageSrc: '/assets/mustard-lounge-chair.png',
    imageAlt: 'Mustard yellow lounge chair',
  },
  decorators: [(Story) => <div style={{ width: 380 }}><Story /></div>],
} satisfies Meta<typeof SummaryCard>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
