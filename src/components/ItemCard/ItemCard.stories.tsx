import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ItemCard } from './ItemCard';

const meta = {
  title: 'Compositions/ItemCard',
  component: ItemCard,
  args: {
    title: 'Bookshelf Speakers',
    price: '$65',
    distance: '2.3 mi',
    condition: 'Good',
    imageSrc: '/assets/bookshelf-speakers.png',
    imageAlt: 'Pair of black bookshelf speakers',
  },
  globals: { backgrounds: { value: 'card' } },
} satisfies Meta<typeof ItemCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [saved, setSaved] = useState(false);
    return <ItemCard {...args} saved={saved} onSaveToggle={() => setSaved((s) => !s)} />;
  },
};

export const WithoutSave: Story = {};
