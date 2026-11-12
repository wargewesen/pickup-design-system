import { ClockIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { Button, StickyActionBar } from '@figma/pickup-design-system';
import { assets } from '@app/lib/assets';
import { DELIVERY_FEE, SELLER, type Product } from '@app/lib/products';
import { CheckoutHeader, MapLabel, SummaryRow } from '@app/components/chrome';
import { formatFull, type ConfirmedAddress } from '@app/features/address/types';
import type { Fulfillment } from './CheckoutOptions';

export function CheckoutReview({
  p,
  fulfillment,
  address,
  onBack,
  onEditAddress,
  onBuy,
}: {
  p: Product;
  fulfillment: Fulfillment;
  address: ConfirmedAddress | null;
  onBack: () => void;
  onEditAddress: () => void;
  onBuy: () => void;
}) {
  const delivery = fulfillment === 'delivery';
  const total = p.price + (delivery ? DELIVERY_FEE : 0);
  return (
    <div className="app-page">
      <div className="app-narrow">
        <CheckoutHeader step={3} onBack={onBack} />
        <div className="app-route-map app-route-map--288">
          <div className="app-route-map__canvas">
            <img src={assets.mapCheckout} alt="" className="app-route-map__img" />
            <MapLabel left={104.5} top={225} mono square>
              Pickup · 21 min
            </MapLabel>
            {delivery && (
              <MapLabel left={182} top={33} mono square>
                You · 35 min
              </MapLabel>
            )}
            <img src={assets.attribution} alt="" className="app-route-map__attr" style={{ top: 256 }} />
          </div>
        </div>
        <div className="app-stack app-stack--32 app-pad">
          <div className="app-eta">
            <span className="app-eta__icon">
              <ClockIcon aria-hidden="true" />
            </span>
            <div className="app-stack app-stack--4">
              <h2 className="pk-text-heading-md app-ink">{delivery ? 'Arrives in about 35 minutes' : `Pick it up in ${SELLER.area}`}</h2>
              <p className="pk-text-body-base app-muted">
                {delivery ? `Pickup from ${SELLER.area}, then straight to your address.` : `You’ll arrange a time with ${SELLER.name} after you buy.`}
              </p>
            </div>
          </div>
          <section className="app-stack app-stack--16" aria-label="Summary">
            <p className="pk-text-body-base app-muted">Summary</p>
            <div className="app-address-line">
              <MapPinIcon className="app-icon" aria-hidden="true" />
              <p className="pk-text-body-base app-ink app-grow">
                {delivery && address ? formatFull(address) : `Meet ${SELLER.name} in ${SELLER.area}`}
              </p>
              {delivery && (
                <Button variant="link" onClick={onEditAddress}>
                  Change
                </Button>
              )}
            </div>
            <dl className="pk-text-body-base app-stack app-stack--8">
              <SummaryRow k="Item" v={`$${p.price}`} />
              {delivery && <SummaryRow k="Delivery" v={`$${DELIVERY_FEE}`} />}
              <div className="app-divider" />
              <SummaryRow k="Total" v={`$${total}`} strong />
            </dl>
            <p className="pk-text-body-base app-muted">Demo checkout — no payment is collected.</p>
          </section>
        </div>
        <StickyActionBar>
          <Button onClick={onBuy}>{delivery ? `Buy and request delivery · $${total}` : `Buy and arrange pickup · $${total}`}</Button>
        </StickyActionBar>
      </div>
    </div>
  );
}
