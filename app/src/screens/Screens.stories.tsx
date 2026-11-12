import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import '@app/app.css';
import App, { initialSaved } from '@app/App';
import { products } from '@app/lib/products';
import { defaultScenario, type ConfirmedAddress, type SavedAddress, type Scenario } from '@app/features/address/types';
import { Home } from './Home';
import { MapView } from './MapView';
import { ProductDetail } from './ProductDetail';
import { CheckoutOptions, type Fulfillment } from './CheckoutOptions';
import { CheckoutAddress, type AddressDraft } from './CheckoutAddress';
import { CheckoutReview } from './CheckoutReview';
import { DeliveryStatus } from './DeliveryStatus';

/**
 * Screens of the Pickup delivery-address prototype (Figma "Workflow lab", Code Layer node 10:1517),
 * rebuilt with the Pickup design system. Shown in a 402×874 phone frame.
 */
const meta = {
  title: 'Prototype/Screens',
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 402, minHeight: 874, margin: '0 auto', position: 'relative', transform: 'translateZ(0)', overflow: 'auto', height: 874 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const address: ConfirmedAddress = {
  id: 'saved-home',
  line1: '1420 Colorado Blvd',
  unit: 'Apt 3',
  city: 'Pasadena',
  state: 'CA',
  zip: '91106',
  source: 'saved',
};

/** The whole clickable flow: browse → product → checkout → delivery status. */
export const FullFlow: Story = { render: () => <App /> };

export const BrowseGrid: Story = {
  render: () => {
    const [saved, setSaved] = useState(new Set(['blanket']));
    return (
      <Home
        onOpen={fn()}
        onMap={fn()}
        saved={saved}
        toggleSaved={(id) =>
          setSaved((s) => {
            const n = new Set(s);
            if (n.has(id)) n.delete(id);
            else n.add(id);
            return n;
          })
        }
      />
    );
  },
};

export const BrowseMap: Story = { render: () => <MapView onHome={fn()} onPin={fn()} /> };

export const Product: Story = {
  render: () => <ProductDetail p={products[0]} onClose={fn()} onBuy={fn()} saved={false} toggleSaved={fn()} />,
};

export const Checkout1Fulfillment: Story = {
  render: () => {
    const [value, setValue] = useState<Fulfillment>('delivery');
    return <CheckoutOptions p={products[0]} value={value} onChange={setValue} onBack={fn()} onContinue={fn()} />;
  },
};

function AddressStep({ selected = null, scenario: initial = defaultScenario }: { selected?: ConfirmedAddress | null; scenario?: Scenario }) {
  const [draft, setDraft] = useState<AddressDraft>({ query: '', selected });
  const [scenario, setScenario] = useState<Scenario>(initial);
  const [saved, setSaved] = useState<SavedAddress[]>(initialSaved);
  return (
    <CheckoutAddress
      draft={draft}
      setDraft={setDraft}
      scenario={scenario}
      setScenario={setScenario}
      saved={saved}
      setSaved={setSaved}
      onBack={fn()}
      onConfirmed={fn()}
      onPickup={fn()}
    />
  );
}

export const Checkout2AddressSearch: Story = { render: () => <AddressStep /> };
export const Checkout2AddressFirstVisit: Story = { render: () => <AddressStep scenario={{ ...defaultScenario, returningUser: false }} /> };
export const Checkout2AddressConfirm: Story = { render: () => <AddressStep selected={address} /> };
export const Checkout2AddressUnverifiable: Story = {
  render: () => <AddressStep selected={{ ...address, id: 'w', line1: '845 Harbor Dr', unit: undefined, city: 'San Diego', zip: '92101' }} />,
};

export const Checkout3Review: Story = {
  render: () => <CheckoutReview p={products[0]} fulfillment="delivery" address={address} onBack={fn()} onEditAddress={fn()} onBuy={fn()} />,
};

export const Checkout3ReviewPickup: Story = {
  render: () => <CheckoutReview p={products[0]} fulfillment="pickup" address={null} onBack={fn()} onEditAddress={fn()} onBuy={fn()} />,
};

export const DeliveryStatusLive: Story = {
  render: () => <DeliveryStatus p={products[0]} address={address} onBack={fn()} onBrowse={fn()} />,
};

export const DeliveryStatusOnTheWay: Story = {
  render: () => <DeliveryStatus p={products[0]} address={address} onBack={fn()} onBrowse={fn()} autoAdvance={false} initialStep={3} />,
};
