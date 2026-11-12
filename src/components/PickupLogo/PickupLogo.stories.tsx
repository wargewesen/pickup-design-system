import type { Meta, StoryObj } from '@storybook/react-vite';
import { PickupLogo } from './PickupLogo';

const meta = { title: 'Brand/PickupLogo', component: PickupLogo } satisfies Meta<typeof PickupLogo>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
