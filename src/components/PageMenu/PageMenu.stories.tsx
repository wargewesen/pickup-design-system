import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeartIcon, ShoppingBagIcon, TagIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { PageMenu, PageMenuItem } from './PageMenu';

const meta = {
  title: 'Compositions/PageMenu',
  component: PageMenu,
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
  globals: { backgrounds: { value: 'card' } },
} satisfies Meta<typeof PageMenu>;
export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => (
    <PageMenu>
      <PageMenuItem icon={<HeartIcon />} href="#saves">Saves</PageMenuItem>
      <PageMenuItem icon={<ShoppingBagIcon />} href="#selling">Selling</PageMenuItem>
      <PageMenuItem icon={<TagIcon />} href="#purchases">Purchases</PageMenuItem>
      <PageMenuItem icon={<UserCircleIcon />} href="#account">Account</PageMenuItem>
    </PageMenu>
  ),
};
