import { useCallback, useEffect, useState } from 'react';
import { products, type Product } from '@app/lib/products';
import { Home } from '@app/screens/Home';
import { MapView } from '@app/screens/MapView';
import { ProductDetail } from '@app/screens/ProductDetail';
import { CheckoutOptions, type Fulfillment } from '@app/screens/CheckoutOptions';
import { CheckoutAddress, type AddressDraft } from '@app/screens/CheckoutAddress';
import { CheckoutReview } from '@app/screens/CheckoutReview';
import { DeliveryStatus } from '@app/screens/DeliveryStatus';
import { defaultScenario, type SavedAddress, type Scenario } from '@app/features/address/types';

const SCREENS = ['home', 'map', 'product', 'checkout1', 'checkout2', 'checkout3', 'status'] as const;
type Screen = (typeof SCREENS)[number];

const fromHash = (): Screen => {
  const h = window.location.hash.replace('#/', '') as Screen;
  // Status needs a confirmed address, so deep links fall back to the address step.
  return h === 'status' ? 'checkout2' : SCREENS.includes(h) ? h : 'home';
};

export const initialSaved: SavedAddress[] = [
  { id: 'saved-home', label: 'Home', kind: 'saved', line1: '1420 Colorado Blvd', unit: 'Apt 3', city: 'Pasadena', state: 'CA', zip: '91106' },
  { id: 'saved-work', label: 'Work', kind: 'saved', line1: '845 Harbor Dr', city: 'San Diego', state: 'CA', zip: '92101' },
  { id: 'recent-1', label: 'Last delivery', kind: 'recent', line1: '3150 Ocean Blvd', city: 'Long Beach', state: 'CA', zip: '90803' },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>(fromHash);
  const [product, setProduct] = useState<Product>(products[0]);
  const [savedItems, setSavedItems] = useState<Set<string>>(() => new Set(['blanket']));
  const [fulfillment, setFulfillment] = useState<Fulfillment>('delivery');
  const [draft, setDraft] = useState<AddressDraft>({ query: '', selected: null });
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>(initialSaved);
  const [scenario, setScenario] = useState<Scenario>(defaultScenario);
  const [toast, setToast] = useState<string | null>(null);

  const go = useCallback((s: Screen) => {
    setScreen(s);
    if (window.location.hash !== `#/${s}`) window.history.pushState(null, '', `#/${s}`);
    window.scrollTo({ top: 0 });
  }, []);

  // Browser back/forward moves between prototype screens.
  useEffect(() => {
    const onPop = () => setScreen(fromHash());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(id);
  }, [toast]);

  const toggleSaved = (id: string) =>
    setSavedItems((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const open = (p: Product) => {
    setProduct(p);
    go('product');
  };

  const addressStep = (
    <CheckoutAddress
      draft={draft}
      setDraft={setDraft}
      scenario={scenario}
      setScenario={setScenario}
      saved={savedAddresses}
      setSaved={setSavedAddresses}
      onBack={() => go('checkout1')}
      onConfirmed={() => go('checkout3')}
      onPickup={() => {
        setFulfillment('pickup');
        go('checkout1');
      }}
    />
  );

  const content = (() => {
    switch (screen) {
      case 'home':
        return <Home onOpen={open} onMap={() => go('map')} saved={savedItems} toggleSaved={toggleSaved} toast={toast} />;
      case 'map':
        return <MapView onHome={() => go('home')} onPin={(price) => open(products.find((p) => `$${p.price}` === price) ?? products[0])} />;
      case 'product':
        return (
          <ProductDetail
            p={product}
            onClose={() => go('home')}
            onBuy={() => {
              setFulfillment('delivery');
              go('checkout1');
            }}
            saved={savedItems.has(product.id)}
            toggleSaved={() => toggleSaved(product.id)}
          />
        );
      case 'checkout1':
        return (
          <CheckoutOptions
            p={product}
            value={fulfillment}
            onChange={setFulfillment}
            onBack={() => go('product')}
            onContinue={() => go(fulfillment === 'delivery' ? 'checkout2' : 'checkout3')}
          />
        );
      case 'checkout2':
        return addressStep;
      case 'checkout3':
        return (
          <CheckoutReview
            p={product}
            fulfillment={fulfillment}
            address={draft.selected}
            onBack={() => go(fulfillment === 'delivery' ? 'checkout2' : 'checkout1')}
            onEditAddress={() => go('checkout2')}
            onBuy={() => {
              if (fulfillment === 'delivery' && draft.selected) go('status');
              else {
                setToast('Purchased. Message Dev Anand to arrange pickup.');
                go('home');
              }
            }}
          />
        );
      case 'status':
        return draft.selected ? (
          <DeliveryStatus p={product} address={draft.selected} onBack={() => go('home')} onBrowse={() => go('home')} />
        ) : (
          addressStep
        );
    }
  })();

  return (
    <div key={screen} className="app-fade">
      {content}
    </div>
  );
}
